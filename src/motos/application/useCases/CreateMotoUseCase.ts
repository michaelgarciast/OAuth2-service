import { MotoRepository } from '../../domain/interfaces/MotoRepository';
import { Moto } from '../../domain/entities/Moto';
import { CreateMotoDTO, MotoDTO } from '../dtos/motoDTO';

export class CreateMotoUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}

  async execute(createMotoDTO: CreateMotoDTO): Promise<MotoDTO> {
    try {
      // Validaciones básicas
      this.validateCreateMotoData(createMotoDTO);

      // Crear la entidad Moto con validaciones de negocio
      const moto = Moto.create(createMotoDTO);

      // Guardar en el repositorio
      const savedMoto = await this.motoRepository.create(moto);

      // Convertir a DTO de respuesta
      return this.toMotoDTO(savedMoto);
    } catch (error) {
      // Manejo de errores específicos
      if (error instanceof Error) {
        throw new Error(`Error al crear moto: ${error.message}`);
      }
      throw new Error('Error inesperado al crear moto');
    }
  }

  private validateCreateMotoData(data: CreateMotoDTO): void {
    if (!data.marca || data.marca.trim().length === 0) {
      throw new Error('La marca es obligatoria');
    }

    if (!data.modelo || data.modelo.trim().length === 0) {
      throw new Error('El modelo es obligatorio');
    }

    if (!data.descripcion || data.descripcion.trim().length === 0) {
      throw new Error('La descripción es obligatoria');
    }

    if (!data.userId || data.userId.trim().length === 0) {
      throw new Error('El ID del usuario es obligatorio');
    }

    // Validaciones adicionales específicas del caso de uso
    if (data.precio && data.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    if (data.kilometraje && data.kilometraje < 0) {
      throw new Error('El kilometraje no puede ser negativo');
    }

    if (data.motorCilindrada && data.motorCilindrada <= 0) {
      throw new Error('La cilindrada debe ser mayor a 0');
    }

    if (data.motorPotencia && data.motorPotencia <= 0) {
      throw new Error('La potencia debe ser mayor a 0');
    }
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
