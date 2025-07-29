'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MotoDTO } from '@/motos/application/dtos/motoDTO';
import Image from 'next/image';

const MAIN_FEATURES = [
  { key: 'motorCilindrada', label: 'Cilindrada', unit: 'cc' },
  { key: 'motorPotencia', label: 'Potencia', unit: 'HP' },
  { key: 'velocidadMaxima', label: 'Vel. Máx', unit: 'km/h' },
  { key: 'precio', label: 'Precio', unit: '$', isPrice: true },
];

export default function MotoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [moto, setMoto] = useState<MotoDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMoto = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/motos?page=1&limit=1000`);
        if (!response.ok) throw new Error('Error al cargar la moto');
        const result = await response.json();
        const motos: MotoDTO[] = result.data || [];
        const found = motos.find(m => m.id === id);
        if (!found) throw new Error('Moto no encontrada');
        setMoto(found);
        setSelectedColor(found.colores?.[0] || null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Error desconocido');
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMoto();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.back()}
        >
          Volver
        </button>
      </div>
    );
  }

  if (!moto) return null;

  // Características principales
  const mainFeatures = MAIN_FEATURES.map(f => {
    let value = moto[f.key as keyof MotoDTO];
    if (f.isPrice && value) {
      value = `$${Number(value).toLocaleString()}`;
    } else if (value && f.unit && !f.isPrice) {
      value = `${value} ${f.unit}`;
    } else if (!value) {
      value = '-';
    }
    // Asegurar que value sea string o number
    if (value instanceof Date) {
      value = value.toLocaleDateString();
    } else if (Array.isArray(value)) {
      value = value.join(', ');
    }
    return { ...f, value };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-full">
      <button
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => router.back()}
      >
        Volver
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center">
            {moto.imagen ? (
              <Image
                src={moto.imagen}
                alt={`${moto.marca} ${moto.modelo}`}
                width={500}
                height={350}
                className="w-full h-64 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400">Sin imagen</span>
              </div>
            )}
            {/* Selección de color */}
            {moto.colores && moto.colores.length > 0 && (
              <div className="flex gap-3 mt-4">
                {moto.colores.map((color, i) => (
                  <button
                    key={i}
                    title={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 focus:outline-none ${
                      selectedColor === color
                        ? 'border-blue-600 scale-110 shadow-lg'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <span className="block w-full h-full rounded-full border-2 border-white"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold mb-2">
              {moto.marca} {moto.modelo} ({moto.year})
            </h1>
            <p className="text-gray-600 mb-2">{moto.descripcion}</p>
            {/* Características principales */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {mainFeatures.map(f => (
                <div
                  key={f.key}
                  className="bg-blue-50 rounded-lg p-3 flex flex-col items-center shadow-sm"
                >
                  <span className="text-xs text-gray-500">{f.label}</span>
                  <span className="text-lg font-semibold text-blue-700">{f.value}</span>
                </div>
              ))}
            </div>
            {/* Características secundarias */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Tipo de motor:</span> {moto.motorTipo ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Torque:</span> {moto.motorTorque ?? '-'} Nm
              </div>
              <div>
                <span className="text-gray-500">Combustible:</span> {moto.motorCombustible ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">0-100 km/h:</span> {moto.aceleracion0a100 ?? '-'} s
              </div>
              <div>
                <span className="text-gray-500">Vel. crucero:</span> {moto.velocidadCrucero ?? '-'}{' '}
                km/h
              </div>
              <div>
                <span className="text-gray-500">Peso:</span> {moto.peso ?? '-'} kg
              </div>
              <div>
                <span className="text-gray-500">Altura asiento:</span> {moto.alturaAsiento ?? '-'}{' '}
                mm
              </div>
              <div>
                <span className="text-gray-500">Tanque:</span> {moto.capacidadTanque ?? '-'} L
              </div>
              <div>
                <span className="text-gray-500">Autonomía:</span> {moto.autonomia ?? '-'} km
              </div>
              <div>
                <span className="text-gray-500">Transmisión:</span> {moto.transmision ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Frenos delanteros:</span>{' '}
                {moto.frenosDelanteros ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Frenos traseros:</span> {moto.frenosTraseros ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Suspensión:</span> {moto.suspension ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Neumáticos:</span> {moto.neumaticos ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Estado:</span> {moto.estado ?? '-'}
              </div>
              <div>
                <span className="text-gray-500">Kilometraje:</span>{' '}
                {moto.kilometraje ? `${moto.kilometraje.toLocaleString()} km` : '-'}
              </div>
            </div>
            <button
              className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all text-lg"
              onClick={() => alert('¡Gracias por tu interés! Pronto te contactaremos.')}
            >
              Contactar
            </button>
            <div className="text-xs text-gray-400 mt-4">
              <div>Creada: {new Date(moto.createdAt).toLocaleDateString('es-ES')}</div>
              <div>Actualizada: {new Date(moto.updatedAt).toLocaleDateString('es-ES')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
