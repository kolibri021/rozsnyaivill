document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a, a[data-page]');
  const content = document.getElementById('content');
  const toggleBtn = document.getElementById('toggleMode');

  // 🔹 Itt adhatod meg, mely oldalak legyenek karbantartás alatt
  const maintenancePages = ["szolgaltatas1", "arak"]; 
  const maintenanceMessage = `
    <section style="text-align:center; padding:50px;">
      <h2>⚙ Karbantartás alatt</h2>
      <p>Kérjük, látogass vissza később.</p>
    </section>
  `;

  // Menü és egyéb linkek kezelése
  links.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      const target = link.getAttribute('data-target'); // 🔹 Új: opcionális cél ID

      if (!page) return; // ha nincs megadva oldal, nem csinál semmit

      // Ha a lap karbantartás alatt van, csak az üzenetet jelenítse meg
      if (maintenancePages.includes(page)) {
        content.innerHTML = maintenanceMessage;
        content.style.opacity = 1;
        return;
      }

      content.style.opacity = 0.2;

      try {
        const response = await fetch(`${page}.html`);
        if (!response.ok) throw new Error('Tartalom betöltési hiba.');
        const html = await response.text();

        setTimeout(() => {
          content.innerHTML = html;
          content.style.opacity = 1;

          // 🔹 Ha van target, oda görgetünk
          if (target) {
            const scrollTarget = document.getElementById(target);
            if (scrollTarget) {
              scrollTarget.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 200);
      } catch (error) {
        content.innerHTML = `<section><h2>Hiba</h2><p>${error.message}</p></section>`;
        content.style.opacity = 1;
      }
    });
  });

  // Sötét mód váltó
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  // 🔽 Kezdőlap automatikus betöltése
  fetch('kezdolap.html')
    .then(response => {
      if (!response.ok) throw new Error('A kezdőlap betöltése nem sikerült.');
      return response.text();
    })
    .then(html => {
      content.innerHTML = html;
      content.style.opacity = 1;
    })
    .catch(error => {
      content.innerHTML = `<section><h2>Hiba</h2><p>${error.message}</p></section>`;
      content.style.opacity = 1;
    });
});
