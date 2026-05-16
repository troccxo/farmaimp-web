/* ============================================================================
   THEME PICKER — selector de paletas para probar combinaciones de color.
   Solo en el sitio web (no en la app). Persiste en localStorage.

   Cada preset define el set completo de variables CSS para mantener armonía.
   Cuando decidas qué paleta dejar definitiva, copiá los valores del preset
   elegido al :root de styles.css y eliminá este script de los HTML.
   ============================================================================ */

// Helper: define un preset light. Los paneles destacados usan el color de acento
// como fondo (look clásico verde sobre blanco).
function light(name, desc, p) {
  return {
    id: p.id, name, desc,
    vars: {
      '--green':       p.green,
      '--green-light': p.greenLight,
      '--green-pale':  p.greenPale,
      '--green-dark':  p.greenDark,
      '--white':       p.white,
      '--off-white':   p.offWhite,
      '--gray':        p.gray,
      '--gray-dark':   p.grayDark,
      '--text':        p.text,
      '--border':      p.border,
      // Paneles destacados = acento (verde clásico)
      '--panel-bg':           p.green,
      '--panel-bg-end':       p.greenDark,
      '--panel-text':         '#ffffff',
      '--panel-text-soft':    'rgba(255,255,255,0.85)',
      '--panel-text-mute':    'rgba(255,255,255,0.7)',
      '--panel-text-faint':   'rgba(255,255,255,0.5)',
      '--panel-border':       'rgba(255,255,255,0.15)',
      '--panel-icon-bg':      'rgba(255,255,255,0.15)',
      '--panel-cta-bg':       '#ffffff',
      '--panel-cta-color':    p.green,
      '--panel-cta-hover':    p.greenPale,
      '--panel-deep-bg':      p.greenDark,
      '--panel-deep-input-bg':     'rgba(255,255,255,0.08)',
      '--panel-deep-input-border': 'rgba(255,255,255,0.15)',
    },
  };
}

// Helper: define un preset dark. Los paneles destacados usan "surface elevada"
// (gris oscuro un poco más claro que el fondo base), NO el acento como fondo
// grande. El acento queda solo para botones, links e iconos pequeños.
function dark(name, desc, p) {
  return {
    id: p.id, name, desc,
    vars: {
      '--green':       p.accent,
      '--green-light': p.accentLight,
      '--green-pale':  p.surfaceLow,
      '--green-dark':  p.surfaceHigh,
      '--white':       p.bg,
      '--off-white':   p.surfaceLow,
      '--gray':        p.muted,
      '--gray-dark':   p.textSecondary,
      '--text':        p.text,
      '--border':      p.border,
      // Paneles destacados = surface elevada (NO acento brillante)
      '--panel-bg':           p.surfaceHigh,
      '--panel-bg-end':       p.surfaceHighest,
      '--panel-text':         p.text,
      '--panel-text-soft':    p.textSecondary,
      '--panel-text-mute':    p.muted,
      '--panel-text-faint':   p.mutedDim,
      '--panel-border':       p.border,
      '--panel-icon-bg':      p.surfaceLow,
      '--panel-cta-bg':       p.accent,
      '--panel-cta-color':    p.bg,
      '--panel-cta-hover':    p.accentLight,
      '--panel-deep-bg':      p.surfaceLow,
      '--panel-deep-input-bg':     p.surfaceHigh,
      '--panel-deep-input-border': p.border,
      // El ámbar fijo del quiosco también se atenúa en dark
      '--quiosco-accent':      p.accent,
      '--quiosco-accent-pale': p.surfaceLow,
    },
  };
}

