/* ============================================================================
   THEME PICKER — selector de paletas para probar combinaciones de color.
   Solo en el sitio web (no en la app). Persiste en localStorage.

   Cada preset define el set completo de variables CSS para mantener armonía.
   Cuando decidas qué paleta dejar definitiva, copiá los valores del preset
   elegido al :root de styles.css y eliminá este script de los HTML.
   ============================================================================ */

// Helper para mezclar un hex con alpha en formato rgba(...)
function hexA(hex, alpha) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const r = parseInt(full.slice(0,2), 16);
  const g = parseInt(full.slice(2,4), 16);
  const b = parseInt(full.slice(4,6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

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
      // Header / cards / inputs / texto sobre acento
      '--header-bg':  hexA(p.white, 0.95),
      '--card-bg':    p.white,
      '--input-bg':   p.white,
      '--on-accent':  '#ffffff',
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
      // Header semi-transparente sobre el bg base + cards = surface elevada
      '--header-bg':  hexA(p.surfaceLow, 0.92),
      '--card-bg':    p.surfaceLow,
      '--input-bg':   p.surfaceLow,
      '--on-accent':  p.bg,    // texto sobre acento brillante = bg oscuro (mejor que blanco)
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
const STORAGE_OVERRIDES = 'imp-theme-overrides';

// Vars que el usuario puede override libremente con los color pickers.
// Si el usuario elige un color de fondo personalizado, también ajustamos
// --off-white (sección alterna) a un tono levemente distinto para no perder
// el contraste entre secciones.
const CUSTOM_VARS = {
  text:    { label: 'Color de la fuente', vars: ['--text'] },
  header:  { label: 'Color del header',   vars: ['--header-bg'] },
  bg:      { label: 'Color del fondo',    vars: ['--white'] },
};

function getOverrides() {
  try { return JSON.parse(localStorage.getItem(STORAGE_OVERRIDES) || '{}'); }
  catch { return {}; }
}

function setOverrides(obj) {
  if (!obj || Object.keys(obj).length === 0) localStorage.removeItem(STORAGE_OVERRIDES);
  else localStorage.setItem(STORAGE_OVERRIDES, JSON.stringify(obj));
}

function applyPreset(preset, opts = {}) {
  const root = document.documentElement;
  Object.entries(preset.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  if (!opts.skipSave) localStorage.setItem(STORAGE_KEY, preset.id);
  // Aplica overrides custom DESPUÉS para que tengan prioridad
  applyOverrides();
  // Marcar activo en la UI
  const active = document.querySelector('.tp-preset.active');
  if (active) active.classList.remove('active');
  const next = document.querySelector(`.tp-preset[data-id="${preset.id}"]`);
  if (next) next.classList.add('active');
  // Sincronizar pickers (muestran el valor efectivo después de overrides)
  syncPickers();
}

function applyOverrides() {
  const root = document.documentElement;
  const overrides = getOverrides();
  Object.entries(overrides).forEach(([key, color]) => {
    const def = CUSTOM_VARS[key];
    if (!def || !color) return;
    def.vars.forEach(v => {
      // El header en CSS usa rgba(...). Si el usuario elige un color sólido,
      // lo aplicamos con alpha 0.95 para mantener el efecto de blur.
      if (v === '--header-bg') root.style.setProperty(v, hexA(color, 0.95));
      else root.style.setProperty(v, color);
    });
  });
}

function setOverride(key, color) {
  const overrides = getOverrides();
  if (!color) delete overrides[key];
  else overrides[key] = color;
  setOverrides(overrides);
  applyOverrides();
}

function clearOverrides() {
  setOverrides({});
  // Re-aplica el preset actual para limpiar los overrides aplicados
  const saved = localStorage.getItem(STORAGE_KEY) || 'verde-clasico';
  const preset = PRESETS.find(p => p.id === saved) || PRESETS[0];
  applyPreset(preset);
  syncPickers();
}

function resetTheme() {
  const root = document.documentElement;
  // Borra TODAS las vars (preset + overrides)
  const allKeys = new Set();
  PRESETS.forEach(p => Object.keys(p.vars).forEach(k => allKeys.add(k)));
  allKeys.forEach(k => root.style.removeProperty(k));
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_OVERRIDES);
  document.querySelectorAll('.tp-preset').forEach(el => el.classList.remove('active'));
  document.querySelector('.tp-preset[data-id="verde-clasico"]')?.classList.add('active');
  syncPickers();
}

function loadSaved() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const preset = PRESETS.find(p => p.id === saved);
    if (preset) applyPreset(preset, { skipSave: true });
  } else {
    applyOverrides();  // por si hay overrides sin preset guardado
  }
}

