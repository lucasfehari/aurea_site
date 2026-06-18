import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ChevronLeft, ArrowRight, CheckCircle2, PlayCircle, MapPin, Expand } from 'lucide-react';

export const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: any) => p.code === id || p.id == id);
        setProperty(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-aurea-dark text-aurea-light flex items-center justify-center font-serif text-2xl uppercase tracking-widest">
        Carregando Detalhes...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="w-full min-h-screen bg-aurea-dark text-aurea-light flex flex-col items-center justify-center">
        <h1 className="font-serif text-4xl text-aurea-gold mb-4 uppercase tracking-tighter">Ativo não encontrado</h1>
        <button onClick={() => navigate('/portfolio')} className="font-sans text-xs uppercase tracking-widest text-aurea-light/70 hover:text-aurea-gold transition-colors flex items-center gap-2">
          <ChevronLeft size={16} /> Voltar ao Portfólio
        </button>
      </div>
    );
  }

  // Parse specs if it's a string from SQLite
  const specs = typeof property.specs === 'string' ? JSON.parse(property.specs || '[]') : (property.specs || []);
  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  return (
    <div className="w-full bg-aurea-dark text-aurea-light min-h-screen pt-24 md:pt-32 pb-24 relative overflow-hidden">
      <BackgroundGrid />
      
      {/* Header / Breacrumb */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-8 relative z-10">
        <Link to="/portfolio" className="inline-flex items-center gap-2 font-sans text-[10px] md:text-xs uppercase tracking-widest text-aurea-light/50 hover:text-aurea-gold transition-colors mb-8 group">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Voltar ao Portfólio
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              {property.tag && (
                <span className="bg-aurea-gold text-aurea-dark px-3 py-1 font-sans text-[9px] uppercase tracking-widest font-bold">
                  {property.tag}
                </span>
              )}
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold/80 flex items-center gap-2">
                <MapPin size={12} className="text-aurea-gold/50" />
                {property.location}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-aurea-light leading-[0.9] max-w-4xl">
              {property.title}
            </h1>
          </div>
          
          {property.price && (
             <div className="flex flex-col md:items-end gap-1 shrink-0 bg-white/5 p-6 border border-white/10 md:min-w-[300px]">
                <span className="font-sans text-[9px] uppercase tracking-widest text-aurea-gold/60">Valor do Ativo</span>
                <span className="font-serif text-3xl md:text-4xl text-aurea-gold tracking-tighter">{property.price}</span>
                {property.paymentCondition && (
                  <span className="font-sans text-[9px] uppercase tracking-widest text-aurea-light/40 mt-2">{property.paymentCondition}</span>
                )}
             </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-20 relative z-10">
        <div className="flex flex-col gap-4">
          {/* Main Image Container */}
          <div className="w-full aspect-video md:aspect-[21/9] bg-aurea-surface overflow-hidden relative group border border-white/5">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                src={images[activeImageIndex]}
                alt={`${property.title} - Imagem ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-aurea-dark/90 via-transparent to-transparent pointer-events-none"></div>
            
            <button 
              onClick={() => setIsFullscreen(true)}
              className="absolute top-6 right-6 w-12 h-12 bg-aurea-dark/50 backdrop-blur-md flex items-center justify-center rounded-full border border-white/10 text-aurea-light hover:text-aurea-gold hover:border-aurea-gold/50 transition-all opacity-0 group-hover:opacity-100 z-20"
            >
              <Expand size={18} />
            </button>

            {/* Navigation Arrows (Left/Right) */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-aurea-dark/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-aurea-light hover:bg-aurea-gold hover:text-aurea-dark hover:border-aurea-gold transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-aurea-dark/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-aurea-light hover:bg-aurea-gold hover:text-aurea-dark hover:border-aurea-gold transition-all duration-300 opacity-0 group-hover:opacity-100 z-20"
                >
                  <ArrowRight size={20} />
                </button>

                {/* Navigation Dots (Bolinhas) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`transition-all duration-500 rounded-full ${
                        activeImageIndex === idx 
                          ? 'w-8 h-2 bg-aurea-gold' 
                          : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                      }`}
                      aria-label={`Ir para imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mt-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[4/3] overflow-hidden border transition-all duration-300 ${
                    activeImageIndex === idx ? 'border-aurea-gold' : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Main Details */}
        <div className="lg:col-span-7 lg:col-start-2 flex flex-col">
          <div className="mb-16">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-aurea-gold/50"></span>
              Visão Geral
            </h3>
            <p className="font-sans text-base md:text-lg text-aurea-light/80 uppercase tracking-widest leading-relaxed text-balance border-l border-white/10 pl-6 lg:pl-8">
              {property.summary}
            </p>
          </div>

          {property.audience && (
            <div className="mb-16 bg-white/5 p-8 md:p-12 border border-white/5 relative">
              <div className="absolute top-0 left-0 w-1/4 h-[1px] bg-gradient-to-r from-aurea-gold to-transparent"></div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-light/50 mb-4">
                Perfil de Investidor Ideal
              </h3>
              <p className="font-sans text-sm md:text-base text-aurea-light/90 uppercase tracking-wider leading-relaxed">
                {property.audience}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Specs */}
        <div className="lg:col-span-3 flex flex-col gap-12">
          {specs && specs.length > 0 && (
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold mb-8 flex items-center gap-4 border-b border-white/10 pb-4">
                Especificações
              </h3>
              <ul className="flex flex-col gap-4">
                {specs.map((spec: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-aurea-gold/70 shrink-0" />
                    <span className="font-sans text-[11px] uppercase tracking-widest text-aurea-light/80">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-4 pt-8 border-t border-white/10 mt-auto">
            {property.videoUrl && (
              <a href={property.videoUrl} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-3 bg-transparent border border-white/10 text-aurea-light px-6 py-4 font-sans uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 hover:border-aurea-gold/30 transition-all duration-500">
                <PlayCircle size={14} className="text-aurea-gold" />
                <span>Vídeo Apresentação</span>
              </a>
            )}
            <Link to="/contato" className="group w-full inline-flex items-center justify-center gap-4 bg-aurea-gold text-aurea-dark px-6 py-5 font-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-aurea-light transition-all duration-500">
              <span>{property.cta || "Falar com a Diretoria"}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-aurea-dark/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 md:p-8">
              <span className="font-sans text-[10px] uppercase tracking-widest text-aurea-gold">
                {activeImageIndex + 1} / {images.length}
              </span>
              <button 
                onClick={() => setIsFullscreen(false)}
                className="text-aurea-light hover:text-aurea-gold text-sm font-sans uppercase tracking-widest transition-colors"
              >
                Fechar [X]
              </button>
            </div>
            
            <div className="flex-grow flex items-center justify-center p-4 md:p-12 relative">
              <img 
                src={images[activeImageIndex]} 
                alt="Fullscreen view"
                className="max-w-full max-h-full object-contain border border-white/5"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-4 md:left-12 w-12 h-12 bg-aurea-dark/50 border border-white/10 rounded-full flex items-center justify-center text-aurea-light hover:text-aurea-gold hover:border-aurea-gold transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 md:right-12 w-12 h-12 bg-aurea-dark/50 border border-white/10 rounded-full flex items-center justify-center text-aurea-light hover:text-aurea-gold hover:border-aurea-gold transition-all"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
