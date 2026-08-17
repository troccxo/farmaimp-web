// Botón de descarga que siempre apunta al último release publicado.
//
// Los instaladores viven en el repo PÚBLICO troccxo/farma-imp-releases. El
// código de la app (farma-comparador2) es privado y no se toca desde acá.
//
// NO hay que hacer nada extra al publicar una versión: el flujo de siempre
// —crear el release con tag vX.Y.Z y adjuntar los 3 .exe— ya alcanza. Esta
// página lee el release más reciente y arma el link sola.
//
// Uso en el HTML:
//   <a class="btn-primary" data-descarga="mantencion-imp-">Descargar</a>
//   <span data-descarga-info></span>
//
// El prefijo es el del .exe de cada vertical:
//   farma-imp-        →  farma-imp-2.6.0.exe
//   imp-quiosco-      →  imp-quiosco-2.6.0.exe
//   mantencion-imp-   →  mantencion-imp-2.6.0.exe

const DESCARGA_REPO = 'troccxo/farma-imp-releases';
const DESCARGA_PAGINA = `https://github.com/${DESCARGA_REPO}/releases/latest`;

async function resolverDescarga() {
  const boton = document.querySelector('[data-descarga]');
  if (!boton) return;

  const prefijo = boton.dataset.descarga;
  const info = document.querySelector('[data-descarga-info]');

  // Fallback desde el arranque: si la API de GitHub falla, o el visitante agotó
  // su cuota anónima (60 llamadas por hora por IP), el botón igual lleva a la
  // página de releases y la descarga sigue siendo posible a mano.
  boton.href = DESCARGA_PAGINA;

  try {
    const res = await fetch(`https://api.github.com/repos/${DESCARGA_REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);

    const release = await res.json();
    const asset = (release.assets || [])
      .find(a => a.name.startsWith(prefijo) && a.name.endsWith('.exe'));

    // No todos los releases traen los tres instaladores. Si este vertical no
    // salió en el último release, se esconde el botón en vez de mandar al
    // visitante a una página donde su .exe no está. Vuelve a aparecer solo
    // cuando se publique un release que sí lo incluya.
    if (!asset) {
      boton.hidden = true;
      if (info) info.hidden = true;
      return;
    }

    boton.href = asset.browser_download_url;

    if (info) {
      const mb = Math.round(asset.size / (1024 * 1024));
      const fecha = new Date(release.published_at)
        .toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
      // El tag se ha escrito como v2.6.0 y como V2.6.0; se acepta cualquiera.
      info.textContent = `Versión ${release.tag_name.replace(/^v/i, '')} · Windows · ${mb} MB · ${fecha}`;
    }
  } catch {
    // Falló la red o la API (por ejemplo, cuota anónima agotada). Acá no se
    // puede saber si el instalador existe, así que el botón se deja con el
    // fallback a la página de releases en vez de esconderlo.
    if (info) info.textContent = 'Windows · ver todas las versiones en GitHub';
  }
}

document.addEventListener('DOMContentLoaded', resolverDescarga);
