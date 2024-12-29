import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Trophy, Youtube, Award, Users, Sparkles, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingHero = () => {
  const { signInWithGoogle } = useAuth();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const [backgroundTrails, setBackgroundTrails] = useState([]);

  const scrollToCategories = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (trail.length > 10) {
      const timer = setTimeout(() => {
        setTrail((prev) => prev.slice(1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [trail]);

  useEffect(() => {
    const trails = Array.from({ length: 30 }).map((_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 200 + 100,
      color: Math.random() > 0.5 
        ? `rgba(242, 163, 102, ${Math.random() * 0.2 + 0.1})`
        : `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`,
      blur: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 5,
    }));
    setBackgroundTrails(trails);
  }, []);

  return (
    <div className="relative">
      {/* Animated background */}
      <div className="fixed inset-0 animate-gradient bg-gradient-to-br from-blue-900/30 via-black to-blue-800/30" />
      
      {/* Background trails */}
      {backgroundTrails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed rounded-full pointer-events-none"
          style={{
            width: trail.size,
            height: trail.size,
            left: trail.x,
            top: trail.y,
            background: `radial-gradient(circle, ${trail.color} 0%, transparent 70%)`,
            filter: `blur(${trail.blur}px)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, x: [0, 100, -100, 0], y: [0, 100, -100, 0] }}
          transition={{
            duration: trail.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Cursor glow */}
      <motion.div
        className="fixed w-24 h-24 pointer-events-none"
        style={{
          left: cursorPosition.x - 48,
          top: cursorPosition.y - 48,
          background: 'radial-gradient(circle, rgba(242,163,102,0.15) 0%, rgba(242,163,102,0) 70%)',
          borderRadius: '50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
      />

      {/* Cursor trail */}
      {trail.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed w-12 h-12 pointer-events-none"
          style={{
            left: pos.x - 24,
            top: pos.y - 24,
            background: 'radial-gradient(circle, rgba(242,163,102,0.05) 0%, rgba(242,163,102,0) 70%)',
            borderRadius: '50%',
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      {/* Main hero section */}
      <div className="relative min-h-screen flex flex-col">
        <nav className="relative z-10 glass">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#F2A366]">POTY 2024</h1>
            <button
              onClick={signInWithGoogle}
              className="px-6 py-2 bg-[#F2A366] hover:bg-[#e89255] text-black font-semibold rounded-full transition-all transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block mt-0 md:mt-8"> {/* Añadido mt-12 para moverla más arriba */}
  <img 
    src="/poty-logo.png" 
    alt="POTY Trophy" 
    className="relative w-80 md:w-96 h-auto mx-auto mb-8 animate-float" // Aumentado el tamaño para móviles
  />
</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#F2A366]">
              PAPOI OF THE YEAR
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12">
              Vota por los mejores momentos del año
            </p>
          </div>
        </div>

        {/* Botón de flecha centrado */}
        <div className="absolute bottom-20 sm:bottom-8 w-full flex justify-center">
          <button 
            onClick={scrollToCategories}
            className="text-[#F2A366] animate-bounce"
          >
            <ChevronDown size={48} />
          </button>
        </div>
      </div>

      {/* Categories section */}
      <div className="relative min-h-screen bg-black/50 glass">
        <div className="container mx-auto px-6 sm:px-4 py-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-16 text-[#F2A366] neon-glow">
            Categorías
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <CategoryCard 
                key={index}
                icon={categoryIcons[index % categoryIcons.length]}
                title={category.name}
                description={`Vota por el ${category.name.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-black/50 py-6 text-center text-gray-400">
        <p>© 2024 POTY. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

const categoryIcons = [Trophy, Award, Youtube, Users];

const categories = [
  { name: 'Arco del Año' },
  { name: 'Tilteo del Año' },
  { name: 'Clip del Año' },
  { name: 'Payaso del Año' },
  { name: 'Canción del Año' },
  { name: 'Naco del Año' },
  { name: 'Menos Activo' },
  { name: 'Papoi del Año' },
  { name: 'CCR del Año' },
];

const CategoryCard = ({ icon: Icon, title, description }) => (
  <div className="glass p-6 rounded-lg hover:border-[#F2A366]/50 transition-all group hover:scale-105 transform duration-300">
    <div className="mb-4 text-[#F2A366] group-hover:scale-110 transform transition-transform duration-300">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default LandingHero;