import { MotoRepository } from '../../domain/interfaces/MotoRepository';
import { Moto } from '../../domain/entities/Moto';
import { UpdateMotoDTO, MotoDTO } from '../dtos/motoDTO';

export class EditMotoUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}

  async execute(id: string, updateMotoDTO: UpdateMotoDTO, userId: string): Promise<MotoDTO> {
    try {
      // Validar que la moto existe
      const existingMoto = await this.motoRepository.findById(id);
      if (!existingMoto) {
        throw new Error('Moto no encontrada');
      }

      // Validar que el usuario es el propietario
      if (existingMoto.userId !== userId) {
        throw new Error('No tienes permisos para editar esta moto');
      }

      // Validaciones básicas
      this.validateUpdateMotoData(updateMotoDTO);

      // Actualizar la entidad Moto
      const updatedMoto = existingMoto.update(updateMotoDTO);

      // Guardar en el repositorio
      const savedMoto = await this.motoRepository.update(id, updatedMoto);

      // Convertir a DTO de respuesta
      return this.toMotoDTO(savedMoto);
    } catch (error) {
      // Manejo de errores específicos
      if (error instanceof Error) {
        throw new Error(`Error al editar moto: ${error.message}`);
      }
      throw new Error('Error inesperado al editar moto');
    }
  }

  private validateUpdateMotoData(data: UpdateMotoDTO): void {
    // Validaciones para campos que se están actualizando
    if (data.marca !== undefined && (!data.marca || data.marca.trim().length === 0)) {
      throw new Error('La marca no puede estar vacía');
    }

    if (data.modelo !== undefined && (!data.modelo || data.modelo.trim().length === 0)) {
      throw new Error('El modelo no puede estar vacío');
    }

    if (
      data.descripcion !== undefined &&
      (!data.descripcion || data.descripcion.trim().length === 0)
    ) {
      throw new Error('La descripción no puede estar vacía');
    }

    // Validaciones de negocio
    if (data.year !== undefined && (data.year < 1900 || data.year > new Date().getFullYear() + 1)) {
      throw new Error('Año de la moto no válido');
    }

    if (data.precio !== undefined && data.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    if (data.kilometraje !== undefined && data.kilometraje < 0) {
      throw new Error('El kilometraje no puede ser negativo');
    }

    if (data.motorCilindrada !== undefined && data.motorCilindrada <= 0) {
      throw new Error('La cilindrada debe ser mayor a 0');
    }

    if (data.motorPotencia !== undefined && data.motorPotencia <= 0) {
      throw new Error('La potencia debe ser mayor a 0');
    }

    if (data.velocidadMaxima !== undefined && data.velocidadMaxima <= 0) {
      throw new Error('La velocidad máxima debe ser mayor a 0');
    }

    if (data.peso !== undefined && data.peso <= 0) {
      throw new Error('El peso debe ser mayor a 0');
    }

    if (data.capacidadTanque !== undefined && data.capacidadTanque <= 0) {
      throw new Error('La capacidad del tanque debe ser mayor a 0');
    }

    if (data.autonomia !== undefined && data.autonomia <= 0) {
      throw new Error('La autonomía debe ser mayor a 0');
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
