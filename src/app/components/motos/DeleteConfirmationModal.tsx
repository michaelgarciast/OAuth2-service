'use client';

import { MotoDTO } from '@/motos/application/dtos/motoDTO';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmationModalProps {
  moto: MotoDTO;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function DeleteConfirmationModal({
  moto,
  onConfirm,
  onCancel,
  loading = false,
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md text-gray-800 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
        </div>

        <h2 className="text-xl font-semibold text-center mb-2">Eliminar Moto</h2>

        <p className="text-gray-600 text-center mb-4">
          ¿Estás seguro de que deseas eliminar la moto{' '}
          <span className="font-semibold text-gray-900">
            {moto.marca} {moto.modelo} ({moto.year})
          </span>
          ?
        </p>

        <p className="text-sm text-gray-500 text-center mb-6">
          Esta acción no se puede deshacer. Se eliminarán todos los datos asociados a esta moto.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
