import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Home as HomeIcon, ChevronLeft, ChevronRight, BookOpen, Settings as SettingsIcon } from 'lucide-react';

interface Property {
  id: number;
  code: string;
  title: string;
  location: string;
  price: string;
  image: string;
}

export function AdminDashboard() {
  const { token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [settings, setSettings] = useState<any>({
    magazine_old_text: '', magazine_old_link: '',
    magazine_new_text: '', magazine_new_link: '',
    featured_property_id: '', featured_video_url: ''
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProperties();
    fetchSettings();
  }, [isAuthenticated, navigate]);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      if (Array.isArray(data)) setProperties(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) setSettings({
        magazine_old_text: data.magazine_old_text || '',
        magazine_old_link: data.magazine_old_link || '',
        magazine_new_text: data.magazine_new_text || '',
        magazine_new_link: data.magazine_new_link || '',
        featured_property_id: data.featured_property_id || '',
        featured_video_url: data.featured_video_url || ''
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploading(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success && data.urls && data.urls.length > 0) {
        setSettings((prev: any) => ({...prev, [field]: data.urls[0]}));
      } else {
        alert('Erro ao fazer upload: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao tentar fazer o upload.');
    }
    setIsUploading(false);
    e.target.value = '';
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      alert('Configurações da Revista salvas com sucesso!');
    } catch (e) {
      console.error(e);
      alert('Erro ao salvar as configurações.');
    }
    setIsSavingSettings(false);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este imóvel permanentemente?")) return;
    try {
      await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProperties();
    } catch (e) {
      console.error(e);
    }
  };

  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const currentProperties = properties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent">
              Áurea Admin
            </h1>
            <p className="text-sm text-gray-400 mt-1">Gerenciamento dinâmico de portfólio</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
            >
              <HomeIcon size={18} />
              <span className="hidden sm:inline">Ver Site</span>
            </button>
            <button 
              onClick={() => navigate('/admin/novo')}
              className="flex items-center gap-2 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-black font-semibold px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Adicionar Imóvel</span>
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 border ${showSettings ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/50' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20'}`}
            >
              <SettingsIcon size={18} />
              <span className="hidden sm:inline">Configurações</span>
            </button>
            <button 
              onClick={logout}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 px-5 py-2.5 rounded-full hover:bg-red-500/20 hover:text-red-300 transition-all duration-300 border border-red-500/20"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Configurações do Site */}
        {showSettings && (
          <div className="bg-[#111111] p-6 md:p-8 rounded-2xl shadow-2xl border border-white/5 mb-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#D4AF37]">
              <SettingsIcon size={20} /> Configurações do Site
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <div className="bg-[#1a1a1a] p-5 rounded-xl border border-white/5 mb-6">
                <h3 className="text-md font-semibold mb-4 text-[#D4AF37]">Imóvel em Destaque na Home</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Selecionar Imóvel</label>
                    <select value={settings.featured_property_id} onChange={e => setSettings({...settings, featured_property_id: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]">
                      <option value="">Nenhum (Desativar Destaque)</option>
                      {properties.map(p => (
                        <option key={p.id} value={p.id}>{p.code} - {p.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Link do Vídeo (Opcional - YouTube, Vimeo, MP4)</label>
                    <div className="flex gap-2">
                      <input type="text" value={settings.featured_video_url} onChange={e => setSettings({...settings, featured_video_url: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
                      <label className={`cursor-pointer bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center whitespace-nowrap text-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isUploading ? '...' : 'Upload Vídeo'}
                        <input type="file" accept="video/mp4,video/webm" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, 'featured_video_url')} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-white/5">
                  <h3 className="text-md font-semibold mb-4 text-gray-300">Revista Nova (Ex: Edição 2)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Texto do Botão</label>
                      <input type="text" value={settings.magazine_new_text} onChange={e => setSettings({...settings, magazine_new_text: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="Ex: Revista Edição 2" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Link (URL do Google Drive, PDF, etc)</label>
                      <div className="flex gap-2">
                        <input type="text" value={settings.magazine_new_link} onChange={e => setSettings({...settings, magazine_new_link: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
                        <label className={`cursor-pointer bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center whitespace-nowrap text-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isUploading ? '...' : 'Upload PDF'}
                          <input type="file" accept=".pdf,application/pdf" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, 'magazine_new_link')} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-white/5">
                  <h3 className="text-md font-semibold mb-4 text-gray-300">Revista Antiga (Ex: Edição 1)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Texto do Botão</label>
                      <input type="text" value={settings.magazine_old_text} onChange={e => setSettings({...settings, magazine_old_text: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="Ex: Edição Anterior" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Link (URL do Google Drive, PDF, etc)</label>
                      <div className="flex gap-2">
                        <input type="text" value={settings.magazine_old_link} onChange={e => setSettings({...settings, magazine_old_link: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]" placeholder="https://..." />
                        <label className={`cursor-pointer bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center whitespace-nowrap text-sm ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {isUploading ? '...' : 'Upload PDF'}
                          <input type="file" accept=".pdf,application/pdf" className="hidden" disabled={isUploading} onChange={(e) => handleFileUpload(e, 'magazine_old_link')} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={isSavingSettings} className="bg-[#D4AF37] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#F3E5AB] transition-colors disabled:opacity-50">
                  {isSavingSettings ? 'Salvando...' : 'Salvar Configurações'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listagem */}
        <div className="bg-[#111111] rounded-2xl shadow-2xl overflow-hidden border border-white/5 flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-black/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Cód</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Imóvel</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Localização</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-400 font-mono">{prop.code}</td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        {prop.image ? (
                          <img src={prop.image} alt="Thumb" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                            <HomeIcon size={20} className="text-gray-500" />
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-100">{prop.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-400">{prop.location}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-[#D4AF37] font-semibold">{prop.price}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => navigate('/admin/editar/' + prop.id)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors" title="Editar">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(prop.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Excluir">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {properties.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <HomeIcon size={48} className="text-gray-700 mb-4" />
                        <p className="text-lg">Nenhum imóvel cadastrado ainda.</p>
                        <p className="text-sm mt-1">Clique em "Adicionar Imóvel" para começar.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Paginação */}
          {totalPages > 1 && (
            <div className="bg-black/40 border-t border-white/5 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Página <span className="font-semibold text-white">{currentPage}</span> de <span className="font-semibold text-white">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-white/10 flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-transparent text-gray-500' : 'hover:bg-white/10 bg-white/5 text-white'}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border border-white/10 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-transparent text-gray-500' : 'hover:bg-white/10 bg-white/5 text-white'}`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
