document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const toggleBtn = document.getElementById('toggleMode');

  // 🔧 Karbantartási lista
  const maintenancePages = ["szolgaltatas1", "arak"];
  const maintenanceMessage = `
    <section style="text-align:center; padding:50px;">
      <h2>⚙ Karbantartás alatt</h2>
      <p>Kérjük, látogass vissza később.</p>
    </section>
  `;

  // Oldalbetöltő segédfüggvény
  function loadPage(page, afterLoad) {
    if (!page) return;

    if (maintenancePages.includes(page)) {
      content.innerHTML = maintenanceMessage;
      content.style.opacity = 1;
      return;
    }

    content.style.opacity = 0.2;

    fetch(`${page}.html`)
      .then(r => {
        if (!r.ok) throw new Error('Tartalom betöltési hiba.');
        return r.text();
      })
      .then(html => {
        content.innerHTML = html;
        content.style.opacity = 1;

        // Ha meg van adva utólagos teendő (pl. görgetés), futtassuk
        if (typeof afterLoad === 'function') {
          afterLoad();
        }
      })
      .catch(err => {
        content.innerHTML = `<section><h2>Hiba</h2><p>${err.message}</p></section>`;
        content.style.opacity = 1;
      });
  }

  // 🔸 Delegált kattintáskezelés MINDEN olyan linkre, amin van data-page
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-page]');
    if (!link) return;

    e.preventDefault();

    const page = link.getAttribute('data-page');   // pl. "szolgaltatas"
    const target = link.getAttribute('data-target'); // pl. "ajanlatkeres" (opcionális)

    loadPage(page, () => {
      if (target) {
        const scrollTarget = document.getElementById(target);
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 🌙/☀️ sötét mód váltó — null-védelem
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
  }

  // 🏠 Kezdőlap automatikus betöltése
  loadPage('kezdolap');
});
