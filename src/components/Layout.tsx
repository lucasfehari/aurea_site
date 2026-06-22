import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SVGElements } from './SVGElements';
import { Menu, X, Instagram, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoAurea from '../assets/SVG/SVG/logo_aurea.svg';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showMagazinePopup, setShowMagazinePopup] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenMagazinePopup');
    if (!hasSeenPopup && location.pathname !== '/revista') {
      const timer = setTimeout(() => setShowMagazinePopup(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const closePopup = () => {
    setShowMagazinePopup(false);
    sessionStorage.setItem('hasSeenMagazinePopup', 'true');
  };

  const goToMagazine = () => {
    closePopup();
    navigate('/revista');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre a Áurea', path: '/sobre' },
    { name: 'Curadoria de Ativos', path: '/portfolio' },
    { name: 'Revista Áurea', path: '/revista' },
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

      {/* Magazine Popup */}
      <AnimatePresence>
        {showMagazinePopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[60] bg-aurea-dark border border-aurea-gold/30 p-8 shadow-2xl max-w-sm text-center backdrop-blur-sm bg-opacity-95"
          >
            <button onClick={closePopup} className="absolute top-4 right-4 text-aurea-light/50 hover:text-aurea-gold transition-colors">
              <X size={20} />
            </button>
            <h3 className="font-serif text-2xl text-aurea-gold mb-3 tracking-wide">Áurea Revista</h3>
            <p className="font-sans text-sm text-aurea-light/80 mb-8 leading-relaxed">
              Quer acessar a revista nova que temos na seção?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={closePopup}
                className="px-6 py-3 font-sans text-xs tracking-widest uppercase border border-white/20 hover:border-white/50 text-aurea-light transition-all"
              >
                Agora não
              </button>
              <button
                onClick={goToMagazine}
                className="px-6 py-3 font-sans text-xs tracking-widest uppercase bg-aurea-gold text-aurea-dark hover:bg-aurea-light transition-all"
              >
                Acessar
              </button>
            </div>
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
                <strong className="block text-aurea-light">Aurea Real State</strong>
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
              <a href="https://www.instagram.com/aurearevista" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-aurea-gold hover:text-aurea-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/5567991010303" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-aurea-gold hover:text-aurea-gold transition-all">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-aurea-gold hover:text-aurea-gold transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-aurea-light/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Aurea Real State. Todos os direitos reservados.</p>

        </div>
      </footer>
    </div>
  );
};
