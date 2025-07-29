import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/infrastructure/auth/nextauth.config';
import { prisma } from '@/auth/infrastructure/prisma/prismaClient';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const { id } = await params;
    const moto = await prisma.moto.findUnique({
      where: { id },
    });

    if (!moto) {
      return new NextResponse(JSON.stringify({ error: 'Moto no encontrada' }), { status: 404 });
    }

    // Verify ownership
    if (moto.userId !== session.user.id) {
      return new NextResponse(JSON.stringify({ error: 'No tienes permiso para ver esta moto' }), {
        status: 403,
      });
    }

    return NextResponse.json(moto);
  } catch (error) {
    console.error('Error fetching moto:', error);
    return new NextResponse(JSON.stringify({ error: 'Error al obtener la moto' }), { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const motoData = await request.json();
    const { id } = await params;

    // Check if moto exists and belongs to user
    const existingMoto = await prisma.moto.findUnique({
      where: { id },
    });

    if (!existingMoto) {
      return new NextResponse(JSON.stringify({ error: 'Moto no encontrada' }), { status: 404 });
    }

    if (existingMoto.userId !== session.user.id) {
      return new NextResponse(
        JSON.stringify({ error: 'No tienes permiso para actualizar esta moto' }),
        { status: 403 }
      );
    }

    const updatedMoto = await prisma.moto.update({
      where: { id },
      data: motoData,
    });

    return NextResponse.json(updatedMoto);
  } catch (error) {
    console.error('Error updating moto:', error);
    return new NextResponse(JSON.stringify({ error: 'Error al actualizar la moto' }), {
      status: 500,
    });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const { id } = await params;
    // Check if moto exists and belongs to user
    const existingMoto = await prisma.moto.findUnique({
      where: { id },
    });

    if (!existingMoto) {
      return new NextResponse(JSON.stringify({ error: 'Moto no encontrada' }), { status: 404 });
    }

    if (existingMoto.userId !== session.user.id) {
      return new NextResponse(
        JSON.stringify({ error: 'No tienes permiso para eliminar esta moto' }),
        { status: 403 }
      );
    }

    await prisma.moto.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting moto:', error);
    return new NextResponse(JSON.stringify({ error: 'Error al eliminar la moto' }), {
      status: 500,
    });
  }
}