const PRESETS = [
  light('Verde Clásico', 'Default actual', {
    id: 'verde-clasico',
    green: '#1a6b3a', greenLight: '#2d9e57', greenPale: '#e8f5ed', greenDark: '#0f4424',
    white: '#ffffff', offWhite: '#f8faf9',
    gray: '#6b7280', grayDark: '#374151',
    text: '#1a1a1a', border: '#e5e7eb',
  }),
  light('Crema Suave', 'Beige cálido, descansa la vista', {
    id: 'crema',
    green: '#1a6b3a', greenLight: '#2d9e57', greenPale: '#eaf3ec', greenDark: '#0f4424',
    white: '#faf6ef', offWhite: '#f3ede0',
    gray: '#75695a', grayDark: '#4a4337',
    text: '#2b2620', border: '#e8dfcd',
  }),
  light('Slate Sutil', 'Azul-gris muy suave', {
    id: 'slate',
    green: '#1a6b3a', greenLight: '#2d9e57', greenPale: '#dde9e2', greenDark: '#0f4424',
    white: '#f4f6f8', offWhite: '#e9edf1',
    gray: '#5d6b7a', grayDark: '#37434f',
    text: '#1c2630', border: '#d4dae0',
  }),
  light('Sepia', 'Tono papel envejecido', {
    id: 'sepia',
    green: '#5a6e2f', greenLight: '#7d9542', greenPale: '#ece4d0', greenDark: '#3d4a1f',
    white: '#f5ecd9', offWhite: '#ebe0c8',
    gray: '#7a6a52', grayDark: '#52462f',
    text: '#2e251a', border: '#dcccaf',
  }),
  light('Indigo', 'Acento violeta moderno', {
    id: 'indigo',
    green: '#4f46e5', greenLight: '#7c70f3', greenPale: '#ebe9fd', greenDark: '#312a99',
    white: '#fbfbfd', offWhite: '#f1f1f7',
    gray: '#6b7280', grayDark: '#374151',
    text: '#1a1a1a', border: '#e2e1ec',
  }),
  light('Teal', 'Verde-azulado, más oceánico', {
    id: 'teal',
    green: '#0d6e6e', greenLight: '#2ba0a0', greenPale: '#dff2f2', greenDark: '#054444',
    white: '#f7fafa', offWhite: '#ecf3f3',
    gray: '#5d7575', grayDark: '#374a4a',
    text: '#1a2424', border: '#d8e3e3',
  }),
  light('Rosé Pastel', 'Suave con acento rosa', {
    id: 'rose',
    green: '#be185d', greenLight: '#db2777', greenPale: '#fce7f0', greenDark: '#831843',
    white: '#fdf6f8', offWhite: '#f7e9ee',
    gray: '#7a6671', grayDark: '#4d3d46',
    text: '#2b1d24', border: '#ecd6dd',
  }),

  /* ───────── DARK PRESETS ─────────
     En modo oscuro, los paneles destacados (about-visual, feature highlight,
     pricing-hero, contact) usan tonos "surface elevada" oscuros en vez del
     acento brillante. Así no hay bloques verdes/ámbar fuertes que choquen
     con el fondo. */

  dark('Midnight', 'Dark mode azul profundo', {
    id: 'midnight',
    bg:            '#0d1117',  // fondo base, "--white"
    surfaceLow:    '#161b22',  // sección alterna, "--off-white"
    surfaceHigh:   '#21262d',  // panel destacado
    surfaceHighest:'#2d333b',  // fin del gradient
    accent:        '#4ade80',  // acento (botones, links, iconos)
    accentLight:   '#6ee7a0',
    text:          '#f0f6fc',  // texto principal claro
    textSecondary: '#c9d1d9',
    muted:         '#8b95a8',
    mutedDim:      '#6e7681',
    border:        '#2a313c',
  }),

  dark('Mint Dark', 'Dark mode verde menta', {
    id: 'mint-dark',
    bg:            '#0f1411',
    surfaceLow:    '#171f1a',
    surfaceHigh:   '#232b26',
    surfaceHighest:'#2e3832',
    accent:        '#34d399',
    accentLight:   '#6ee7b7',
    text:          '#e8f0eb',
    textSecondary: '#c4d0c9',
    muted:         '#8a9a92',
    mutedDim:      '#6b7872',
    border:        '#26302b',
  }),

  dark('Sunset Dark', 'Dark mode con acento ámbar', {
    id: 'sunset',
    bg:            '#1a1410',
    surfaceLow:    '#241c16',
    surfaceHigh:   '#302721',
    surfaceHighest:'#3d322a',
    accent:        '#fbbf24',
    accentLight:   '#fcd34d',
    text:          '#f5ede0',
    textSecondary: '#d4c5b3',
    muted:         '#a89684',
    mutedDim:      '#7d6e5e',
    border:        '#3a2e22',
  }),

  dark('Carbon', 'Dark gris puro, acento verde', {
    id: 'carbon',
    bg:            '#101010',
    surfaceLow:    '#191919',
    surfaceHigh:   '#252525',
    surfaceHighest:'#303030',
    accent:        '#4ade80',
    accentLight:   '#6ee7a0',
    text:          '#ededed',
    textSecondary: '#c5c5c5',
    muted:         '#909090',
    mutedDim:      '#6a6a6a',
    border:        '#2c2c2c',
  }),
];

const STORAGE_KEY = 'imp-theme-preset';

function applyPreset(preset) {
  const root = document.documentElement;
  Object.entries(preset.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  localStorage.setItem(STORAGE_KEY, preset.id);
  // Re-renderiza el panel para marcar el activo
  const active = document.querySelector('.tp-preset.active');
  if (active) active.classList.remove('active');
  const next = document.querySelector(`.tp-preset[data-id="${preset.id}"]`);
  if (next) next.classList.add('active');
}

function resetTheme() {
  const root = document.documentElement;
  Object.keys(PRESETS[0].vars).forEach(k => root.style.removeProperty(k));
  localStorage.removeItem(STORAGE_KEY);
  document.querySelectorAll('.tp-preset').forEach(el => el.classList.remove('active'));
  document.querySelector('.tp-preset[data-id="verde-clasico"]')?.classList.add('active');
}

function loadSaved() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const preset = PRESETS.find(p => p.id === saved);
  if (preset) applyPreset(preset);
}

