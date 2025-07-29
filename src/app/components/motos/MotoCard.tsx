'use client';

import { MotoDTO } from '@/motos/application/dtos/motoDTO';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
interface MotoCardProps {
  moto: MotoDTO;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export default function MotoCard({ moto, onEdit, onDelete, showActions = true }: MotoCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return 'No especificado';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatYear = (year: number) => {
    return year.toString();
  };

  const getEstadoColor = (estado?: string) => {
    switch (estado) {
      case 'nuevo':
        return 'bg-green-100 text-green-800';
      case 'usado':
        return 'bg-orange-100 text-orange-800';
      case 'seminuevo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoText = (estado?: string) => {
    switch (estado) {
      case 'nuevo':
        return 'Nuevo';
      case 'usado':
        return 'Usado';
      case 'seminuevo':
        return 'Seminuevo';
      default:
        return 'No especificado';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Imagen */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {moto.imagen ? (
          <Image
            src={moto.imagen}
            alt={`${moto.marca} ${moto.modelo}`}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
            unoptimized={moto.imagen.startsWith('data:') || moto.imagen.startsWith('blob:')}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        )}

        {/* Estado badge */}
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(
              moto.estado
            )}`}
          >
            {getEstadoText(moto.estado)}
          </span>
        </div>

        {/* Acciones */}
        {showActions && onEdit && onDelete && (
          <div className="absolute top-2 left-2 flex gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 bg-white/90 hover:bg-white text-gray-700 rounded-lg transition-colors duration-200"
              title="Editar"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 bg-white/90 hover:bg-white text-red-600 hover:text-red-700 rounded-lg transition-colors duration-200"
              title="Eliminar"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        {/* Título y año */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {moto.marca} {moto.modelo}
            </h3>
            <p className="text-sm text-gray-500">{formatYear(moto.year)}</p>
          </div>
        </div>

        {/* Descripción */}
        {moto.descripcion && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{moto.descripcion}</p>
        )}

        {/* Especificaciones principales */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {moto.motorCilindrada && (
            <div className="text-xs">
              <span className="text-gray-500">Cilindrada:</span>
              <p className="font-medium text-gray-900">{moto.motorCilindrada} cc</p>
            </div>
          )}
          {moto.motorPotencia && (
            <div className="text-xs">
              <span className="text-gray-500">Potencia:</span>
              <p className="font-medium text-gray-900">{moto.motorPotencia} HP</p>
            </div>
          )}
          {moto.velocidadMaxima && (
            <div className="text-xs">
              <span className="text-gray-500">V. Máx:</span>
              <p className="font-medium text-gray-900">{moto.velocidadMaxima} km/h</p>
            </div>
          )}
          {moto.peso && (
            <div className="text-xs">
              <span className="text-gray-500">Peso:</span>
              <p className="font-medium text-gray-900">{moto.peso} kg</p>
            </div>
          )}
        </div>

        {/* Colores */}
        {moto.colores && moto.colores.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Colores disponibles:</p>
            <div className="flex flex-wrap gap-1">
              {moto.colores.slice(0, 3).map((color, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {color}
                </span>
              ))}
              {moto.colores.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  +{moto.colores.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-sm">
            <span className="text-gray-500">Precio:</span>
            <p className="font-semibold text-gray-900">{formatPrice(moto.precio)}</p>
          </div>
          {moto.kilometraje && (
            <div className="text-sm text-right">
              <span className="text-gray-500">Km:</span>
              <p className="font-medium text-gray-900">
                {new Intl.NumberFormat('es-ES').format(moto.kilometraje)}
              </p>
            </div>
          )}
        </div>

        {/* Fecha de creación */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Creada: {new Date(moto.createdAt).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
}
