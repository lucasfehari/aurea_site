import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import imgRevista from '../assets/img/LLB_6971.jpg';
import imgNews1 from '../assets/img/news_coastline_1773424069387.png';
import imgNews2 from '../assets/img/news_architecture_1773424086740.png';
import imgNews3 from '../assets/img/news_regions_1773424103735.png';

export const Magazine = () => {
  return (
    <div className="w-full pt-32 pb-20 min-h-screen">
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
              Revista Áurea: <br />
              <span className="text-aurea-gold italic">Notícias e Novidades</span>
            </h1>
            <p className="font-sans text-aurea-light/80 text-lg leading-relaxed mb-8">
              Acompanhe as principais informações, tendências e atualizações exclusivas do mercado imobiliário de alto padrão. O seu portal de inteligência para decisões seguras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contato" className="inline-flex items-center justify-center gap-3 bg-aurea-gold text-aurea-dark px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-aurea-light transition-colors">
                Entre em Contato <ArrowRight size={16} />
              </Link>
              <a href="https://drive.google.com/file/d/1UfR3jHhVZt_UoOC_ALahOFIJbwO-wjGS/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-aurea-light px-8 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                <BookOpen size={16} />
                Clique aqui para baixar
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-aurea-surface p-4">
              <img
                src={imgRevista}
                alt="Revista Áurea"
                className="w-full h-full object-cover object-top rounded-[1.5rem] opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Últimas Notícias */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl text-aurea-gold tracking-tighter uppercase leading-none">Notícias do Mercado</h2>
          <div className="h-[1px] flex-grow bg-aurea-gold/20 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "A contínua valorização do litoral catarinense",
              desc: "Os fatores consolidados que impulsionam a demanda por imóveis de luxo e a segurança do investimento a longo prazo.",
              img: imgNews1
            },
            {
              title: "Tendências em Arquitetura de Alto Padrão",
              desc: "Como o design moderno e a integração com a natureza estão redefinindo os lançamentos mais cobiçados da região.",
              img: imgNews2
            },
            {
              title: "A Ascensão de Novas Regiões e Oportunidades",
              desc: "Além de Balneário Camboriú, praias vizinhas começam a despontar como as novas apostas do mercado imobiliário premium.",
              img: imgNews3
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-aurea-surface border border-white/5 rounded-[2rem] overflow-hidden group hover:border-aurea-gold/30 transition-colors">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <span className="font-sans text-[10px] uppercase tracking-widest text-aurea-gold/80 mb-4 block">Análise de Mercado</span>
                <h3 className="font-serif text-2xl text-aurea-light mb-4">{item.title}</h3>
                <p className="font-sans text-sm text-aurea-light/70 leading-relaxed mb-6">{item.desc}</p>
                <button className="text-aurea-gold hover:text-aurea-light font-sans text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
                  Ler Matéria <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contato Final */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto text-center relative z-10 mt-16 pb-12">
        <div className="bg-aurea-surface p-10 md:p-16 rounded-[3rem] border border-aurea-gold/30">
          <h2 className="font-serif text-4xl mb-6 text-aurea-light">Sua Marca na <span className="text-aurea-gold">Revista Áurea</span></h2>
          <p className="font-sans text-aurea-light/70 mb-8 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Deseja posicionar o seu negócio ao lado dos principais ativos imobiliários do Brasil e alcançar um público seleto? Fale com a nossa equipe.
          </p>
          <Link to="/contato" className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-aurea-light px-10 py-4 rounded-full font-sans font-medium uppercase tracking-widest text-sm hover:bg-aurea-gold hover:text-aurea-dark hover:border-aurea-gold transition-all duration-300">
            Solicitar Mídia Kit
          </Link>
        </div>
      </section>
    </div>
  );
};
