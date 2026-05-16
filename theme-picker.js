/* ============================================================================
   THEME PICKER — selector de paletas para probar combinaciones de color.
   Solo en el sitio web (no en la app). Persiste en localStorage.

   Cada preset define el set completo de variables CSS para mantener armonía.
   Cuando decidas qué paleta dejar definitiva, copiá los valores del preset
   elegido al :root de styles.css y eliminá este script de los HTML.
   ============================================================================ */

const PRESETS = [
  {
    id: 'verde-clasico',
    name: 'Verde Clásico',
    desc: 'Default actual',
    vars: {
      '--green':       '#1a6b3a',
      '--green-light': '#2d9e57',
      '--green-pale':  '#e8f5ed',
      '--green-dark':  '#0f4424',
      '--white':       '#ffffff',
      '--off-white':   '#f8faf9',
      '--gray':        '#6b7280',
      '--gray-dark':   '#374151',
      '--text':        '#1a1a1a',
      '--border':      '#e5e7eb',
    },
  },
  {
    id: 'crema',
    name: 'Crema Suave',
    desc: 'Beige cálido, descansa la vista',
    vars: {
      '--green':       '#1a6b3a',
      '--green-light': '#2d9e57',
      '--green-pale':  '#eaf3ec',
      '--green-dark':  '#0f4424',
      '--white':       '#faf6ef',
      '--off-white':   '#f3ede0',
      '--gray':        '#75695a',
      '--gray-dark':   '#4a4337',
      '--text':        '#2b2620',
      '--border':      '#e8dfcd',
    },
  },
  {
    id: 'slate',
    name: 'Slate Sutil',
    desc: 'Azul-gris muy suave',
    vars: {
      '--green':       '#1a6b3a',
      '--green-light': '#2d9e57',
      '--green-pale':  '#dde9e2',
      '--green-dark':  '#0f4424',
      '--white':       '#f4f6f8',
      '--off-white':   '#e9edf1',
      '--gray':        '#5d6b7a',
      '--gray-dark':   '#37434f',
      '--text':        '#1c2630',
      '--border':      '#d4dae0',
    },
  },
  {
    id: 'sepia',
    name: 'Sepia',
    desc: 'Tono papel envejecido',
    vars: {
      '--green':       '#5a6e2f',
      '--green-light': '#7d9542',
      '--green-pale':  '#ece4d0',
      '--green-dark':  '#3d4a1f',
      '--white':       '#f5ecd9',
      '--off-white':   '#ebe0c8',
      '--gray':        '#7a6a52',
      '--gray-dark':   '#52462f',
      '--text':        '#2e251a',
      '--border':      '#dcccaf',
    },
  },
  {
    id: 'indigo',
    name: 'Indigo',
    desc: 'Acento violeta moderno',
    vars: {
      '--green':       '#4f46e5',
      '--green-light': '#7c70f3',
      '--green-pale':  '#ebe9fd',
      '--green-dark':  '#312a99',
      '--white':       '#fbfbfd',
      '--off-white':   '#f1f1f7',
      '--gray':        '#6b7280',
      '--gray-dark':   '#374151',
      '--text':        '#1a1a1a',
      '--border':      '#e2e1ec',
    },
  },
  {
    id: 'teal',
    name: 'Teal',
    desc: 'Verde-azulado, más oceánico',
    vars: {
      '--green':       '#0d6e6e',
      '--green-light': '#2ba0a0',
      '--green-pale':  '#dff2f2',
      '--green-dark':  '#054444',
      '--white':       '#f7fafa',
      '--off-white':   '#ecf3f3',
      '--gray':        '#5d7575',
      '--gray-dark':   '#374a4a',
      '--text':        '#1a2424',
      '--border':      '#d8e3e3',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    desc: 'Dark mode azul profundo',
    vars: {
      '--green':       '#4ade80',
      '--green-light': '#6ee7a0',
      '--green-pale':  '#1f3027',
      '--green-dark':  '#22c55e',
      '--white':       '#0d1117',
      '--off-white':   '#161b22',
      '--gray':        '#8b95a8',
      '--gray-dark':   '#c9d1d9',
      '--text':        '#f0f6fc',
      '--border':      '#2a313c',
    },
  },
  {
    id: 'mint-dark',
    name: 'Mint Dark',
    desc: 'Dark mode verde menta',
    vars: {
      '--green':       '#34d399',
      '--green-light': '#6ee7b7',
      '--green-pale':  '#1a2e26',
      '--green-dark':  '#10b981',
      '--white':       '#0f1411',
      '--off-white':   '#171f1a',
      '--gray':        '#8a9a92',
      '--gray-dark':   '#c4d0c9',
      '--text':        '#e8f0eb',
      '--border':      '#26302b',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Dark',
    desc: 'Dark mode con acento ámbar',
    vars: {
      '--green':       '#fbbf24',
      '--green-light': '#fcd34d',
      '--green-pale':  '#332617',
      '--green-dark':  '#d97706',
      '--white':       '#1a1410',
      '--off-white':   '#241c16',
      '--gray':        '#a89684',
      '--gray-dark':   '#d4c5b3',
      '--text':        '#f5ede0',
      '--border':      '#3a2e22',
    },
  },
  {
    id: 'rose',
    name: 'Rosé Pastel',
    desc: 'Suave con acento rosa',
    vars: {
      '--green':       '#be185d',
      '--green-light': '#db2777',
      '--green-pale':  '#fce7f0',
      '--green-dark':  '#831843',
      '--white':       '#fdf6f8',
      '--off-white':   '#f7e9ee',
      '--gray':        '#7a6671',
      '--gray-dark':   '#4d3d46',
      '--text':        '#2b1d24',
      '--border':      '#ecd6dd',
    },
  },
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
