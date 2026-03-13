import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import tatamarques from '../assets/img/tata.png';

export const About = () => {
  return (
    <div className="w-full pt-32 pb-20">
      <BackgroundGrid />

      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
            Mais que Imóveis. <br />
            <span className="text-aurea-gold italic">Um Legado Patrimonial.</span>
          </h1>
          <p className="font-sans text-aurea-light/80 text-xl leading-relaxed">
            A Áurea não é uma imobiliária tradicional. Somos uma plataforma de curadoria patrimonial e mídia direcionada, criada para alinhar expectativas elevadas a execuções impecáveis.
          </p>
        </motion.div>
      </section>

      {/* A Diretoria - Modern Organic Layout */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 relative z-10">
        <div className="bg-aurea-surface rounded-[3rem] p-8 md:p-16 relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aurea-dark/50 to-transparent pointer-events-none"></div>

          <div className="text-center mb-16 relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-aurea-gold">A Diretoria</h2>
          </div>

          <div className="flex flex-col items-center max-w-xl mx-auto relative z-10">
            {/* Tatá Marques */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-8 border border-white/10">
                <img
                  src={tatamarques}
                  alt="Tatá Marques"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-serif text-3xl mb-2">Tatá Marques</h3>
              <p className="font-sans text-sm tracking-widest uppercase text-aurea-gold mb-2">Comunicador e Diretor Comercial</p>
              <p className="font-sans text-xs text-aurea-light/40 mb-6">CRECI SC 11ª Região — 73872 F | CRECI MS 14ª Região — 17501 F</p>
              <p className="font-sans text-aurea-light/70 leading-relaxed text-sm">
                Responsável por orquestrar a inteligência comercial e de comunicação da Áurea. Com forte penetração no mercado do Mato Grosso do Sul, Tatá garante que o posicionamento premium dos empreendimentos chegue aos empresários, executivos e famílias de alto padrão de forma assertiva, gerando credibilidade e negócios estruturados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O Nosso Manifesto */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <h2 className="font-sans text-sm tracking-[0.3em] uppercase text-aurea-gold mb-12">O Nosso Manifesto</h2>
        <p className="font-serif text-3xl md:text-5xl leading-tight text-aurea-light/90 text-balance">
          "Acreditamos que morar vai além do espaço físico. É uma escolha de <span className="text-aurea-gold italic">lifestyle</span> e proteção patrimonial. O investidor de alto padrão tem uma visão de longo prazo: ele busca crescimento de portfólio, mas não abre mão da localização privilegiada e do usufruto familiar. <span className="text-aurea-gold">Nós entregamos essa exata intersecção.</span>"
        </p>
      </section>
    </div>
  );
};
