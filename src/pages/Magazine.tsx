import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ArrowRight } from 'lucide-react';

export const Magazine = () => {
  return (
    <div className="w-full pt-32 pb-20">
      <BackgroundGrid />
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
              Revista Áurea: <br/>
              <span className="text-aurea-gold italic">A Mídia do Mercado Premium</span>
            </h1>
            <p className="font-sans text-aurea-light/80 text-lg leading-relaxed mb-8">
              O principal veículo de comunicação conectando o capital do Mato Grosso do Sul ao lifestyle de Santa Catarina. Muito além do impresso: um ecossistema de geração de negócios.
            </p>
            <button className="inline-flex items-center gap-3 bg-aurea-gold text-aurea-dark px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-aurea-light transition-colors">
              Quero Posicionar Minha Marca <ArrowRight size={16} />
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 bg-aurea-surface p-4">
              <img 
                src="https://images.unsplash.com/photo-1585241936939-8695665128e9?q=80&w=1974&auto=format&fit=crop" 
                alt="Revista Áurea" 
                className="w-full h-full object-cover rounded-[1.5rem] opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nosso Público-Alvo */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 relative z-10">
        <div className="bg-aurea-surface border border-white/5 rounded-[3rem] p-10 md:p-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-aurea-gold mb-4">Nosso Público-Alvo</h2>
            <p className="font-sans text-aurea-light/70 max-w-2xl mx-auto">
              Uma estética editorial impecável, desenhada para quem decide. Com distribuição bimestral (Digital e Física com 400 unidades), direcionamos sua marca para:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-white/5 rounded-[2rem] hover:border-aurea-gold/30 transition-colors">
              <h3 className="font-serif text-2xl text-aurea-gold mb-4">01</h3>
              <p className="font-sans text-aurea-light/90">Investidores e empresários.</p>
            </div>
            <div className="text-center p-8 border border-white/5 rounded-[2rem] hover:border-aurea-gold/30 transition-colors">
              <h3 className="font-serif text-2xl text-aurea-gold mb-4">02</h3>
              <p className="font-sans text-aurea-light/90">Profissionais liberais de alta renda e executivos.</p>
            </div>
            <div className="text-center p-8 border border-white/5 rounded-[2rem] hover:border-aurea-gold/30 transition-colors">
              <h3 className="font-serif text-2xl text-aurea-gold mb-4">03</h3>
              <p className="font-sans text-aurea-light/90">Famílias de alto padrão e formadores de opinião.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proposta de Patrocínio */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Proposta de Patrocínio e Entregas</h2>
          <p className="font-sans text-aurea-light/80 text-lg">
            Exposição estratégica com formato completo para marcas que desejam posicionamento premium, credibilidade e resultados.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-6 p-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-aurea-gold/10 text-aurea-gold flex items-center justify-center shrink-0 font-serif text-xl">R</div>
            <div>
              <h3 className="font-serif text-2xl text-aurea-gold mb-2">Revista Física</h3>
              <p className="font-sans text-aurea-light/70">Duas páginas dedicadas à sua marca. Reportagem editorial completa (história e diferenciais) + Anúncio publicitário de vitrine.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-aurea-gold/10 text-aurea-gold flex items-center justify-center shrink-0 font-serif text-xl">I</div>
            <div>
              <h3 className="font-serif text-2xl text-aurea-gold mb-2">Instagram Oficial</h3>
              <p className="font-sans text-aurea-light/70">Presença institucional no feed @aurearevista com Call-To-Action direcionado para seus canais.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-aurea-gold/10 text-aurea-gold flex items-center justify-center shrink-0 font-serif text-xl">Y</div>
            <div>
              <h3 className="font-serif text-2xl text-aurea-gold mb-2">YouTube Áurea</h3>
              <p className="font-sans text-aurea-light/70">Exposição de autoridade e fortalecimento da marca em vídeo.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6 p-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-full bg-aurea-gold/10 text-aurea-gold flex items-center justify-center shrink-0 font-serif text-xl">N</div>
            <div>
              <h3 className="font-serif text-2xl text-aurea-gold mb-2">Networking & Links</h3>
              <p className="font-sans text-aurea-light/70">Inclusão em nossa base de links (direcionamento para seu WhatsApp/Site) e conexão orgânica com nossa rede de investidores.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center bg-aurea-surface p-10 rounded-[2rem] border border-aurea-gold/30">
          <p className="font-sans text-sm tracking-widest uppercase text-aurea-light/60 mb-2">Investimento Mensal</p>
          <p className="font-serif text-5xl text-aurea-gold mb-8">R$ 7.000,00</p>
          <button className="inline-flex items-center gap-3 bg-aurea-gold text-aurea-dark px-10 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-aurea-light transition-colors">
            Quero Posicionar Minha Marca
          </button>
        </div>
      </section>
    </div>
  );
};
