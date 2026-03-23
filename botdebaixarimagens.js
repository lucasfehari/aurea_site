/**
 * ============================================================
 *  ROBÔ BAIXADOR DE IMAGENS - Imóveis (Console do Navegador)
 *
 *  MODO 1 — rsFullscreenIcn + fancybox/f-carousel
 *  MODO 2 — Bootstrap carousel (admin/tmp/...), sem modal
 *
 *  Uso: Cole no Console do DevTools (F12) na página do imóvel.
 * ============================================================
 */

(async function roboDownloadImagens() {

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    // ══════════════════════════════════════════════════════════
    // BLOCO 1 — Identificação do imóvel
    // ══════════════════════════════════════════════════════════
    function getInfo() {
        let ref = 'imovel';
        let nome = '';

        // ── REFERÊNCIA ──────────────────────────────────────────
        // Prioridade 1: <abbr data-original-title="referência 2.283"> (Modo 1)
        const abbr = document.querySelector('h1 abbr[data-original-title], abbr[data-original-title*="refer"]');
        if (abbr) {
            const raw = (
                abbr.getAttribute('data-original-title').match(/[\d.]+/) ||
                abbr.textContent.match(/[\d.]+/) ||
                ['']
            )[0];
            ref = raw.replace(/\./g, '');
        }

        // Prioridade 2: URL — padrões comuns
        if (ref === 'imovel') {
            const urlPatterns = [
                /\/imovel[s]?\/(\d+)/i,
                /\/(\d{4,7})[/-]/,
                /[?&]id=(\d+)/i,
                /\/(\d{4,7})$/,
            ];
            for (const p of urlPatterns) {
                const m = window.location.href.match(p);
                if (m) { ref = m[1]; break; }
            }
        }

        // Prioridade 3: número longo visível na página
        if (ref === 'imovel') {
            const m = document.body.innerText.match(/\b(\d{5,7})\b/);
            if (m) ref = m[1];
        }

        // ── NOME ────────────────────────────────────────────────
        function limparNome(txt) {
            return txt
                .replace(/\s*(à venda|aluguel|locação|venda)\s*/gi, '')
                .replace(/[^a-zA-ZÀ-ÿ0-9 ]/g, '')
                .trim()
                .replace(/\s+/g, '_')
                .substring(0, 50);
        }

        // Prioridade 1: <h1 a> (Modo 1 — site com abbr)
        const h1Link = document.querySelector('h1 a');
        if (h1Link && h1Link.textContent.trim()) {
            nome = limparNome(
                h1Link.textContent.trim()
                    .replace(/^(apartamento|casa|imóvel|imovel|cobertura|studio|flat|terreno|lote)\s+(no|na|em|de|do|da)\s+/i, '')
            );
        }

        // Prioridade 2: <h5> dentro de .listing-title-bar (Modo 2)
        // Pega APENAS os nós de texto direto do h5, ignorando <span> filhos (ex: "À Venda")
        if (!nome) {
            const h5 = document.querySelector(
                '.listing-title-bar h5, .detail-wrapper-body h5, .listing-title h5'
            );
            if (h5) {
                const textoH5 = [...h5.childNodes]
                    .filter(n => n.nodeType === Node.TEXT_NODE)
                    .map(n => n.textContent.trim())
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                if (textoH5) nome = limparNome(textoH5);
            }
        }

        // Prioridade 3: <h1> direto sem link
        if (!nome) {
            const h1 = document.querySelector('h1');
            if (h1) nome = limparNome(h1.textContent.trim().split(/[-–|]/)[0].trim());
        }

        // Prioridade 4: <title> da página
        if (!nome) {
            nome = limparNome(document.title.split(/[-–|]/)[0].trim()).substring(0, 40);
        }

        return { ref, nome };
    }

    const { ref: REF, nome: NOME } = getInfo();
    const PREFIXO = `ref${REF}${NOME ? '_' + NOME : ''}`;
    console.log(`%c[ROBÔ] Referência: #${REF} | Nome: ${NOME || '(não encontrado)'}`, 'color: cyan; font-weight: bold');
    console.log(`%c[ROBÔ] Prefixo dos arquivos: ${PREFIXO}`, 'color: cyan');

    // ══════════════════════════════════════════════════════════
    // BLOCO 2 — Download de imagem por URL (compartilhado)
    // ══════════════════════════════════════════════════════════
    async function downloadPorURL(src, index) {
        if (!src || src.startsWith('data:') || src.trim() === '') {
            console.warn(`[ROBÔ] URL inválida para foto ${index}`);
            return false;
        }

        const urlAbs = src.startsWith('http')
            ? src
            : window.location.origin + '/' + src.replace(/^\//, '');

        try {
            const resp = await fetch(urlAbs, { credentials: 'include' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const ext = blob.type.includes('png') ? 'png' : blob.type.includes('webp') ? 'webp' : 'jpg';
            const fileName = `${PREFIXO}_foto${String(index).padStart(2, '0')}.${ext}`;

            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);

            console.log(`%c[ROBÔ] ✅ ${fileName}`, 'color: lime');
            return true;
        } catch (err) {
            console.error(`[ROBÔ] ❌ Erro foto ${index} (${urlAbs}):`, err.message);
            return false;
        }
    }

    // ══════════════════════════════════════════════════════════
    // BLOCO 3 — MODO 1: rsFullscreenIcn + fancybox/f-carousel
    // ══════════════════════════════════════════════════════════
    async function roboModo1() {
        console.log('%c[ROBÔ] ▶ Modo 1: rsFullscreenIcn + fancybox', 'color: magenta; font-weight:bold');

        const btnFull = document.querySelector('.rsFullscreenIcn, [aria-label="ampliar fotos..."]');
        if (btnFull) {
            btnFull.click();
            console.log('[ROBÔ] Clicou em: Ampliar fotos');
            await sleep(1500);
        } else {
            console.warn('[ROBÔ] Botão fullscreen não encontrado, tentando continuar...');
            await sleep(500);
        }

        function getTotalSlides() {
            const paginador = document.querySelector('.f-counter, .fancybox__counter, .rsCurrentSlide, [class*="counter"]');
            if (paginador) {
                const m = paginador.textContent.match(/\d+\s*[\/de]+\s*(\d+)/i);
                if (m) return parseInt(m[1]);
            }
            const slides = document.querySelectorAll('.f-carousel__slide, .fancybox__slide, .rsSlide');
            return slides.length > 0 ? slides.length : 60;
        }

        function getSrcAtual() {
            const sels = [
                '.f-carousel__slide.is-selected img',
                '.f-carousel__slide[aria-hidden="false"] img',
                '.fancybox__slide.is-selected img',
                '.fancybox__slide[aria-hidden="false"] img',
                '.rsActiveSlide img',
                '.rsMainSlideImage',
            ];
            for (const s of sels) {
                const el = document.querySelector(s);
                if (el) return el.dataset.src || el.dataset.lazySrc || el.currentSrc || el.src;
            }
            const imgs = [...document.querySelectorAll('img')]
                .filter(i => { const r = i.getBoundingClientRect(); return r.width > 300 && r.height > 200; })
                .sort((a, b) => b.naturalWidth - a.naturalWidth);
            return imgs[0] ? (imgs[0].currentSrc || imgs[0].src) : null;
        }

        const total = getTotalSlides();
        console.log(`%c[ROBÔ] Total de slides: ${total}`, 'color: yellow');

        let index = 1, semAvanco = 0;
        const vistos = new Set();

        while (index <= total) {
            console.log(`[ROBÔ] Foto ${index}/${total}...`);
            const src = getSrcAtual();

            if (src && !vistos.has(src)) {
                vistos.add(src);
                await downloadPorURL(src, index);
                await sleep(500);
            } else if (vistos.has(src)) {
                console.log('%c[ROBÔ] Imagem repetida — fim do carrossel.', 'color: orange');
                break;
            }

            const nextSels = [
                'button[data-carousel-go-next]', '.f-button.is-next',
                '.fancybox__button--next', '.rsArrowRight',
                '[aria-label="Next"]', '[title="Next"]',
            ];
            let avancou = false;
            for (const s of nextSels) {
                const btn = document.querySelector(s);
                if (btn && !btn.disabled) { btn.click(); avancou = true; break; }
            }

            if (!avancou) {
                semAvanco++;
                if (semAvanco >= 3) { console.log('%c[ROBÔ] Sem avanço. Encerrando Modo 1.', 'color: orange'); break; }
            } else {
                semAvanco = 0;
            }

            await sleep(900);
            index++;
        }

        return index - 1;
    }

    // ══════════════════════════════════════════════════════════
    // BLOCO 4 — MODO 2: Bootstrap carousel — coleta direta do DOM
    //
    // ESTRATÉGIA: Todos os src já estão no HTML (slides ocultos
    // pelo CSS). Coleta tudo de uma vez, faz fetch e baixa.
    // Sem abrir modal, sem navegar pelo carrossel.
    // ══════════════════════════════════════════════════════════
    async function roboModo2() {
        console.log('%c[ROBÔ] ▶ Modo 2: Bootstrap carousel — coleta direta do DOM', 'color: magenta; font-weight:bold');

        const todosSlides = [
            ...document.querySelectorAll(
                '#carouselExampleIndicators .carousel-item img, ' +
                '.carousel-inner .carousel-item img'
            )
        ];

        if (todosSlides.length === 0) {
            console.warn('[ROBÔ] Nenhum slide encontrado no carrossel.');
            return 0;
        }

        // Extrai srcs únicos mantendo ordem do HTML
        const srcs = [...new Set(
            todosSlides
                .map(img => img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-lazy'))
                .filter(Boolean)
        )];

        console.log(`%c[ROBÔ] ${srcs.length} imagem(ns) encontrada(s) no DOM`, 'color: yellow');
        srcs.forEach((s, i) => console.log(`  [${i + 1}] ${s}`));

        let downloaded = 0;
        for (let i = 0; i < srcs.length; i++) {
            const ok = await downloadPorURL(srcs[i], i + 1);
            if (ok) downloaded++;
            await sleep(400);
        }

        return downloaded;
    }

    // ══════════════════════════════════════════════════════════
    // BLOCO 5 — Detecção automática do modo
    // ══════════════════════════════════════════════════════════
    function detectarModo() {
        // Modo 2: carrossel Bootstrap com .carousel-item
        if (
            document.querySelector('#carouselExampleIndicators .carousel-item img') ||
            document.querySelector('.carousel-inner .carousel-item img')
        ) return 2;

        // Modo 1: RoyalSlider / fancybox
        if (
            document.querySelector('.rsFullscreenIcn') ||
            document.querySelector('[aria-label="ampliar fotos..."]') ||
            document.querySelector('.rsSlide') ||
            document.querySelector('.f-carousel__slide')
        ) return 1;

        console.warn('[ROBÔ] Tipo de carrossel não identificado, usando Modo 1 como padrão.');
        return 1;
    }

    const modo = detectarModo();
    console.log(`%c[ROBÔ] Modo detectado: ${modo}`, 'color: yellow; font-size: 13px; font-weight: bold');

    const totalBaixadas = modo === 2 ? await roboModo2() : await roboModo1();

    console.log(
        `%c[ROBÔ] ✅ Concluído! ${totalBaixadas} foto(s) baixadas — Modo ${modo} — ref #${REF}`,
        'color: lime; font-size: 14px; font-weight: bold'
    );
    console.log(
        `%c[ROBÔ] Arquivos: ${PREFIXO}_foto01.jpg ... ${PREFIXO}_foto${String(totalBaixadas).padStart(2, '0')}.jpg`,
        'color: yellow'
    );

})();