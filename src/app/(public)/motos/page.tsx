'use client';

import { useEffect, useState } from 'react';
import MotoCard from '@/app/components/motos/MotoCard';
import { MotoDTO } from '@/motos/application/dtos/motoDTO';
import Link from 'next/link';

export default function MotosPage() {
  const [motos, setMotos] = useState<MotoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const response = await fetch('/api/motos');
        if (!response.ok) {
          throw new Error('Error al cargar las motos');
        }
        const result = await response.json();
        // Handle the structured response format
        const motosData = result.data || result;
        setMotos(Array.isArray(motosData) ? motosData : []);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar las motos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMotos();
  }, []);

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
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestras Motos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(motos) &&
          motos.map(moto => (
            <div
              key={moto.id}
              className="flex flex-col gap-2"
            >
              <MotoCard
                moto={moto}
                showActions={false}
              />
              <Link
                href={`/motos/${moto.id}`}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              >
                Ver detalle
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
