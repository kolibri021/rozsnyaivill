document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a');
  const content = document.getElementById('content');
  const toggleBtn = document.getElementById('toggleMode');

  links.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');

      content.style.opacity = 0.2;

      try {
        const response = await fetch(`${page}.html`);
        if (!response.ok) throw new Error('Tartalom betöltési hiba.');
        const html = await response.text();

        setTimeout(() => {
          content.innerHTML = html;
          content.style.opacity = 1;
        }, 200);
      } catch (error) {
        content.innerHTML = `<section><h2>Hiba</h2><p>${error.message}</p></section>`;
        content.style.opacity = 1;
      }
    });
  });

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
});