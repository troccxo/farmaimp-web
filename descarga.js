// Botón "Descargar aplicación" de las landings de vertical.
//
// Dos comportamientos, según lo que declare el HTML:
//
//   · Descarga habilitada (hoy Mantención y Quiosco): busca el release más
//     reciente que traiga el .exe del vertical y el botón lo baja directamente.
//   · Descarga bloqueada (hoy Farma): el botón no descarga nada, abre un
//     aviso que invita a pedir acceso.
//
// REGLA: nunca se manda al visitante al repositorio de GitHub. Si la API falla
// o el instalador no está en el último release, se muestra el mismo aviso. El
// único link a github.com que puede existir es el del .exe en sí.
//
// Uso en el HTML:
//   <a data-descarga="mantencion-imp-" data-descarga-nombre="Mantención IMP">Descargar aplicación</a>
//   <p class="hero-descarga" data-descarga-info>Windows</p>
//
// Agregando `data-descarga-bloqueada` queda deshabilitado:
//   <a data-descarga="farma-imp-" data-descarga-bloqueada data-descarga-nombre="Farma IMP">…</a>
//
// El prefijo es el del .exe de cada vertical:
//   farma-imp-  ·  imp-quiosco-  ·  mantencion-imp-

const DESCARGA_REPO = 'troccxo/farma-imp-releases';

// ─── Aviso ───────────────────────────────────────────────────────────────────

function mostrarAvisoDescarga(nombre) {
  const previo = document.querySelector('.descarga-modal');
  if (previo) previo.remove();

  const modal = document.createElement('div');
  modal.className = 'descarga-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="descarga-modal-fondo" data-cerrar></div>
    <div class="descarga-modal-caja">
      <div class="descarga-modal-icono">🛠️</div>
      <h3>Descarga en mantenimiento</h3>
      <p>La descarga directa de <strong>${nombre}</strong> está temporalmente deshabilitada
      mientras preparamos la próxima versión.</p>
      <p>Escríbenos y te damos acceso de inmediato, con la instalación acompañada.</p>
      <div class="descarga-modal-btns">
        <a href="#register" class="btn-primary" data-cerrar>Solicitar acceso</a>
        <button type="button" class="btn-secondary" data-cerrar>Cerrar</button>
      </div>
    </div>`;

  const cerrar = () => {
    modal.remove();
    document.removeEventListener('keydown', alPresionar);
  };
  const alPresionar = (e) => { if (e.key === 'Escape') cerrar(); };

  modal.querySelectorAll('[data-cerrar]').forEach(el => el.addEventListener('click', cerrar));
  document.addEventListener('keydown', alPresionar);
  document.body.appendChild(modal);
  modal.querySelector('.btn-primary')?.focus();
}

// ─── Resolución del botón ────────────────────────────────────────────────────

async function resolverDescarga() {
  const boton = document.querySelector('[data-descarga]');
  if (!boton) return;

  const prefijo = boton.dataset.descarga;
  const nombre = boton.dataset.descargaNombre || 'la aplicación';
  const info = document.querySelector('[data-descarga-info]');

  // Deja el botón en modo "aviso". Es el estado por defecto y también al que se
  // vuelve si algo falla, para que nunca quede apuntando a ninguna otra parte.
  const bloquear = (texto) => {
    boton.removeAttribute('href');
    boton.classList.add('btn-no-disponible');
    if (info) info.textContent = texto;
  };

  boton.addEventListener('click', (e) => {
    if (boton.classList.contains('btn-no-disponible')) {
      e.preventDefault();
      mostrarAvisoDescarga(nombre);
    }
  });

  if ('descargaBloqueada' in boton.dataset) {
    bloquear('Descarga temporalmente no disponible');
    return;
  }

  bloquear('Windows · buscando la última versión…');

  try {
    // Cada vertical publica por su cuenta (hay releases sólo de quiosco o sólo
    // de mantención), así que no sirve /releases/latest: se recorre la lista,
    // que viene de la más nueva a la más vieja, y se toma el primer release
    // que traiga el .exe de este vertical.
    const res = await fetch(`https://api.github.com/repos/${DESCARGA_REPO}/releases?per_page=50`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);

    let release = null;
    let asset = null;
    for (const r of await res.json()) {
      if (r.draft || r.prerelease) continue;
      asset = (r.assets || []).find(a => a.name.startsWith(prefijo) && a.name.endsWith('.exe'));
      if (asset) { release = r; break; }
    }
    if (!asset) throw new Error(`ningún release reciente trae ${prefijo}*.exe`);

    // Sin atributo `download`: es cross-origin y el navegador lo ignora.
    // GitHub sirve el .exe con Content-Disposition: attachment, así que baja igual.
    boton.href = asset.browser_download_url;
    boton.classList.remove('btn-no-disponible');

    if (info) {
      const mb = Math.round(asset.size / (1024 * 1024));
      const fecha = new Date(release.published_at)
        .toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
      // El tag se ha escrito como v2.6.0 y como V2.6.0; se acepta cualquiera.
      info.textContent = `Versión ${release.tag_name.replace(/^v/i, '')} · Windows · ${mb} MB · ${fecha}`;
    }
  } catch {
    // Sin instalador o sin API: se queda en modo aviso. No se ofrece ninguna
    // ruta alternativa a GitHub a propósito.
    bloquear('Descarga temporalmente no disponible');
  }
}

document.addEventListener('DOMContentLoaded', resolverDescarga);