// Lee el valor computado de una variable CSS y lo devuelve como hex (#rrggbb)
// para que se pueda mostrar en un <input type="color">.
function readVarAsHex(varName) {
  const root = document.documentElement;
  let v = getComputedStyle(root).getPropertyValue(varName).trim();
  if (!v) return '#000000';
  // rgba(r,g,b,a) → ignoramos alpha
  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) {
    return '#' + [m[1], m[2], m[3]].map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
  }
  // Si ya es #hex, devolver tal cual (normalizado a 6 caracteres)
  if (v.startsWith('#')) {
    if (v.length === 4) return '#' + v.slice(1).split('').map(c => c+c).join('');
    return v.slice(0, 7);
  }
  return '#000000';
}

function syncPickers() {
  Object.keys(CUSTOM_VARS).forEach(key => {
    const input = document.querySelector(`.tp-picker[data-key="${key}"]`);
    if (!input) return;
    const overrides = getOverrides();
    const value = overrides[key] || readVarAsHex(CUSTOM_VARS[key].vars[0]);
    if (value && /^#[0-9a-f]{6}$/i.test(value)) input.value = value;
  });
}

function buildUI() {
  // Estilos del propio picker (inline para no depender de styles.css)
  const style = document.createElement('style');
  style.textContent = `
    .tp-toggle {
      /* Apilado por encima del botón de WhatsApp, que se queda con la
         esquina: es el que convierte. Si se mueve uno, mover el otro. */
      position: fixed; bottom: 84px; right: 22px;
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
      position: fixed; bottom: 144px; right: 22px;
      width: 320px; max-width: calc(100vw - 44px); max-height: 70vh; overflow-y: auto;
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

    .tp-section-title {
      font-size: 0.72rem;
      font-weight: 600;
      color: rgba(255,255,255,0.55);
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 1rem 0 0.5rem;
    }

    .tp-pickers {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .tp-picker-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.6rem;
      padding: 0.4rem 0.6rem;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 6px;
    }
    .tp-picker-label {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.85);
      flex: 1;
    }
    .tp-picker {
      width: 36px; height: 24px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 4px;
      cursor: pointer;
      background: transparent;
      padding: 0;
    }
    .tp-picker::-webkit-color-swatch-wrapper { padding: 0; }
    .tp-picker::-webkit-color-swatch { border: none; border-radius: 3px; }
    .tp-picker::-moz-color-swatch { border: none; border-radius: 3px; }

    .tp-footer {
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .tp-btn {
      flex: 1;
      min-width: 0;
      padding: 0.5rem;
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.85);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.75rem;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .tp-btn:hover { background: rgba(255,255,255,0.1); color: white; }
    .tp-btn.danger:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); color: #fca5a5; }
  `;
  document.head.appendChild(style);

  // Botón flotante
  const toggle = document.createElement('button');
  toggle.className = 'tp-toggle';
  toggle.title = 'Elegir colores';
  toggle.setAttribute('aria-label', 'Elegir la combinación de colores del sitio');
  toggle.textContent = '🎨';
  document.body.appendChild(toggle);

  // Panel
  const panel = document.createElement('div');
  panel.className = 'tp-panel';
  panel.innerHTML = `
    <div class="tp-header">Colores</div>
    <div class="tp-sub">Elige la combinación con la que leas más cómodo. Se guarda en este navegador y te sigue por todo el sitio.</div>

    <div class="tp-section-title">Combinaciones</div>
    <div class="tp-grid"></div>

    <div class="tp-section-title">Ajustar a tu gusto</div>
    <div class="tp-pickers"></div>

    <div class="tp-footer">
      <button class="tp-btn tp-clear-overrides">Deshacer ajustes</button>
      <button class="tp-btn tp-reset danger">Volver al original</button>
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

  // Color pickers libres
  const pickersContainer = panel.querySelector('.tp-pickers');
  Object.entries(CUSTOM_VARS).forEach(([key, def]) => {
    const row = document.createElement('div');
    row.className = 'tp-picker-row';
    row.innerHTML = `
      <span class="tp-picker-label">${def.label}</span>
      <input type="color" class="tp-picker" data-key="${key}" />
    `;
    pickersContainer.appendChild(row);
    const input = row.querySelector('.tp-picker');
    input.addEventListener('input', (e) => setOverride(key, e.target.value));
  });

  // Toggle abrir/cerrar
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) syncPickers();
  });
  panel.querySelector('.tp-close').addEventListener('click', () => panel.classList.remove('open'));
  panel.querySelector('.tp-reset').addEventListener('click', resetTheme);
  panel.querySelector('.tp-clear-overrides').addEventListener('click', clearOverrides);

  // Click fuera cierra
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  // Marcar el preset actual y sincronizar pickers
  const current = localStorage.getItem(STORAGE_KEY) || 'verde-clasico';
  document.querySelector(`.tp-preset[data-id="${current}"]`)?.classList.add('active');
  syncPickers();
}

// Init — el selector es visible para cualquier visitante, a propósito: la idea
// es que cada uno lea con los colores que le resulten más cómodos. La elección
// vive en el localStorage de SU navegador, no se comparte con nadie.
loadSaved();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildUI);
} else {
  buildUI();
}