function buildUI() {
  // Estilos del propio picker (inline para no depender de styles.css)
  const style = document.createElement('style');
  style.textContent = `
    .tp-toggle {
      position: fixed; bottom: 20px; right: 20px;
      width: 48px; height: 48px;
      border-radius: 50%;
      background: #1a1a1a; color: white;
      border: 2px solid rgba(255,255,255,0.15);
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
      z-index: 9999;
      transition: transform 0.2s;
      font-family: 'DM Sans', sans-serif;
    }
    .tp-toggle:hover { transform: scale(1.08) rotate(15deg); }

    .tp-panel {
      position: fixed; bottom: 80px; right: 20px;
      width: 320px; max-height: 70vh; overflow-y: auto;
      background: #1a1a1a;
      color: white;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 12px 50px rgba(0,0,0,0.4);
      padding: 1.2rem;
      z-index: 9998;
      display: none;
      font-family: 'DM Sans', sans-serif;
    }
    .tp-panel.open { display: block; animation: tp-slide 0.2s ease both; }
    @keyframes tp-slide {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .tp-header {
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 0.3rem;
      color: white;
    }
    .tp-sub {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.55);
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .tp-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .tp-preset {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 0.6rem 0.75rem;
      background: rgba(255,255,255,0.04);
      border: 1.5px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s;
      text-align: left;
      width: 100%;
      color: white;
      font-family: 'DM Sans', sans-serif;
    }
    .tp-preset:hover { background: rgba(255,255,255,0.08); }
    .tp-preset.active {
      border-color: #4ade80;
      background: rgba(74,222,128,0.08);
    }

    .tp-swatches {
      display: flex; gap: 4px; flex-shrink: 0;
    }
    .tp-swatch {
      width: 16px; height: 28px;
      border-radius: 4px;
      border: 1px solid rgba(255,255,255,0.15);
    }

    .tp-info { flex: 1; min-width: 0; }
    .tp-name {
      font-size: 0.85rem;
      font-weight: 500;
      color: white;
      margin-bottom: 1px;
    }
    .tp-desc {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.5);
      line-height: 1.3;
    }

    .tp-check {
      color: #4ade80;
      font-size: 0.9rem;
      opacity: 0;
      transition: opacity 0.15s;
    }
    .tp-preset.active .tp-check { opacity: 1; }

    .tp-footer {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      gap: 0.5rem;
    }
    .tp-btn {
      flex: 1;
      padding: 0.5rem;
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.78rem;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.15s;
    }
    .tp-btn:hover { background: rgba(255,255,255,0.1); color: white; }
    .tp-btn.danger:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); color: #fca5a5; }
  `;
  document.head.appendChild(style);

  // Botón flotante
  const toggle = document.createElement('button');
  toggle.className = 'tp-toggle';
  toggle.title = 'Cambiar paleta de colores';
  toggle.textContent = '🎨';
  document.body.appendChild(toggle);

  // Panel
  const panel = document.createElement('div');
  panel.className = 'tp-panel';
  panel.innerHTML = `
    <div class="tp-header">Paleta de prueba</div>
    <div class="tp-sub">Probá distintas combinaciones. Tu elección se guarda y se mantiene al navegar entre páginas.</div>
    <div class="tp-grid"></div>
    <div class="tp-footer">
      <button class="tp-btn tp-reset danger">Reset</button>
      <button class="tp-btn tp-close">Cerrar</button>
    </div>
  `;
  document.body.appendChild(panel);

  const grid = panel.querySelector('.tp-grid');
  PRESETS.forEach(preset => {
    const btn = document.createElement('button');
    btn.className = 'tp-preset';
    btn.dataset.id = preset.id;
    btn.innerHTML = `
      <div class="tp-swatches">
        <div class="tp-swatch" style="background:${preset.vars['--white']}"></div>
        <div class="tp-swatch" style="background:${preset.vars['--green']}"></div>
      </div>
      <div class="tp-info">
        <div class="tp-name">${preset.name}</div>
        <div class="tp-desc">${preset.desc}</div>
      </div>
      <div class="tp-check">✓</div>
    `;
    btn.addEventListener('click', () => applyPreset(preset));
    grid.appendChild(btn);
  });

  // Toggle abrir/cerrar
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });
  panel.querySelector('.tp-close').addEventListener('click', () => panel.classList.remove('open'));
  panel.querySelector('.tp-reset').addEventListener('click', resetTheme);

  // Click fuera cierra
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Marcar el preset actual (default = verde-clasico si no hay nada guardado)
  const current = localStorage.getItem(STORAGE_KEY) || 'verde-clasico';
  document.querySelector(`.tp-preset[data-id="${current}"]`)?.classList.add('active');
}

// Init
loadSaved();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildUI);
} else {
  buildUI();
}
