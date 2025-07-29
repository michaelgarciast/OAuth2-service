import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { MotoDTO, CreateMotoDTO, UpdateMotoDTO } from '../../../application/dtos/motoDTO';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface UseMotoState {
  motos: MotoDTO[];
  currentMoto: MotoDTO | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
}

export interface UseMotoActions {
  createMoto: (motoData: CreateMotoDTO) => Promise<MotoDTO | null>;
  getMotos: (page?: number, filters?: any) => Promise<void>;
  getMotoById: (id: string) => Promise<MotoDTO | null>;
  updateMoto: (id: string, motoData: UpdateMotoDTO) => Promise<MotoDTO | null>;
  deleteMoto: (id: string) => Promise<boolean>;
  clearError: () => void;
  setCurrentMoto: (moto: MotoDTO | null) => void;
}

export const useMoto = (): UseMotoState & UseMotoActions => {
  const { data: session } = useSession();
  const [state, setState] = useState<UseMotoState>({
    motos: [],
    currentMoto: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: loading ? null : prev.error }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, loading: false }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const setCurrentMoto = useCallback((moto: MotoDTO | null) => {
    setState(prev => ({ ...prev, currentMoto: moto }));
  }, []);

  const getMotos = useCallback(async (page = 1, filters: any = {}) => {
    if (!session?.user) return;

    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...filters
      }).toString();

      const response = await fetch(`${API_URL}/motos?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al obtener las motos');
      }

      const data = await response.json();
      setState(prev => ({
        ...prev,
        motos: data.data || [],
        total: data.meta?.total || 0,
        page: data.meta?.page || 1,
        totalPages: data.meta?.totalPages || 1,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [session, setLoading, setError]);

  const createMoto = useCallback(async (motoData: CreateMotoDTO): Promise<MotoDTO | null> => {
    if (!session?.user) return null;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/motos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motoData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al crear la moto');
      }

      const newMoto = await response.json();
      setState(prev => ({
        ...prev,
        motos: [newMoto, ...prev.motos],
        currentMoto: newMoto,
      }));
      return newMoto;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al crear la moto');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session, setLoading, setError]);

  const getMotoById = useCallback(async (id: string): Promise<MotoDTO | null> => {
    if (!session?.user) return null;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/motos/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al obtener la moto');
      }

      const moto = await response.json();
      setState(prev => ({
        ...prev,
        currentMoto: moto,
      }));
      return moto;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session, setLoading, setError]);

  const updateMoto = useCallback(async (id: string, motoData: UpdateMotoDTO): Promise<MotoDTO | null> => {
    if (!session?.user) return null;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/motos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(motoData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al actualizar la moto');
      }

      const updatedMoto = await response.json();
      setState(prev => ({
        ...prev,
        motos: prev.motos.map(moto => moto.id === id ? updatedMoto : moto),
        currentMoto: updatedMoto,
      }));
      return updatedMoto;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al actualizar la moto');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session, setLoading, setError]);

  const deleteMoto = useCallback(async (id: string): Promise<boolean> => {
    if (!session?.user) return false;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/motos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al eliminar la moto');
      }

      setState(prev => ({
        ...prev,
        motos: prev.motos.filter(moto => moto.id !== id),
        currentMoto: prev.currentMoto?.id === id ? null : prev.currentMoto,
      }));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al eliminar la moto');
      return false;
    } finally {
      setLoading(false);
    }
  }, [session, setLoading, setError]);

  return {
    ...state,
    createMoto,
    getMotos,
    getMotoById,
    updateMoto,
    deleteMoto,
    clearError,
    setCurrentMoto,
  };
};

export const useMotosList = (filters: any = {}) => {
  const { getMotos, ...state } = useMoto();

  const loadMotos = useCallback((page = 1) => {
    return getMotos(page, filters);
  }, [getMotos, filters]);

  return {
    ...state,
    loadMotos,
  };
};

export const useMotoDetail = (motoId?: string) => {
  const { 
    getMotoById, 
    updateMoto, 
    deleteMoto, 
    currentMoto, 
    loading, 
    error, 
    ...state 
  } = useMoto();

  const loadMoto = useCallback(async () => {
    if (!motoId) return undefined;
    return getMotoById(motoId);
  }, [getMotoById, motoId]);

  const updateCurrentMoto = useCallback(async (motoData: UpdateMotoDTO) => {
    if (!motoId) throw new Error('No moto ID provided');
    return updateMoto(motoId, motoData);
  }, [updateMoto, motoId]);

  const deleteCurrentMoto = useCallback(async () => {
    if (!motoId) throw new Error('No moto ID provided');
    return deleteMoto(motoId);
  }, [deleteMoto, motoId]);

  return {
    ...state,
    currentMoto,
    loading,
    error,
    loadMoto,
    updateCurrentMoto,
    deleteCurrentMoto
  };
};
