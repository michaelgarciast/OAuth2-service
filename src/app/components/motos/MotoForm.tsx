'use client';

import { useState, useEffect } from 'react';
import { MotoDTO, CreateMotoDTO, UpdateMotoDTO } from '@/motos/application/dtos/motoDTO';

interface MotoFormProps {
  moto?: MotoDTO;
  onSubmit: (data: CreateMotoDTO | UpdateMotoDTO) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export default function MotoForm({ moto, onSubmit, onCancel, loading = false }: MotoFormProps) {
  const [formData, setFormData] = useState<Partial<CreateMotoDTO>>({
    marca: '',
    modelo: '',
    year: new Date().getFullYear(),
    descripcion: '',
    motorCilindrada: undefined,
    motorTipo: '',
    motorPotencia: undefined,
    motorTorque: undefined,
    motorCombustible: '',
    velocidadMaxima: undefined,
    aceleracion0a100: undefined,
    velocidadCrucero: undefined,
    peso: undefined,
    alturaAsiento: undefined,
    capacidadTanque: undefined,
    autonomia: undefined,
    colores: [],
    transmision: '',
    frenosDelanteros: '',
    frenosTraseros: '',
    suspension: '',
    neumaticos: '',
    precio: undefined,
    estado: '',
    kilometraje: undefined,
    imagen: '',
  });

  const [newColor, setNewColor] = useState('');

  useEffect(() => {
    if (moto) {
      setFormData({
        marca: moto.marca,
        modelo: moto.modelo,
        year: moto.year,
        descripcion: moto.descripcion,
        motorCilindrada: moto.motorCilindrada,
        motorTipo: moto.motorTipo,
        motorPotencia: moto.motorPotencia,
        motorTorque: moto.motorTorque,
        motorCombustible: moto.motorCombustible,
        velocidadMaxima: moto.velocidadMaxima,
        aceleracion0a100: moto.aceleracion0a100,
        velocidadCrucero: moto.velocidadCrucero,
        peso: moto.peso,
        alturaAsiento: moto.alturaAsiento,
        capacidadTanque: moto.capacidadTanque,
        autonomia: moto.autonomia,
        colores: moto.colores || [],
        transmision: moto.transmision,
        frenosDelanteros: moto.frenosDelanteros,
        frenosTraseros: moto.frenosTraseros,
        suspension: moto.suspension,
        neumaticos: moto.neumaticos,
        precio: moto.precio,
        estado: moto.estado,
        kilometraje: moto.kilometraje,
        imagen: moto.imagen,
      });
    }
  }, [moto]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberInputChange = (field: string, value: string) => {
    const numValue = value === '' ? undefined : Number(value);
    handleInputChange(field, numValue);
  };

  const addColor = () => {
    if (newColor.trim() && !formData.colores?.includes(newColor.trim())) {
      handleInputChange('colores', [...(formData.colores || []), newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove: string) => {
    handleInputChange('colores', formData.colores?.filter(color => color !== colorToRemove) || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!formData.marca?.trim() || !formData.modelo?.trim() || !formData.year) {
      alert('Por favor completa los campos obligatorios: Marca, Modelo y Año');
      return;
    }

    await onSubmit(formData as CreateMotoDTO | UpdateMotoDTO);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Información Básica */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
            <input
              type="text"
              value={formData.marca || ''}
              onChange={e => handleInputChange('marca', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
            <input
              type="text"
              value={formData.modelo || ''}
              onChange={e => handleInputChange('modelo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Año *</label>
            <input
              type="number"
              value={formData.year || ''}
              onChange={e => handleNumberInputChange('year', e.target.value)}
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              value={formData.estado || ''}
              onChange={e => handleInputChange('estado', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar estado</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
              <option value="seminuevo">Seminuevo</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={formData.descripcion || ''}
            onChange={e => handleInputChange('descripcion', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe las características principales de la moto..."
          />
        </div>
      </div>

      {/* Motor */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Motor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cilindrada (cc)</label>
            <input
              type="number"
              value={formData.motorCilindrada || ''}
              onChange={e => handleNumberInputChange('motorCilindrada', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Motor</label>
            <select
              value={formData.motorTipo || ''}
              onChange={e => handleInputChange('motorTipo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar tipo</option>
              <option value="2T">2T (Dos tiempos)</option>
              <option value="4T">4T (Cuatro tiempos)</option>
              <option value="eléctrico">Eléctrico</option>
              <option value="híbrido">Híbrido</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potencia (HP)</label>
            <input
              type="number"
              value={formData.motorPotencia || ''}
              onChange={e => handleNumberInputChange('motorPotencia', e.target.value)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Torque (Nm)</label>
            <input
              type="number"
              value={formData.motorTorque || ''}
              onChange={e => handleNumberInputChange('motorTorque', e.target.value)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
            <select
              value={formData.motorCombustible || ''}
              onChange={e => handleInputChange('motorCombustible', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar combustible</option>
              <option value="gasolina">Gasolina</option>
              <option value="diesel">Diesel</option>
              <option value="eléctrico">Eléctrico</option>
              <option value="híbrido">Híbrido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rendimiento */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Rendimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Velocidad Máxima (km/h)
            </label>
            <input
              type="number"
              value={formData.velocidadMaxima || ''}
              onChange={e => handleNumberInputChange('velocidadMaxima', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aceleración 0-100 (s)
            </label>
            <input
              type="number"
              value={formData.aceleracion0a100 || ''}
              onChange={e => handleNumberInputChange('aceleracion0a100', e.target.value)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Velocidad Crucero (km/h)
            </label>
            <input
              type="number"
              value={formData.velocidadCrucero || ''}
              onChange={e => handleNumberInputChange('velocidadCrucero', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Características Físicas */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Características Físicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
            <input
              type="number"
              value={formData.peso || ''}
              onChange={e => handleNumberInputChange('peso', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Altura Asiento (mm)
            </label>
            <input
              type="number"
              value={formData.alturaAsiento || ''}
              onChange={e => handleNumberInputChange('alturaAsiento', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacidad Tanque (L)
            </label>
            <input
              type="number"
              value={formData.capacidadTanque || ''}
              onChange={e => handleNumberInputChange('capacidadTanque', e.target.value)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autonomía (km)</label>
            <input
              type="number"
              value={formData.autonomia || ''}
              onChange={e => handleNumberInputChange('autonomia', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Colores */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Colores Disponibles</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
              placeholder="Agregar color..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addColor())}
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Agregar
            </button>
          </div>
          {formData.colores && formData.colores.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.colores.map((color, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Características Adicionales */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Características Adicionales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmisión</label>
            <select
              value={formData.transmision || ''}
              onChange={e => handleInputChange('transmision', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar transmisión</option>
              <option value="manual">Manual</option>
              <option value="automática">Automática</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Suspensión</label>
            <input
              type="text"
              value={formData.suspension || ''}
              onChange={e => handleInputChange('suspension', e.target.value)}
              placeholder="Ej: Telescópica, Monoshock..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frenos Delanteros
            </label>
            <select
              value={formData.frenosDelanteros || ''}
              onChange={e => handleInputChange('frenosDelanteros', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar tipo</option>
              <option value="disco">Disco</option>
              <option value="tambor">Tambor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frenos Traseros</label>
            <select
              value={formData.frenosTraseros || ''}
              onChange={e => handleInputChange('frenosTraseros', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar tipo</option>
              <option value="disco">Disco</option>
              <option value="tambor">Tambor</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Neumáticos</label>
          <input
            type="text"
            value={formData.neumaticos || ''}
            onChange={e => handleInputChange('neumaticos', e.target.value)}
            placeholder="Ej: 120/70-17, 180/55-17..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Precio y Kilometraje */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Precio y Kilometraje</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($)</label>
            <input
              type="number"
              value={formData.precio || ''}
              onChange={e => handleNumberInputChange('precio', e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje (km)</label>
            <input
              type="number"
              value={formData.kilometraje || ''}
              onChange={e => handleNumberInputChange('kilometraje', e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
          <input
            type="url"
            value={formData.imagen || ''}
            onChange={e => handleInputChange('imagen', e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {moto ? 'Actualizar' : 'Crear'} Moto
        </button>
      </div>
    </form>
  );
}
