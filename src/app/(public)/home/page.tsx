'use client';

import { useState } from 'react';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Encuentra tu Moto Ideal",
      description: "Explora miles de motos nuevas y usadas de todas las marcas",
      icon: "🏍️"
    },
    {
      title: "Compra Segura",
      description: "Proceso de compra 100% seguro con garantía y financiamiento",
      icon: "🛡️"
    },
    {
      title: "Comunidad Motera",
      description: "Conecta con otros moteros y comparte tu pasión",
      icon: "👥"
    }
  ];

  const brands = [
    "Yamaha", "Honda", "Kawasaki", "Suzuki", "Ducati", "BMW", "Harley-Davidson", "KTM"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="mb-8">
              <span className="text-6xl mb-4 block animate-pulse">🏍️</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Bienvenido a 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600"> MotoApp</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                La plataforma definitiva para motociclistas. Compra, vende y conecta con la comunidad motera más grande del país.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Explorar Motos
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
                Ver Video
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué elegir MotoApp?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Descubre las características que hacen de nuestra app la mejor opción para los amantes de las motos
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  activeFeature === index 
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-600/20 border-2 border-orange-500/50' 
                    : 'bg-white/10 hover:bg-white/20 border-2 border-white/10'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Marcas Disponibles
            </h2>
            <p className="text-gray-300 text-lg">
              Encuentra motos de las mejores marcas del mundo
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 transform hover:scale-105 cursor-pointer border border-white/10"
              >
                <p className="text-white font-semibold text-lg">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500/10 to-red-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">50K+</div>
              <div className="text-gray-300">Motos Disponibles</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">25K+</div>
              <div className="text-gray-300">Usuarios Activos</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">15K+</div>
              <div className="text-gray-300">Ventas Realizadas</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white">98%</div>
              <div className="text-gray-300">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para encontrar tu próxima moto?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Únete a miles de moteros que ya confían en MotoApp para comprar, vender y conectar con la comunidad motera.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Crear Cuenta Gratis
            </button>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 backdrop-blur-sm">
              Explorar Sin Registro
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}