export interface MotoDTO {
  id: string;
  marca: string;
  modelo: string;
  year: number;
  descripcion: string;

  // Características del motor
  motorCilindrada?: number; // en cc
  motorTipo?: string; // 2T, 4T, eléctrico, etc.
  motorPotencia?: number; // en HP
  motorTorque?: number; // en Nm
  motorCombustible?: string; // gasolina, diesel, eléctrico

  // Características de velocidad
  velocidadMaxima?: number; // en km/h
  aceleracion0a100?: number; // en segundos
  velocidadCrucero?: number; // en km/h

  // Características físicas
  peso?: number; // en kg
  alturaAsiento?: number; // en mm
  capacidadTanque?: number; // en litros
  autonomia?: number; // en km

  // Colores disponibles
  colores?: string[]; // ["rojo", "azul", "negro"]

  // Características adicionales
  transmision?: string; // manual, automática, CVT
  frenosDelanteros?: string; // disco, tambor
  frenosTraseros?: string; // disco, tambor
  suspension?: string; // telescópica, monoshock, etc.
  neumaticos?: string; // medidas y tipo

  // Precio y estado
  precio?: number;
  estado?: string; // nuevo, usado, seminuevo
  kilometraje?: number; // en km
  imagen?: string;

  // Relación con el usuario
  userId?: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// DTO específico para crear una moto (sin id ni timestamps)
export interface CreateMotoDTO {
  marca: string;
  modelo: string;
  year: number;
  descripcion: string;

  // Características del motor
  motorCilindrada?: number;
  motorTipo?: string;
  motorPotencia?: number;
  motorTorque?: number;
  motorCombustible?: string;

  // Características de velocidad
  velocidadMaxima?: number;
  aceleracion0a100?: number;
  velocidadCrucero?: number;

  // Características físicas
  peso?: number;
  alturaAsiento?: number;
  capacidadTanque?: number;
  autonomia?: number;

  // Colores disponibles
  colores?: string[];

  // Características adicionales
  transmision?: string;
  frenosDelanteros?: string;
  frenosTraseros?: string;
  suspension?: string;
  neumaticos?: string;

  // Precio y estado
  precio?: number;
  estado?: string;
  kilometraje?: number;
  imagen?: string;

  // Relación con el usuario
  userId: string;
}

// DTO específico para actualizar una moto (todos los campos opcionales)
export interface UpdateMotoDTO {
  marca?: string;
  modelo?: string;
  year?: number;
  descripcion?: string;

  // Características del motor
  motorCilindrada?: number;
  motorTipo?: string;
  motorPotencia?: number;
  motorTorque?: number;
  motorCombustible?: string;

  // Características de velocidad
  velocidadMaxima?: number;
  aceleracion0a100?: number;
  velocidadCrucero?: number;

  // Características físicas
  peso?: number;
  alturaAsiento?: number;
  capacidadTanque?: number;
  autonomia?: number;

  // Colores disponibles
  colores?: string[];

  // Características adicionales
  transmision?: string;
  frenosDelanteros?: string;
  frenosTraseros?: string;
  suspension?: string;
  neumaticos?: string;

  // Precio y estado
  precio?: number;
  estado?: string;
  kilometraje?: number;
  imagen?: string;
}
