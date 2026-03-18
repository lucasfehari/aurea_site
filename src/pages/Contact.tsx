import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ArrowRight, Mail, Phone, Instagram } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = React.useState({
    nome: '',
    email: '',
    whatsapp: '',
    objetivo: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, email, whatsapp, objetivo, mensagem } = formData;
    
    // Construct the WhatsApp message
    const text = `Olá, vim pelo site Áurea.\n\n*Nome:* ${nome}\n*E-mail:* ${email}\n*WhatsApp:* ${whatsapp}\n*Objetivo:* ${objetivo}\n\n*Mensagem:*\n${mensagem}`;

    const phoneNumber = "5567991100706";
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Fale com a Diretoria */}
          <div className="bg-aurea-surface p-10 md:p-16 rounded-[3rem] border border-white/5 h-full flex flex-col">
            <h2 className="font-serif text-3xl text-aurea-gold mb-8">Fale com a Diretoria</h2>
            
            <div className="space-y-8 flex-grow">
              <div>
                <p className="font-sans text-sm tracking-widest uppercase text-aurea-light/50 mb-2">Contato Comercial Exclusivo</p>
                <p className="font-serif text-2xl text-aurea-light">Tatá Marques</p>
                <p className="font-sans text-xs text-aurea-light/40 mt-1">CRECI SC 11ª Região — 73872 F | CRECI MS 14ª Região — 17501 F</p>
              </div>

              <div className="space-y-4">
                <a href="https://wa.me/5567991100706" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-aurea-light/80 hover:text-aurea-gold transition-colors font-sans">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-aurea-gold/80 hover:text-aurea-gold">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  (67) 99110-0706
                </a>
                <a href="https://www.instagram.com/tatapovo?igsh=MWtpdXVhcjg1bm5mcw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-aurea-light/80 hover:text-aurea-gold transition-colors font-sans">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <Instagram size={16} />
                  </div>
                  @tatapovo
                </a>
              </div>
            </div>
          </div>

          {/* Formulário VIP */}
          <div className="bg-aurea-surface p-10 md:p-16 rounded-[3rem] border border-aurea-gold/20 h-full flex flex-col">
            <h2 className="font-serif text-3xl text-aurea-gold mb-8">Atendimento VIP</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 font-sans flex-grow flex flex-col justify-between">
              <div>
                <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Qual seu nome?</label>
                <input 
                  type="text" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Qual seu e-mail?</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Qual seu whatsapp?</label>
                  <input 
                    type="tel" 
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-4">Qual seu objetivo?</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="objetivo" 
                      value="Investimento" 
                      checked={formData.objetivo === 'Investimento'}
                      onChange={handleChange}
                      required
                      className="accent-aurea-gold" 
                    />
                    <span className="text-sm text-aurea-light/80">Investimento</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="objetivo" 
                      value="Patrocínio Revista" 
                      checked={formData.objetivo === 'Patrocínio Revista'}
                      onChange={handleChange}
                      required
                      className="accent-aurea-gold" 
                    />
                    <span className="text-sm text-aurea-light/80">Patrocínio Revista</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="objetivo" 
                      value="Parceria" 
                      checked={formData.objetivo === 'Parceria'}
                      onChange={handleChange}
                      required
                      className="accent-aurea-gold" 
                    />
                    <span className="text-sm text-aurea-light/80">Parceria</span>
                  </label>
                </div>
              </div>

              <div className="flex-grow">
                <label className="block text-xs tracking-widest uppercase text-aurea-light/60 mb-2">Mensagem</label>
                <textarea 
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  className="w-full h-full min-h-[120px] bg-transparent border-b border-white/20 py-3 text-aurea-light focus:outline-none focus:border-aurea-gold transition-colors resize-none"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>

              <button type="submit" className="w-full mt-8 flex items-center justify-center gap-3 bg-aurea-gold text-aurea-dark px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-aurea-light transition-colors">
                Solicitar Atendimento <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
