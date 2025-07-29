import { Moto } from '../entities/Moto';

export interface MotoRepository {
  create(moto: Moto): Promise<Moto>;
  findById(id: string): Promise<Moto | null>;
  findByUserId(userId: string): Promise<Moto[]>;
  findAll(): Promise<Moto[]>;
  update(id: string, moto: Moto): Promise<Moto>;
  delete(id: string): Promise<void>;
  search(filters: {
    marca?: string;
    modelo?: string;
    yearMin?: number;
    yearMax?: number;
    precioMin?: number;
    precioMax?: number;
    estado?: string;
    motorTipo?: string;
  }): Promise<Moto[]>;
}
