'use client';

import { useCallback, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useMoto } from '@/motos/infrastructure/adapters/hooks/useMoto';
import { MotoDTO, CreateMotoDTO, UpdateMotoDTO } from '@/motos/application/dtos/motoDTO';
import MotoForm from '@/app/components/motos/MotoForm';
import MotoCard from '@/app/components/motos/MotoCard';
import MotoModal from '@/app/components/motos/MotoModal';
import DeleteConfirmationModal from '@/app/components/motos/DeleteConfirmationModal';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

type MotoFilters = {
  marca?: string;
  year?: number;
  estado?: string;
  userId: string;
};

export default function MotosPage() {
  const { data: session } = useSession();
  const {
    motos,
    loading,
    error,
    total,
    page,
    totalPages,
    createMoto,
    getMotos,
    updateMoto,
    deleteMoto,
    clearError,
  } = useMoto();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingMoto, setEditingMoto] = useState<MotoDTO | null>(null);
  const [deletingMoto, setDeletingMoto] = useState<MotoDTO | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    marca: '',
    year: '',
    estado: '',
  });

  const loadMotos = useCallback(async () => {
    if (!session?.user?.id) return;

    const searchFilters: MotoFilters = {
      userId: session.user.id,
    };

    if (filters.marca) {
      searchFilters.marca = filters.marca;
    }
    if (filters.estado) {
      searchFilters.estado = filters.estado;
    }
    // Si hay término de búsqueda, agregarlo como filtro de marca
    if (searchTerm) {
      searchFilters.marca = searchTerm;
    }
    // Agregar year solo si es un número válido
    if (filters.year && !isNaN(Number(filters.year))) {
      searchFilters.year = Number(filters.year);
    }

    await getMotos(currentPage, searchFilters);
  }, [session?.user?.id, currentPage, filters, searchTerm, getMotos]);

  useEffect(() => {
    if (session?.user?.id) {
      loadMotos();
    }
  }, [session?.user?.id, currentPage, filters, loadMotos]);

  const handleCreateMoto = async (motoData: CreateMotoDTO | UpdateMotoDTO) => {
    if (!session?.user?.id) return;

    const success = await createMoto({
      ...(motoData as CreateMotoDTO),
      userId: session.user.id,
    });

    if (success) {
      setShowCreateForm(false);
      loadMotos();
    }
  };

  const handleUpdateMoto = async (motoData: UpdateMotoDTO) => {
    if (!session?.user?.id || !editingMoto) return;

    const success = await updateMoto(editingMoto.id, motoData);

    if (success) {
      setEditingMoto(null);
      loadMotos();
    }
  };

  const handleDeleteMoto = async () => {
    if (!session?.user?.id || !deletingMoto) return;

    const success = await deleteMoto(deletingMoto.id);

    if (success) {
      setDeletingMoto(null);
      loadMotos();
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadMotos();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ marca: '', year: '', estado: '' });
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm || filters.marca || filters.year || filters.estado;

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Mis Motos
          </h1>
          <p className="text-gray-700 mt-2 text-lg">Gestiona tu colección de motos</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Agregar Moto
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-end">
          {/** Search **/}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <MagnifyingGlassIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                        h-5 w-5 text-blue-400"
              />
              <input
                type="text"
                placeholder="Buscar por marca, modelo..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2.5 
                     border border-blue-200 rounded-lg 
                     focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                     bg-blue-50 placeholder:text-blue-400 text-blue-900"
              />
            </div>
          </div>

          {/** Filters **/}
          <div className="flex flex-col sm:flex-row gap-2 min-w-0">
            <select
              value={filters.marca}
              onChange={e => setFilters(prev => ({ ...prev, marca: e.target.value }))}
              className="w-full sm:w-48 px-3 py-2.5 
                   border border-blue-200 rounded-lg 
                   focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                   bg-blue-50 text-blue-900"
            >
              <option value="">Todas las marcas</option>
              <option value="Honda">Honda</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Kawasaki">Kawasaki</option>
              <option value="Suzuki">Suzuki</option>
              <option value="BMW">BMW</option>
              <option value="Ducati">Ducati</option>
              <option value="KTM">KTM</option>
              <option value="Harley-Davidson">Harley-Davidson</option>
            </select>

            <select
              value={filters.estado}
              onChange={e => setFilters(prev => ({ ...prev, estado: e.target.value }))}
              className="w-full sm:w-48 px-3 py-2.5 
                   border border-blue-200 rounded-lg 
                   focus:ring-2 focus:ring-blue-400 focus:border-transparent 
                   bg-blue-50 text-blue-900"
            >
              <option value="">Todos los estados</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
              <option value="seminuevo">Seminuevo</option>
            </select>
          </div>

          {/** Action Buttons **/}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleSearch}
              className="px-6 py-2.5 min-w-[120px]
                   bg-blue-600 hover:bg-blue-700 
                   text-white font-semibold rounded-lg 
                   transition-colors duration-200 shadow
                   flex items-center justify-center"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filtrar
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 
                     bg-blue-100 hover:bg-blue-200 
                     text-blue-700 font-medium rounded-lg 
                     transition-colors duration-200
                     flex items-center justify-center"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={clearError}
                className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Cargando motos...</p>
          </div>
        </div>
      )}

      {/* Motos Grid */}
      {!loading && (
        <>
          {motos.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-300">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay motos</h3>
              <p className="mt-1 text-sm text-gray-500">
                {hasActiveFilters
                  ? 'No se encontraron motos con los filtros aplicados.'
                  : 'Comienza agregando tu primera moto.'}
              </p>
              {!hasActiveFilters && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Agregar Primera Moto
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {motos.map(moto => (
                  <MotoCard
                    key={moto.id}
                    moto={moto}
                    onEdit={() => setEditingMoto(moto)}
                    onDelete={() => setDeletingMoto(moto)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8">
                  <div className="text-sm text-gray-700">
                    Mostrando {(page - 1) * 12 + 1} a {Math.min(page * 12, total)} de {total} motos
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                    >
                      Anterior
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-100 border border-blue-200 rounded-lg">
                      {page} de {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <MotoModal
          title="Agregar Nueva Moto"
          onClose={() => setShowCreateForm(false)}
        >
          <MotoForm
            onSubmit={handleCreateMoto}
            onCancel={() => setShowCreateForm(false)}
            loading={loading}
          />
        </MotoModal>
      )}

      {/* Edit Form Modal */}
      {editingMoto && (
        <MotoModal
          title="Editar Moto"
          onClose={() => setEditingMoto(null)}
        >
          <MotoForm
            moto={editingMoto}
            onSubmit={handleUpdateMoto}
            onCancel={() => setEditingMoto(null)}
            loading={loading}
          />
        </MotoModal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMoto && (
        <DeleteConfirmationModal
          moto={deletingMoto}
          onConfirm={handleDeleteMoto}
          onCancel={() => setDeletingMoto(null)}
          loading={loading}
        />
      )}
    </div>
  );
}
