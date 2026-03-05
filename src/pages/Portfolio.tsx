import React from 'react';
import { motion } from 'motion/react';
import { BackgroundGrid } from '../components/SVGElements';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export const Portfolio = () => {
  return (
    <div className="w-full pt-32 pb-20 bg-aurea-dark text-aurea-light min-h-screen">
      <BackgroundGrid />

      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-24 relative z-10 pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-aurea-gold/30 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-aurea-gold"></span>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-aurea-gold">Acervo Exclusivo</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] leading-[0.9] uppercase tracking-tighter mb-8 text-aurea-light">
            Ativos Patrimoniais <br /><span className="text-aurea-gold">Premium</span>
          </h1>
          <p className="font-sans text-aurea-light/70 text-sm md:text-base max-w-2xl leading-relaxed uppercase tracking-wider">
            Uma curadoria rigorosa de imóveis para quem exige exclusividade, liquidez consistente e arquitetura atemporal no litoral catarinense.
          </p>
        </motion.div>
      </section>

      {/* Categoria: Highlight / Joia da Coroa */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-32 relative z-10">
        <PropertyCard
          title="Brava Home Resort"
          location="Praia Brava | Itajaí"
          tag="A Joia da Coroa"
          image="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop"
          summary="Cobertura duplex no Brava Home Resort, o ápice do conceito 'resort residencial'. Produto raro, pronto para morar, com piscina privativa e vista permanente para o mar em um dos condomínios mais completos da região com mais de 60 mil m² de lazer."
          specs={[
            "Cobertura Duplex",
            "360 m² Privativos",
            "4 Suítes | 4 Vagas",
            "Pronto para morar"
          ]}
          audience="Empresários e investidores patrimoniais que valorizam infraestrutura completa de resort aliada à exclusividade e segurança."
          price="R$ 17.900.000,00"
          cta="Solicitar Dossiê Confidencial"
          highlight
        />
      </section>

      {/* Categoria: Símbolos de Status & Arquitetura */}
      <CategorySection title="Ícones do Litoral Catarinense">
        <PropertyCard
          title="Yachthouse by Pininfarina"
          location="Balneário Camboriú | Barra Sul"
          image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop"
          summary="Um marco da engenharia e arquitetura de luxo no Brasil com assinatura Pininfarina. Com 294 metros de altura, é um dos edifícios residenciais mais altos da América Latina oferecendo vista panorâmica definitiva para o mar e marina."
          specs={[
            "4 Suítes | 4 Vagas",
            "Frente Mar | Barra Sul",
            "Hall privativo",
            "Assinatura Pininfarina"
          ]}
          audience="Investidores de alto patrimônio, empresários e executivos que buscam exclusividade, status patrimonial e localização premium."
          price="Valor sob consulta"
          cta="Agendar Visita"
        />
        <PropertyCard
          title="One Tower"
          location="Balneário Camboriú | Barra Sul"
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          summary="Um dos empreendimentos mais emblemáticos de BC com 290 metros de altura. Lajes amplas, dois apartamentos por andar e propostas de viver com conforto e sofisticação inigualáveis no mercado premium catarinense."
          specs={[
            "4 Suítes | 3 Vagas",
            "Frente Mar | Living Integrado",
            "Apenas 2 unidades por andar",
            "Concluído (Pronto)"
          ]}
          audience="Clientes exigentes por experiência de vida premium e compradores estratégicos com foco em patrimônio imobiliário de altíssimo nível."
          price="Valor sob consulta"
          cta="Agendar Visita"
        />
      </CategorySection>

      {/* Categoria: Ultra Exclusividade & Natureza */}
      <CategorySection title="Ultra Exclusividade & Conservação">
        <PropertyCard
          title="Ená – Praia do Estaleiro"
          location="Balneário Camboriú | Praia do Estaleiro"
          image="https://images.unsplash.com/photo-1613490908574-1706b2165089?q=80&w=2070&auto=format&fit=crop"
          summary="Raro privilégio de ser pé na areia na preservada Praia do Estaleiro. Um projeto de 'mansões suspensas' exclusivas, com vista mar permanente, ampla customização e total integração com a natureza."
          specs={[
            "356 m² Privativos",
            "4 Suítes | 4 Vagas",
            "Pé na areia absoluto",
            "Entrega: Julho/2027"
          ]}
          audience="Investidores de alto patrimônio que priorizam privacidade, exclusividade absoluta e localização natural diferenciada."
          price="R$ 21.774.400,00"
          cta="Receber Dossiê"
        />
        <PropertyCard
          title="Porto Belo Golf Resort"
          location="Porto Belo | SC"
          image="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop"
          summary="Terreno exclusivo no primeiro condomínio com campo de golfe iluminado do Brasil. A união perfeita entre segurança, alto padrão, contato com a natureza e forte valorização patrimonial."
          specs={[
            "Terreno em Condomínio",
            "543 m² privativos",
            "Campo de Golfe Iluminado",
            "Segurança 24h e Resort Lifestyle"
          ]}
          audience="Famílias e investidores que buscam segurança, planejamento urbano e a criação de um lar totalmente personalizado em um ambiente seleto."
          price="R$ 3.800.000,00"
          cta="Explorar Terreno"
        />
      </CategorySection>

      {/* Categoria: Alta Liquidez & Lançamentos Estratégicos */}
      <CategorySection title="Alta Liquidez & Novos Ciclos">
        <PropertyCard
          title="Atlantic Paradise"
          location="Itapema | Meia Praia"
          image="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop"
          summary="Apartamento de altíssimo padrão frente mar em uma região de altíssima liquidez. Ambientes totalmente mobiliados, climatizados e ampla varanda gourmet com vista panorâmica."
          specs={[
            "281 m² Privativos",
            "4 Suítes | 3 Vagas",
            "Frente Mar (Pronto)",
            "Totalmente Mobiliado"
          ]}
          audience="Investidores patrimoniais que buscam ativo sólido frente mar, pronto para uso e com grande potencial de valorização e locação premium."
          price="R$ 13.420.000,00"
          paymentCondition="40% de entrada + saldo em 48x"
          cta="Saber Mais"
        />
        <PropertyCard
          title="Namar Phacz Home"
          location="Porto Belo | Perequê"
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          summary="Lançamento com arquitetura contemporânea em um dos bairros com maior crescimento e valorização do litoral. Ambientes amplos perfeitamente integrados ao entorno natural."
          specs={[
            "2 a 4 Suítes",
            "Lançamento Alto Padrão",
            "Arquitetura Contemporânea",
            "Plantas Amplas Integradas"
          ]}
          audience="Investidores estratégicos visando ganho de capital até a entrega e diversificação de portfólio no novo eixo de expansão imobiliária."
          price="Valor sob consulta"
          cta="Acessar Tabela (Venda Exclusiva)"
        />
      </CategorySection>
    </div>
  );
};

