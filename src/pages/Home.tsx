import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import aureaGradient from '../assets/SVG/aurea-gradient.svg';
import imgtata from '../assets/img/tata.png';
import videobg from '../assets/videos/bg_hero.mp4';


export const Home = () => {
  return (
    <div className="w-full bg-aurea-dark text-aurea-light min-h-scree ">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex flex-col justify-end overflow-hidden pb-8 md:pb-12 pt-24">
        <div className="absolute inset-0 z-0">
          <video
            src={videobg}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-100 top-0"
          />
          <div className="absolute inset-0 bg-aurea-dark/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-aurea-dark via-aurea-dark/40 to-transparent"></div>
        </div>

        <BackgroundGrid />

        <div className="relative z-10 w-full px-6 md:px-12 max-w-[1600px] mx-auto flex flex-col items-center justify-center h-full text-center py-20 mt-12 md:mt-24">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center z-20 w-full"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-aurea-gold mb-6 md:mb-8 leading-tight uppercase tracking-tighter max-w-4xl mx-auto">
              Onde arquitetura e valor caminham juntos.
            </h2>
            <p className="font-sans text-aurea-light/80 text-sm md:text-base leading-relaxed mb-8 md:mb-10 text-balance uppercase tracking-wider max-w-2xl mx-auto">
              A curadoria definitiva para investidores que não buscam apenas metro quadrado, mas ativos de alta liquidez e segurança patrimonial. A conexão direta e exclusiva entre o Mato Grosso do Sul e o litoral de Santa Catarina.
            </p>
            <Link to="/portfolio" className="inline-flex items-center justify-center rounded-full border border-aurea-gold text-aurea-gold px-8 py-4 md:px-10 md:py-5 font-sans font-medium uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-aurea-gold hover:text-aurea-dark transition-all duration-500 mb-12 lg:mb-16 group">
              Explorar Portfólio Premium
              <div className="w-12 h-12 rounded-full border border-aurea-gold/30 ml-2 flex items-center justify-center backdrop-blur-md">
                <ArrowRight size={16} className="text-aurea-gold transform -rotate-45 group-hover:text-aurea-dark transition-colors" />
              </div>
            </Link>
          </motion.div>

          <div className="relative w-full flex flex-col items-center justify-center gap-12 lg:gap-16">
            {/* Massive Text */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative z-0 font-serif w-full max-w-[1000px] select-none flex justify-center items-center"
            >
              <img src={aureaGradient} alt="Aurea" className="w-full relative z-0" />
            </motion.h1>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative z-20 w-full bg-aurea-surface border border-white/5 p-6 md:p-8 md:w-[420px] shadow-2xl flex flex-col gap-6 backdrop-blur-sm text-left mx-auto"
            >
              <div className="flex items-center gap-5">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
                  alt="Tatá Marques"
                  className="w-14 h-14 md:w-16 md:h-16 object-cover grayscale rounded-full border border-aurea-gold/30 p-1"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-aurea-gold/80 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-aurea-gold rounded-full"></span>
                    Assessoria VIP
                  </p>
                  <p className="font-serif text-xl md:text-2xl text-aurea-light leading-none uppercase tracking-tighter">Fale com a Diretoria</p>
                </div>
              </div>
              <Link to="/contato" className="flex items-center justify-between group border-t border-white/10 pt-5">
                <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-aurea-light/70 group-hover:text-aurea-gold transition-colors">Agendar consultoria</span>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 text-aurea-gold flex items-center justify-center group-hover:bg-aurea-gold group-hover:text-aurea-dark transition-all duration-300">
                  <ArrowRight size={16} className="text-aurea-gold transform -rotate-45 group-hover:text-aurea-dark transition-colors" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Expert: Tatá Marques */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-md lg:max-w-xl mx-auto overflow-hidden bg-aurea-surface border border-white/5 group">
            <div className="absolute inset-0 bg-aurea-dark/20 group-hover:bg-transparent transition-all z-10 duration-700"></div>
            <img
              src={imgtata}
              alt="Tatá Marques"
              className="w-full h-full object-cover object-top grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-aurea-gold/30 z-0 hidden lg:block"></div>
            <div className="absolute top-8 right-8 z-20">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold bg-aurea-dark/90 px-4 py-1.5 backdrop-blur-md border border-aurea-gold/30">Diretoria</span>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <div className="mb-8 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-aurea-gold/50"></span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold">Assessoria VIP</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter mb-8 text-aurea-light leading-[0.9]">
              Tatá Marques
            </h2>
            <div className="w-24 h-[1px] bg-aurea-gold/30 mb-8"></div>
            <p className="font-sans text-base md:text-lg text-aurea-light/90 mb-8 uppercase tracking-widest leading-relaxed">
              A <span className="text-aurea-gold font-medium">inteligência por trás</span> das melhores alocações no mercado mais promissor do país.
            </p>
            <p className="font-sans text-[11px] md:text-xs text-aurea-light/60 mb-12 uppercase tracking-widest leading-relaxed text-balance">
              Com networking exclusivo e profundo domínio do ciclo imobiliário catarinense, mapeia as oportunidades de maior liquidez e segurança patrimonial antes mesmo de chegarem ao mercado. A conexão direta e de confiança para investidores institucionais e private.
            </p>

            <Link to="/contato" className="inline-flex items-center gap-6 group w-fit">
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-aurea-light group-hover:text-aurea-gold transition-colors">
                Agendar Reunião de Diretoria
              </span>
              <div className="w-12 h-12 rounded-full border border-aurea-gold/30 flex items-center justify-center group-hover:bg-aurea-gold transition-all duration-500 bg-white/5">
                <ArrowRight size={16} className="text-aurea-gold group-hover:text-aurea-dark transform -rotate-45 transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: O Diferencial (ABOUT Layout) */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5 relative">
        <div className="absolute top-0 right-12 w-[1px] h-32 bg-gradient-to-b from-aurea-gold/50 to-transparent"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold border border-aurea-gold/30 px-4 py-1.5 rounded-full">Nosso Diferencial</span>
            </div>
            <h2 className="font-serif text-6xl md:text-8xl lg:text-[8rem] uppercase tracking-tighter mb-12 text-aurea-light leading-none">A Ponte</h2>
            <div className="w-24 h-[1px] bg-aurea-gold/50 mb-12"></div>
            <p className="font-sans text-lg md:text-xl text-aurea-light/90 mb-16 max-w-2xl uppercase tracking-widest leading-relaxed">
              O litoral catarinense vive o ciclo imobiliário mais sólido do Brasil. A Áurea atua como uma ponte <span className="text-aurea-gold font-medium">estratégica e direta</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
              <div className="group">
                <h4 className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-aurea-gold mb-6 border-b border-white/10 pb-4 group-hover:border-aurea-gold/50 transition-colors flex items-center gap-3">
                  <span className="w-2 h-2 bg-aurea-gold opacity-50"></span>
                  De SC para MS
                </h4>
                <p className="font-sans text-[11px] md:text-xs text-aurea-light/60 leading-relaxed uppercase tracking-widest text-balance group-hover:text-aurea-light/90 transition-colors">
                  Levamos até você as oportunidades mais restritas e exclusivas de Balneário Camboriú, Itajaí, Praia Brava e Porto Belo.
                </p>
              </div>
              <div className="group">
                <h4 className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-aurea-gold mb-6 border-b border-white/10 pb-4 group-hover:border-aurea-gold/50 transition-colors flex items-center gap-3">
                  <span className="w-2 h-2 bg-aurea-gold opacity-50"></span>
                  De MS para SC
                </h4>
                <p className="font-sans text-[11px] md:text-xs text-aurea-light/60 leading-relaxed uppercase tracking-widest text-balance group-hover:text-aurea-light/90 transition-colors">
                  Conectamos investidores com liquidez a projetos que garantem valorização, diversificação patrimonial e estilo de vida inigualável.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="w-full aspect-[4/5] bg-aurea-surface overflow-hidden border border-white/5 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1950&auto=format&fit=crop"
                alt="Modern Architecture"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 border-l border-b border-aurea-gold/30 z-0 hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Section 3: Advantages Layout */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-aurea-surface/50"></div>
        <div className="flex flex-row relative z-10 w-full gap-6 md:gap-0">
          {/* Numbers */}
          <div className="flex flex-col justify-between text-aurea-light font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.8] tracking-tighter w-[35%] md:w-auto md:flex-1">
            <div className="border-b border-white/5 pb-8 lg:pb-12 text-aurea-gold">100%</div>
            <div className="border-b border-white/5 py-8 lg:py-12">+50</div>
            <div className="border-b border-white/5 py-8 lg:py-12">15</div>
            <div className="pt-8 lg:pt-12 text-aurea-gold">24/7</div>
          </div>

          {/* Vertical Text */}
          <div className="hidden md:flex items-center justify-center px-8 lg:px-24 bg-white/5 border-x border-white/5 mx-8 lg:mx-24 backdrop-blur-sm">
            <span className="font-sans text-3xl lg:text-5xl tracking-[0.3em] uppercase font-light text-aurea-gold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Exclusividade
            </span>
          </div>

          {/* Labels */}
          <div className="flex-1 flex flex-col justify-between font-sans text-[11px] sm:text-sm md:text-xl lg:text-3xl uppercase tracking-widest text-aurea-light/70 mt-4 md:mt-0">
            <div className="border-b border-white/5 pb-8 lg:pb-12 flex items-center md:items-end justify-start h-full group">
              <span className="group-hover:text-aurea-gold transition-colors flex items-center gap-4"><span className="w-8 h-[1px] bg-aurea-gold/50 hidden lg:block"></span>Ativos Selecionados</span>
            </div>
            <div className="border-b border-white/5 py-8 lg:py-12 flex items-center md:items-end justify-start h-full group">
              <span className="group-hover:text-aurea-light transition-colors flex items-center gap-4"><span className="w-8 h-[1px] bg-white/20 hidden lg:block"></span>Parceiros Estratégicos</span>
            </div>
            <div className="border-b border-white/5 py-8 lg:py-12 flex items-center md:items-end justify-start h-full group">
              <span className="group-hover:text-aurea-light transition-colors flex items-center gap-4"><span className="w-8 h-[1px] bg-white/20 hidden lg:block"></span>Anos de Experiência</span>
            </div>
            <div className="pt-8 lg:pt-12 flex items-center md:items-end justify-start h-full group">
              <span className="group-hover:text-aurea-gold transition-colors flex items-center gap-4"><span className="w-8 h-[1px] bg-aurea-gold/50 hidden lg:block"></span>Assessoria VIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Ícones do Litoral (OUR SERVICES Layout) - UPDATE TO MATCH RECENT CONTENT */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-gold border border-aurea-gold/30 px-4 py-1.5 rounded-full">O Topo da Pirâmide</span>
            </div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter text-aurea-light leading-[0.9]">
              Ícones do<br />Litoral SC
            </h2>
          </div>
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 mb-4">
            <p className="font-sans text-[10px] md:text-xs text-aurea-light/60 uppercase leading-relaxed tracking-widest text-balance border-l border-aurea-gold/30 pl-6">
              Selecionamos 4 projetos que simbolizam o ápice do mercado. Empreendimentos que deixaram de ser apenas moradias para se tornarem ativos patrimoniais de altíssimo valor, status e liquidez.
            </p>
            <Link to="/portfolio" className="inline-flex items-center gap-4 font-sans text-[10px] uppercase tracking-widest text-aurea-gold hover:text-aurea-light transition-colors lg:ml-6 mt-4">
              Ver Portfólio Completo <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Item 1 */}
          <Link to="/portfolio" className="group flex flex-col h-full bg-aurea-surface border border-white/5 hover:border-aurea-gold/30 transition-all duration-500 overflow-hidden">
            <div className="p-6 md:p-8 flex-grow">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-aurea-gold/60 mb-2 block">Balneário Camboriú</span>
              <h3 className="font-serif text-2xl lg:text-3xl uppercase tracking-tighter text-aurea-light mb-6">Yachthouse</h3>
              <div className="w-8 h-[1px] bg-aurea-gold/30 mb-6 group-hover:w-16 transition-all duration-500"></div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-aurea-light/50 leading-relaxed mb-6">
                Símbolo de status e arquitetura internacional. Assinatura Pininfarina.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light/80"><CheckCircle2 size={10} className="text-aurea-gold" /> Frente Mar na Barra Sul</span>
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light/80"><CheckCircle2 size={10} className="text-aurea-gold" /> Público Internacional</span>
              </div>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-aurea-dark/20 group-hover:bg-transparent transition-all z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
                alt="Yachthouse"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Item 2 */}
          <Link to="/portfolio" className="group flex flex-col-reverse lg:flex-col h-full bg-aurea-surface border border-white/5 hover:border-aurea-gold/30 transition-all duration-500 overflow-hidden mt-0 lg:mt-12">
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-aurea-dark/20 group-hover:bg-transparent transition-all z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1613490908574-1706b2165089?q=80&w=2070&auto=format&fit=crop"
                alt="Ená Praia do Estaleiro"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-aurea-gold/60 mb-2 block">Balneário Camboriú</span>
              <h3 className="font-serif text-2xl lg:text-3xl uppercase tracking-tighter text-aurea-light mb-6">Ená Estaleiro</h3>
              <div className="w-8 h-[1px] bg-aurea-gold/30 mb-6 group-hover:w-16 transition-all duration-500"></div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-aurea-light/50 leading-relaxed mb-6">
                Ultra exclusividade pé na areia absolunta em área totalmente preservada.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light/80"><CheckCircle2 size={10} className="text-aurea-gold" /> Mansões Suspensas</span>
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light/80"><CheckCircle2 size={10} className="text-aurea-gold" /> Apenas Poucas Unidades</span>
              </div>
            </div>
          </Link>

          {/* Item 3 */}
          <Link to="/portfolio" className="group flex flex-col h-full bg-aurea-surface border border-aurea-gold/30 relative overflow-hidden shadow-[0_0_30px_rgba(202,176,131,0.05)]">
            <div className="absolute top-4 left-4 z-20 bg-aurea-gold text-aurea-dark px-3 py-1 text-[8px] font-sans font-bold uppercase tracking-widest">A Joia da Coroa</div>
            <div className="p-6 md:p-8 flex-grow">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-aurea-gold/60 mb-2 block">Praia Brava | Itajaí</span>
              <h3 className="font-serif text-2xl lg:text-3xl uppercase tracking-tighter text-aurea-gold mb-6">Brava Home</h3>
              <div className="w-8 h-[1px] bg-aurea-light/20 mb-6 group-hover:w-16 transition-all duration-500"></div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-aurea-light/60 leading-relaxed mb-6">
                O resort residencial definitivo. Cobertura com piscina privativa e vista mar.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light"><CheckCircle2 size={10} className="text-aurea-gold" /> +60.000 m² de Lazer</span>
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light"><CheckCircle2 size={10} className="text-aurea-gold" /> Alta Valorização</span>
              </div>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
                alt="Brava Home Resort"
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Item 4 */}
          <Link to="/portfolio" className="group flex flex-col-reverse lg:flex-col h-full bg-aurea-surface border border-white/5 hover:border-aurea-gold/30 transition-all duration-500 overflow-hidden mt-0 lg:mt-12">
            <div className="aspect-[4/3] w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-aurea-dark/20 group-hover:bg-transparent transition-all z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="One Tower"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-aurea-gold/60 mb-2 block">Balneário Camboriú</span>
              <h3 className="font-serif text-2xl lg:text-3xl uppercase tracking-tighter text-aurea-light mb-6">One Tower</h3>
              <div className="w-8 h-[1px] bg-aurea-gold/30 mb-6 group-hover:w-16 transition-all duration-500"></div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-aurea-light/50 leading-relaxed mb-6">
                Imponência e magnitude urbana em 290 metros de altura no skyline ícone.
              </p>
              <div className="flex flex-col gap-2 mt-auto">
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light/80"><CheckCircle2 size={10} className="text-aurea-gold" /> Frente Mar</span>
                <span className="flex items-center gap-2 font-sans text-[9px] uppercase tracking-widest text-aurea-light/80"><CheckCircle2 size={10} className="text-aurea-gold" /> Skyline Icônico</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Section 5: Best Offers Layout */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/5">
          <div className="relative aspect-square lg:aspect-auto bg-aurea-surface overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Luxury Interior"
              className="w-full h-full object-cover grayscale opacity-60 hover:scale-105 hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aurea-dark/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-aurea-gold/30 flex items-center justify-center backdrop-blur-md">
                <ArrowRight size={16} className="text-aurea-gold transform -rotate-45" />
              </div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurea-light/80 bg-aurea-dark/50 px-4 py-2 backdrop-blur-md">
                Acesso Restrito
              </p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-8 md:p-24 flex flex-col justify-center items-start lg:-ml-12 lg:my-12 relative z-10 border border-white/10 shadow-2xl">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[7rem] uppercase tracking-tighter text-aurea-light leading-[0.9] mb-8 mt-4 md:mt-0">
              Decisão<br /><span className="text-aurea-gold">Patrimonial</span>
            </h2>
            <div className="w-16 h-[1px] bg-aurea-gold/50 mb-8"></div>
            <p className="font-sans text-sm md:text-base text-aurea-light/80 uppercase tracking-wider leading-relaxed mb-12 max-w-md">
              Acesse nosso portfólio restrito e inicie a diversificação estratégica do seu patrimônio com a nossa assessoria VIP.
            </p>
            <Link to="/portfolio" className="group flex items-center gap-6 bg-aurea-gold text-aurea-dark px-10 py-5 font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-aurea-light transition-colors">
              Explorar Ativos
              <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
