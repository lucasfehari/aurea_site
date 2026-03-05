import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { SVGElements } from './SVGElements';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoAurea from '../assets/SVG/SVG/logo_aurea.svg';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre a Áurea', path: '/sobre' },
    { name: 'Curadoria de Ativos', path: '/portfolio' },
    { name: 'Revista & Mídia', path: '/revista' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-aurea-gold selection:text-aurea-dark">
      <SVGElements />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-aurea-light px-6 py-8 md:px-12 flex justify-between items-center">
        <Link to="/" className="font-serif text-2xl tracking-widest uppercase"><img className='w-24 h-24' src={logoAurea} alt="" /></Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-sans tracking-widest uppercase hover:text-aurea-gold transition-colors ${location.pathname === link.path ? 'text-aurea-gold' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 text-aurea-light" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-aurea-dark flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-serif text-3xl text-aurea-light hover:text-aurea-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-aurea-surface pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
          <div className="md:col-span-2">
            <Link to="/" className="font-serif text-2xl tracking-widest uppercase"><img className='w-24 h-24' src={logoAurea} alt="" /></Link>
            <p className="font-sans text-sm tracking-widest uppercase text-aurea-light/60 mb-6">Imóveis, Patrimônio & Visão</p>
            <p className="font-sans text-aurea-light/80 max-w-md leading-relaxed">
              A ponte definitiva entre grandes negócios no Mato Grosso do Sul e em Santa Catarina.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6">Diretoria</h3>
            <ul className="space-y-4 font-sans text-sm text-aurea-light/80">
              <li>
                <strong className="block text-aurea-light">Guilherme Pilger</strong>
                Corretor de Imóveis Especialista
              </li>
              <li>
                <strong className="block text-aurea-light">Tatá Marques</strong>
                Comercial<br />
                <span className="text-xs opacity-60">CRECI SC 11ª Reg. 73872 F<br />CRECI MS 14ª Reg. 17501 F</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-6">Conexões</h3>
            <ul className="space-y-3 font-sans text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-aurea-light/80 hover:text-aurea-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-aurea-gold hover:text-aurea-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-aurea-gold hover:text-aurea-gold transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-aurea-light/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Áurea. Todos os direitos reservados.</p>
          <p>Design by Agent Designer Pro</p>
        </div>
      </footer>
    </div>
  );
};
