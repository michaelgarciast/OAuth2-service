import { MotoRepository } from '../../domain/interfaces/MotoRepository';
import { Moto } from '../../domain/entities/Moto';
import { MotoDTO } from '../dtos/motoDTO';

export interface GetMotosFilters {
  marca?: string;
  modelo?: string;
  yearMin?: number;
  yearMax?: number;
  precioMin?: number;
  precioMax?: number;
  estado?: string;
  motorTipo?: string;
  userId?: string;
}

export interface GetMotosOptions {
  page?: number;
  limit?: number;
  sortBy?: 'precio' | 'year' | 'marca' | 'modelo' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface GetMotosResult {
  motos: MotoDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class GetMotosUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}

  async execute(filters?: GetMotosFilters, options?: GetMotosOptions): Promise<GetMotosResult> {
    try {
      // Validar opciones de paginación
      const validatedOptions = this.validateOptions(options);

      // Validar filtros
      const validatedFilters = this.validateFilters(filters);

      // Obtener motos del repositorio
      let motos: Moto[];

      if (validatedFilters.userId) {
        // Si se especifica userId, obtener solo las motos del usuario
        motos = await this.motoRepository.findByUserId(validatedFilters.userId);
      } else if (Object.keys(validatedFilters).length > 0) {
        // Si hay filtros, usar búsqueda
        motos = await this.motoRepository.search(validatedFilters);
      } else {
        // Si no hay filtros, obtener todas
        motos = await this.motoRepository.findAll();
      }

      // Aplicar ordenamiento
      motos = this.sortMotos(motos, validatedOptions.sortBy, validatedOptions.sortOrder);

      // Aplicar paginación
      const total = motos.length;
      const totalPages = Math.ceil(total / validatedOptions.limit);
      const startIndex = (validatedOptions.page - 1) * validatedOptions.limit;
      const endIndex = startIndex + validatedOptions.limit;
      const paginatedMotos = motos.slice(startIndex, endIndex);

      // Convertir a DTOs
      const motoDTOs = paginatedMotos.map(moto => this.toMotoDTO(moto));

      return {
        motos: motoDTOs,
        total,
        page: validatedOptions.page,
        limit: validatedOptions.limit,
        totalPages,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener motos: ${error.message}`);
      }
      throw new Error('Error inesperado al obtener motos');
    }
  }

  async getById(id: string): Promise<MotoDTO | null> {
    try {
      const moto = await this.motoRepository.findById(id);
      if (!moto) {
        return null;
      }
      return this.toMotoDTO(moto);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener moto: ${error.message}`);
      }
      throw new Error('Error inesperado al obtener moto');
    }
  }

  async getByUserId(userId: string, options?: GetMotosOptions): Promise<GetMotosResult> {
    return this.execute({ userId }, options);
  }

  private validateOptions(options?: GetMotosOptions): Required<GetMotosOptions> {
    return {
      page: Math.max(1, options?.page || 1),
      limit: Math.min(100, Math.max(1, options?.limit || 10)),
      sortBy: options?.sortBy || 'createdAt',
      sortOrder: options?.sortOrder || 'desc',
    };
  }

  private validateFilters(filters?: GetMotosFilters): GetMotosFilters {
    const validatedFilters: GetMotosFilters = {};

    if (filters?.marca) {
      validatedFilters.marca = filters.marca.trim();
    }

    if (filters?.modelo) {
      validatedFilters.modelo = filters.modelo.trim();
    }

    if (filters?.yearMin !== undefined && filters.yearMin >= 1900) {
      validatedFilters.yearMin = filters.yearMin;
    }

    if (filters?.yearMax !== undefined && filters.yearMax <= new Date().getFullYear() + 1) {
      validatedFilters.yearMax = filters.yearMax;
    }

    if (filters?.precioMin !== undefined && filters.precioMin >= 0) {
      validatedFilters.precioMin = filters.precioMin;
    }

    if (filters?.precioMax !== undefined && filters.precioMax > 0) {
      validatedFilters.precioMax = filters.precioMax;
    }

    if (filters?.estado) {
      validatedFilters.estado = filters.estado.trim();
    }

    if (filters?.motorTipo) {
      validatedFilters.motorTipo = filters.motorTipo.trim();
    }

    if (filters?.userId) {
      validatedFilters.userId = filters.userId.trim();
    }

    return validatedFilters;
  }

  private sortMotos(motos: Moto[], sortBy: string, sortOrder: 'asc' | 'desc'): Moto[] {
    return motos.sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortBy) {
        case 'precio':
          aValue = a.precio || 0;
          bValue = b.precio || 0;
          break;
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        case 'marca':
          aValue = a.marca.toLowerCase();
          bValue = b.marca.toLowerCase();
          break;
        case 'modelo':
          aValue = a.modelo.toLowerCase();
          bValue = b.modelo.toLowerCase();
          break;
        case 'createdAt':
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }

  private toMotoDTO(moto: Moto): MotoDTO {
    return {
      id: moto.id,
      marca: moto.marca,
      modelo: moto.modelo,
      year: moto.year,
      descripcion: moto.descripcion,
      userId: moto.userId,
      createdAt: moto.createdAt,
      updatedAt: moto.updatedAt,
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
      imagen: moto.imagen,
    };
  }
}
