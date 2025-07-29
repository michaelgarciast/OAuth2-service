import { MotoRepository } from '../../domain/interfaces/MotoRepository';

export class DeleteMotoUseCase {
  constructor(private readonly motoRepository: MotoRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    try {
      // Validar que la moto existe
      const existingMoto = await this.motoRepository.findById(id);
      if (!existingMoto) {
        throw new Error('Moto no encontrada');
      }

      // Validar que el usuario es el propietario
      if (existingMoto.userId !== userId) {
        throw new Error('No tienes permisos para eliminar esta moto');
      }

      // Eliminar la moto
      await this.motoRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al eliminar moto: ${error.message}`);
      }
      throw new Error('Error inesperado al eliminar moto');
    }
  }
}