const CategorySection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-32 relative z-10">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16">
      <h2 className="font-serif text-3xl md:text-5xl text-aurea-gold tracking-tighter uppercase leading-none">{title}</h2>
      <div className="h-[1px] flex-grow bg-aurea-gold/20 w-full md:w-auto mt-4 md:mt-0"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {children}
    </div>
  </section>
);

const PropertyCard = ({
  title, location, image, summary, specs, audience, price, paymentCondition, cta, highlight, tag
}: any) => (
  <div className={`group flex flex-col ${highlight ? 'lg:col-span-2 lg:flex-row bg-aurea-surface border border-white/5' : 'bg-aurea-surface h-full border border-white/5 flex flex-col'} relative overflow-hidden transition-all duration-500 hover:border-aurea-gold/30 hover:shadow-[0_0_40px_rgba(202,176,131,0.05)]`}>

    <div className={`overflow-hidden bg-aurea-surface relative ${highlight ? 'lg:w-[55%] aspect-square lg:aspect-auto min-h-[500px]' : 'aspect-[4/3] w-full shrink-0'}`}>
      {tag && (
        <div className="absolute top-6 left-6 z-20 bg-aurea-gold text-aurea-dark px-4 py-1.5 flex items-center gap-2 text-[10px] uppercase font-sans tracking-widest font-bold">
          <span className="w-1.5 h-1.5 bg-aurea-dark rounded-full"></span>
          {tag}
        </div>
      )}
      <div className="absolute inset-0 bg-aurea-dark/20 group-hover:bg-transparent transition-all duration-700 z-10"></div>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 group-hover:opacity-100"
        referrerPolicy="no-referrer"
      />
    </div>

    <div className={`flex flex-col p-8 md:p-12 ${highlight ? 'lg:w-[45%] justify-center' : 'flex-grow'}`}>
      <div className="mb-8">
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-aurea-gold/80 flex items-center gap-2 mb-4">
          <span className="w-6 h-[1px] bg-aurea-gold/50"></span>
          {location}
        </span>
        <h3 className={`font-serif text-aurea-light uppercase tracking-tighter leading-none ${highlight ? 'text-4xl md:text-5xl lg:text-6xl mb-6' : 'text-3xl lg:text-4xl mb-6 truncate text-wrap'}`}>
          {title}
        </h3>
        <div className="w-12 h-[1px] bg-aurea-gold/30 mb-6 group-hover:w-24 transition-all duration-500"></div>
        <p className={`font-sans text-aurea-light/70 uppercase tracking-wider leading-relaxed ${highlight ? 'text-xs lg:text-sm' : 'text-[11px] lg:text-xs'}`}>
          {summary}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-10 shrink-0">
        {specs && specs.map((spec: string, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle2 size={12} className="text-aurea-gold/70 shrink-0" />
            <span className="font-sans text-[10px] lg:text-[11px] uppercase tracking-widest text-aurea-light/90">{spec}</span>
          </div>
        ))}
      </div>

      <div className="space-y-6 mb-10 pt-8 border-t border-white/5 flex-grow">
        {audience && (
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-aurea-gold/50">Perfil Ideal</span>
            <p className="font-sans text-[10px] uppercase tracking-wider text-aurea-light/70 leading-relaxed text-balance">{audience}</p>
          </div>
        )}
        {price && (
          <div className="flex flex-col gap-1 mt-4">
            <span className="font-sans text-[10px] uppercase tracking-widest text-aurea-gold/50">Valor do Ativo</span>
            <span className="font-sans text-lg lg:text-2xl text-aurea-light tracking-wider font-light">{price}</span>
            {paymentCondition && (
              <span className="font-sans text-[9px] lg:text-[10px] uppercase tracking-widest text-aurea-light/40 mt-1">{paymentCondition}</span>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto shrink-0">
        <button className="group/btn w-full inline-flex items-center justify-between bg-white/5 border border-white/10 text-aurea-light px-6 py-5 font-sans uppercase tracking-[0.2em] text-[10px] hover:bg-aurea-gold hover:text-aurea-dark hover:border-aurea-gold transition-all duration-500">
          <span>{cta}</span>
          <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </div>
);
