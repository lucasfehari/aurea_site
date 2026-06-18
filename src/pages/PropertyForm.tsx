import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Upload, X } from 'lucide-react';

export function PropertyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    location: '',
    price: '',
    summary: '',
    cta: 'Fale com a gente',
    category: 'exclusive',
    specs: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      fetch('/api/properties')
        .then(res => res.json())
        .then(data => {
          const prop = data.find((p: any) => p.id == id);
          if (prop) {
            const specsStr = Array.isArray(prop.specs) ? prop.specs.join(', ') : (typeof prop.specs === 'string' ? JSON.parse(prop.specs || '[]').join(', ') : '');
            setFormData({
              code: prop.code || '',
              title: prop.title || '',
              location: prop.location || '',
              price: prop.price || '',
              summary: prop.summary || '',
              cta: prop.cta || 'Fale com a gente',
              category: prop.category || 'exclusive',
              specs: specsStr
            });
            setExistingImages(prop.images || (prop.image ? [prop.image] : []));
          }
          setFetching(false);
        })
        .catch(err => {
          console.error(err);
          setFetching(false);
        });
    }
  }, [id, isAuthenticated, navigate]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/10');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10');
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/10');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImages(Array.from(e.dataTransfer.files));
      setExistingImages([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setExistingImages([]); // Ao adicionar novas imagens, deleta as antigas por simplicidade
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls: string[] = [...existingImages];

      if (images.length > 0) {
        const uploadData = new FormData();
        images.forEach((img) => uploadData.append('images[]', img));

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadData
        });
        const uploadResult = await uploadRes.json();
        if (uploadResult.success) {
          imageUrls = uploadResult.urls;
        } else {
          alert('Erro ao fazer upload das imagens: ' + uploadResult.error);
          setLoading(false);
          return;
        }
      }

      const specsArray = formData.specs.split(',').map(s => s.trim()).filter(Boolean);
      
      const payload = {
        ...formData,
        specs: specsArray,
        images: imageUrls
      };

      const url = id ? `/api/properties/${id}` : '/api/properties';
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        navigate('/admin');
      } else {
        const errorData = await res.json();
        alert('Erro ao salvar: ' + errorData.error);
      }
    } catch (err) {
      alert('Erro de conexão ao tentar salvar o imóvel.');
      console.error(err);
    }
    setLoading(false);
  };

  if (fetching) {
    return <div className="min-h-screen bg-[#0a0a0a] text-white p-12 flex items-center justify-center font-serif text-2xl uppercase tracking-widest">Carregando Dados...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#111111] p-8 md:p-10 rounded-2xl shadow-2xl border border-white/5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
        
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] bg-clip-text text-transparent">
          Adicionar Novo Imóvel
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Código</label>
              <input type="text" required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Ex: REF1024" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Categoria</label>
              <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Ex: exclusive, lancamento" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Título Breve</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Ex: Sobrado Alto Padrão no Damha" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Localização Completa</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Ex: Damha III, Campo Grande - MS" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Preço</label>
            <input type="text" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Ex: R$ 2.500.000 ou Consulte" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Especificações (Separadas por vírgula)</label>
            <input type="text" value={formData.specs} onChange={e => setFormData({...formData, specs: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all" placeholder="Ex: 3 Suítes, 2 Vagas, 400m²" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Descrição / Resumo</label>
            <textarea rows={4} required value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none" placeholder="Detalhes do imóvel..." />
          </div>

          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-400 mb-3">Imagens do Imóvel</label>
            <div className="flex items-center justify-center w-full">
              <label 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D4AF37]/30 rounded-xl cursor-pointer bg-gradient-to-b from-[#1a1a1a] to-transparent hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                  <Upload className="w-8 h-8 mb-3 text-[#D4AF37]" />
                  <p className="text-sm text-gray-400"><span className="font-semibold text-[#D4AF37]">Clique para fazer upload</span> ou arraste e solte</p>
                </div>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            
            {(images.length > 0 || existingImages.length > 0) && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {existingImages.map((url, index) => (
                  <div key={`exist-${index}`} className="relative group rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img src={url} alt="Preview" className="w-full h-28 object-cover transform group-hover:scale-105 transition-transform duration-300 opacity-60" />
                    <div className="absolute top-1 left-1 bg-black/50 text-[10px] px-2 py-1 rounded">Atual</div>
                  </div>
                ))}
                {images.map((file, index) => (
                  <div key={`new-${index}`} className="relative group rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-lg">
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-28 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-1 left-1 bg-[#D4AF37] text-black font-bold text-[10px] px-2 py-1 rounded">Nova</div>
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-md text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-xl">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-8 mt-8 border-t border-white/10">
            <button type="button" onClick={() => navigate('/admin')} className="px-6 py-3 rounded-full text-sm font-semibold text-gray-300 hover:bg-white/5 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="px-8 py-3 rounded-full text-sm font-bold text-black bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:hover:shadow-none transition-all">
              {loading ? 'Salvando aguarde...' : 'Salvar Imóvel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
