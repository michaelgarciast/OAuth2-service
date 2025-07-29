import { MotoRepository } from '../../domain/interfaces/MotoRepository';
import { Moto } from '../../domain/entities/Moto';
import { prisma } from '../prisma/prismaClient';

export class PrismaMotoRepository implements MotoRepository {
  async create(moto: Moto): Promise<Moto> {
    const prismaMoto = await prisma.moto.create({
      data: {
        id: moto.id,
        marca: moto.marca,
        modelo: moto.modelo,
        year: moto.year,
        descripcion: moto.descripcion,
        motorCilindrada: moto.motorCilindrada,
        motorTipo: moto.motorTipo,
        motorPotencia: moto.motorPotencia,
        motorTorque: moto.motorTorque,
        motorCombustible: moto.motorCombustible,
        velocidadMaxima: moto.velocidadMaxima,
        aceleracion0a100: moto.aceleracion0a100,
        velocidadCrucero: moto.velocidadCrucero,
        peso: moto.peso,
        alturaAsiento: moto.alturaAsiento,
        capacidadTanque: moto.capacidadTanque,
        autonomia: moto.autonomia,
        colores: moto.colores,
        transmision: moto.transmision,
        frenosDelanteros: moto.frenosDelanteros,
        frenosTraseros: moto.frenosTraseros,
        suspension: moto.suspension,
        neumaticos: moto.neumaticos,
        precio: moto.precio,
        estado: moto.estado,
        kilometraje: moto.kilometraje,
        userId: moto.userId,
        createdAt: moto.createdAt,
        updatedAt: moto.updatedAt,
      },
    });

    return this.toMotoEntity(prismaMoto);
  }

  async findById(id: string): Promise<Moto | null> {
    const prismaMoto = await prisma.moto.findUnique({
      where: { id },
    });

    return prismaMoto ? this.toMotoEntity(prismaMoto) : null;
  }

  async findByUserId(userId: string): Promise<Moto[]> {
    const prismaMotos = await prisma.moto.findMany({
      where: { userId },
    });

    return prismaMotos.map(moto => this.toMotoEntity(moto));
  }

  async findAll(): Promise<Moto[]> {
    const prismaMotos = await prisma.moto.findMany();
    return prismaMotos.map(moto => this.toMotoEntity(moto));
  }

  async update(id: string, moto: Moto): Promise<Moto> {
    const prismaMoto = await prisma.moto.update({
      where: { id },
      data: {
        marca: moto.marca,
        modelo: moto.modelo,
        year: moto.year,
        descripcion: moto.descripcion,
        motorCilindrada: moto.motorCilindrada,
        motorTipo: moto.motorTipo,
        motorPotencia: moto.motorPotencia,
        motorTorque: moto.motorTorque,
        motorCombustible: moto.motorCombustible,
        velocidadMaxima: moto.velocidadMaxima,
        aceleracion0a100: moto.aceleracion0a100,
        velocidadCrucero: moto.velocidadCrucero,
        peso: moto.peso,
        alturaAsiento: moto.alturaAsiento,
        capacidadTanque: moto.capacidadTanque,
        autonomia: moto.autonomia,
        colores: moto.colores,
        transmision: moto.transmision,
        frenosDelanteros: moto.frenosDelanteros,
        frenosTraseros: moto.frenosTraseros,
        suspension: moto.suspension,
        neumaticos: moto.neumaticos,
        precio: moto.precio,
        estado: moto.estado,
        kilometraje: moto.kilometraje,
        updatedAt: moto.updatedAt,
      },
    });

    return this.toMotoEntity(prismaMoto);
  }

  async delete(id: string): Promise<void> {
    await prisma.moto.delete({
      where: { id },
    });
  }

  async search(filters: {
    marca?: string;
    modelo?: string;
    yearMin?: number;
    yearMax?: number;
    precioMin?: number;
    precioMax?: number;
    estado?: string;
    motorTipo?: string;
  }): Promise<Moto[]> {
    const where: Record<string, unknown> = {};

    if (filters.marca) {
      where.marca = { contains: filters.marca, mode: 'insensitive' };
    }

    if (filters.modelo) {
      where.modelo = { contains: filters.modelo, mode: 'insensitive' };
    }

    if (filters.yearMin || filters.yearMax) {
      where.year = {};
      if (filters.yearMin) (where.year as Record<string, number>).gte = filters.yearMin;
      if (filters.yearMax) (where.year as Record<string, number>).lte = filters.yearMax;
    }

    if (filters.precioMin || filters.precioMax) {
      where.precio = {};
      if (filters.precioMin) (where.precio as Record<string, number>).gte = filters.precioMin;
      if (filters.precioMax) (where.precio as Record<string, number>).lte = filters.precioMax;
    }

    if (filters.estado) {
      where.estado = filters.estado;
    }

    if (filters.motorTipo) {
      where.motorTipo = filters.motorTipo;
    }

    const prismaMotos = await prisma.moto.findMany({ where });
    return prismaMotos.map(moto => this.toMotoEntity(moto));
  }

  private toMotoEntity(prismaMoto: Record<string, unknown>): Moto {
    return new Moto(
      prismaMoto.id as string,
      prismaMoto.marca as string,
      prismaMoto.modelo as string,
      prismaMoto.year as number,
      prismaMoto.descripcion as string,
      (prismaMoto.userId as string) || '',
      prismaMoto.createdAt as Date,
      prismaMoto.updatedAt as Date,
      prismaMoto.motorCilindrada as number | undefined,
      prismaMoto.motorTipo as string | undefined,
      prismaMoto.motorPotencia as number | undefined,
      prismaMoto.motorTorque as number | undefined,
      prismaMoto.motorCombustible as string | undefined,
      prismaMoto.velocidadMaxima as number | undefined,
      prismaMoto.aceleracion0a100 as number | undefined,
      prismaMoto.velocidadCrucero as number | undefined,
      prismaMoto.peso as number | undefined,
      prismaMoto.alturaAsiento as number | undefined,
      prismaMoto.capacidadTanque as number | undefined,
      prismaMoto.autonomia as number | undefined,
      prismaMoto.colores as string[] | undefined,
      prismaMoto.transmision as string | undefined,
      prismaMoto.frenosDelanteros as string | undefined,
      prismaMoto.frenosTraseros as string | undefined,
      prismaMoto.suspension as string | undefined,
      prismaMoto.neumaticos as string | undefined,
      prismaMoto.precio as number | undefined,
      prismaMoto.estado as string | undefined,
      prismaMoto.kilometraje as number | undefined,
      prismaMoto.imagen as string | undefined
    );
  }
}
