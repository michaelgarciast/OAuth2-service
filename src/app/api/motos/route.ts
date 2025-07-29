import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/infrastructure/auth/nextauth.config';
import { prisma } from '@/auth/infrastructure/prisma/prismaClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  // Get filters from query params
  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (!['page', 'limit'].includes(key)) {
      filters[key] = value;
    }
  });

  try {
    const session = await getServerSession(authOptions);

    // If user is authenticated, return only their motos
    // If not authenticated, return all motos (public)
    const whereClause = session ? { ...filters, userId: session.user.id } : { ...filters };

    const [motos, total] = await Promise.all([
      prisma.moto.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        // Include user info for public display
        include: session
          ? undefined
          : {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
      }),
      prisma.moto.count({
        where: whereClause,
      }),
    ]);

    return NextResponse.json({
      data: motos,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching motos:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Error al obtener las motos',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    const motoData = await request.json();
    console.log('Received moto data:', motoData);

    // Validate required fields
    if (!motoData.marca || !motoData.modelo || !motoData.year || !motoData.descripcion) {
      return new NextResponse(
        JSON.stringify({
          error: 'Faltan campos requeridos: marca, modelo, year, descripcion',
        }),
        { status: 400 }
      );
    }

    // Add userId to the moto data
    const motoWithUserId = {
      ...motoData,
      userId: session.user.id,
    };

    console.log('Creating moto with data:', motoWithUserId);

    const newMoto = await prisma.moto.create({
      data: motoWithUserId,
    });

    return NextResponse.json(newMoto, { status: 201 });
  } catch (error) {
    console.error('Error creating moto:', error);

    // Return more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    const errorStack = error instanceof Error ? error.stack : undefined;

    return new NextResponse(
      JSON.stringify({
        error: 'Error al crear la moto',
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      }),
      { status: 500 }
    );
  }
}
