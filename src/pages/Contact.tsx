import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ArrowRight, Mail, Phone, Instagram } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="w-full pt-32 pb-20">
      <BackgroundGrid />
      
      <section className="px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
            Decisões Sólidas Exigem <br/>
            <span className="text-aurea-gold italic">Assessoria Especializada.</span>
          </h1>
          <p className="font-sans text-aurea-light/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Seja para adquirir seu próximo ativo de luxo no litoral catarinense ou para posicionar sua marca na Revista Áurea, nossa diretoria está à disposição para um atendimento confidencial, técnico e direcionado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Fale com a Diretoria */}
          <div className="bg-aurea-surface p-10 md:p-16 rounded-[3rem] border border-white/5">
            <h2 className="font-serif text-3xl text-aurea-gold mb-8">Fale com a Diretoria</h2>
            
            <div className="space-y-8">
              <div>
                <p className="font-sans text-sm tracking-widest uppercase text-aurea-light/50 mb-2">Contato Comercial Exclusivo</p>
                <p className="font-serif text-2xl text-aurea-light">Tatá Marques</p>
                <p className="font-sans text-xs text-aurea-light/40 mt-1">CRECI SC 11ª Região — 73872 F | CRECI MS 14ª Região — 17501 F</p>
              </div>

              <div className="space-y-4">
                <a href="#" className="flex items-center gap-4 text-aurea-light/80 hover:text-aurea-gold transition-colors font-sans">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  (67) 99110-0706
                </a>
                <a href="#" className="flex items-center gap-4 text-aurea-light/80 hover:text-aurea-gold transition-colors font-sans">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <Instagram size={16} />
                  </div>
                  @aurearevista
                </a>
              </div>
            </div>
          </div>

          {/* Formulário VIP */}
          <div className="bg-aurea-surface p-10 md:p-16 rounded-[3rem] border border-aurea-gold/20">
            <h2 className="font-serif text-3xl text-aurea-gold mb-8">Atendimento VIP</h2>
            
            <form className="space-y-6 font-sans">
              <div>
                <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Telefone / WhatsApp</label>
                  <input 
                    type="tel" 
                    className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-4">Assunto</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="assunto" className="accent-aurea-gold" />
                    <span className="text-sm text-aurea-light/80">Investimento/Compra</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="assunto" className="accent-aurea-gold" />
                    <span className="text-sm text-aurea-light/80">Patrocínio Revista</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="assunto" className="accent-aurea-gold" />
                    <span className="text-sm text-aurea-light/80">Outros</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Mensagem (Opcional)</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors resize-none"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button type="button" className="w-full mt-8 flex items-center justify-center gap-3 bg-aurea-gold text-aurea-dark px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-aurea-light transition-colors">
                Solicitar Atendimento <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
