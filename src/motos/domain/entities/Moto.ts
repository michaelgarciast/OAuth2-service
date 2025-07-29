export class Moto {
  constructor(
    public readonly id: string,
    public readonly marca: string,
    public readonly modelo: string,
    public readonly year: number,
    public readonly descripcion: string,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly motorCilindrada?: number,
    public readonly motorTipo?: string,
    public readonly motorPotencia?: number,
    public readonly motorTorque?: number,
    public readonly motorCombustible?: string,
    public readonly velocidadMaxima?: number,
    public readonly aceleracion0a100?: number,
    public readonly velocidadCrucero?: number,
    public readonly peso?: number,
    public readonly alturaAsiento?: number,
    public readonly capacidadTanque?: number,
    public readonly autonomia?: number,
    public readonly colores?: string[],
    public readonly transmision?: string,
    public readonly frenosDelanteros?: string,
    public readonly frenosTraseros?: string,
    public readonly suspension?: string,
    public readonly neumaticos?: string,
    public readonly precio?: number,
    public readonly estado?: string,
    public readonly kilometraje?: number,
    public readonly imagen?: string
  ) {}

  // Métodos de negocio
  static create(data: {
    marca: string;
    modelo: string;
    year: number;
    descripcion: string;
    userId: string;
    motorCilindrada?: number;
    motorTipo?: string;
    motorPotencia?: number;
    motorTorque?: number;
    motorCombustible?: string;
    velocidadMaxima?: number;
    aceleracion0a100?: number;
    velocidadCrucero?: number;
    peso?: number;
    alturaAsiento?: number;
    capacidadTanque?: number;
    autonomia?: number;
    colores?: string[];
    transmision?: string;
    frenosDelanteros?: string;
    frenosTraseros?: string;
    suspension?: string;
    neumaticos?: string;
    precio?: number;
    estado?: string;
    kilometraje?: number;
    imagen?: string;
  }): Moto {
    // Validaciones de negocio
    if (data.year < 1900 || data.year > new Date().getFullYear() + 1) {
      throw new Error('Año de la moto no válido');
    }

    if (data.precio && data.precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    if (data.kilometraje && data.kilometraje < 0) {
      throw new Error('El kilometraje no puede ser negativo');
    }

    const now = new Date();
    return new Moto(
      crypto.randomUUID(), // Generar ID único
      data.marca,
      data.modelo,
      data.year,
      data.descripcion,
      data.userId,
      now,
      now,
      data.motorCilindrada,
      data.motorTipo,
      data.motorPotencia,
      data.motorTorque,
      data.motorCombustible,
      data.velocidadMaxima,
      data.aceleracion0a100,
      data.velocidadCrucero,
      data.peso,
      data.alturaAsiento,
      data.capacidadTanque,
      data.autonomia,
      data.colores,
      data.transmision,
      data.frenosDelanteros,
      data.frenosTraseros,
      data.suspension,
      data.neumaticos,
      data.precio,
      data.estado,
      data.kilometraje,
      data.imagen
    );
  }

  // Método para actualizar la moto
  update(
    data: Partial<{
      marca: string;
      modelo: string;
      year: number;
      descripcion: string;
      motorCilindrada: number;
      motorTipo: string;
      motorPotencia: number;
      motorTorque: number;
      motorCombustible: string;
      velocidadMaxima: number;
      aceleracion0a100: number;
      velocidadCrucero: number;
      peso: number;
      alturaAsiento: number;
      capacidadTanque: number;
      autonomia: number;
      colores: string[];
      transmision: string;
      frenosDelanteros: string;
      frenosTraseros: string;
      suspension: string;
      neumaticos: string;
      precio: number;
      estado: string;
      kilometraje: number;
      imagen: string;
    }>
  ): Moto {
    // Validaciones similares a create
    if (data.year && (data.year < 1900 || data.year > new Date().getFullYear() + 1)) {
      throw new Error('Año de la moto no válido');
    }

    if (data.precio && data.precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    if (data.kilometraje && data.kilometraje < 0) {
      throw new Error('El kilometraje no puede ser negativo');
    }

    return new Moto(
      this.id,
      data.marca ?? this.marca,
      data.modelo ?? this.modelo,
      data.year ?? this.year,
      data.descripcion ?? this.descripcion,
      this.userId,
      this.createdAt,
      new Date(), // updatedAt se actualiza
      data.motorCilindrada ?? this.motorCilindrada,
      data.motorTipo ?? this.motorTipo,
      data.motorPotencia ?? this.motorPotencia,
      data.motorTorque ?? this.motorTorque,
      data.motorCombustible ?? this.motorCombustible,
      data.velocidadMaxima ?? this.velocidadMaxima,
      data.aceleracion0a100 ?? this.aceleracion0a100,
      data.velocidadCrucero ?? this.velocidadCrucero,
      data.peso ?? this.peso,
      data.alturaAsiento ?? this.alturaAsiento,
      data.capacidadTanque ?? this.capacidadTanque,
      data.autonomia ?? this.autonomia,
      data.colores ?? this.colores,
      data.transmision ?? this.transmision,
      data.frenosDelanteros ?? this.frenosDelanteros,
      data.frenosTraseros ?? this.frenosTraseros,
      data.suspension ?? this.suspension,
      data.neumaticos ?? this.neumaticos,
      data.precio ?? this.precio,
      data.estado ?? this.estado,
      data.kilometraje ?? this.kilometraje,
      data.imagen ?? this.imagen
    );
  }
}
