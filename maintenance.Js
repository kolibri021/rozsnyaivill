// Oldalak listája, amik karbantartás alatt vannak
const maintenancePages = [
    "index.html",
    "arak.html"
];

// Karbantartási HTML fájl neve
const maintenanceFile = "karbantartas.html";

// Aktuális oldal fájlneve
const currentPage = window.location.pathname.split("/").pop();

// Ha az aktuális oldal a listában van, betöltjük a karbantartási tartalmat
if (maintenancePages.includes(currentPage)) {
    document.addEventListener("DOMContentLoaded", function() {
        fetch(maintenanceFile)
            .then(response => response.text())
            .then(data => {
                document.body.innerHTML = data;
            })
            .catch(err => {
                console.error("Nem sikerült betölteni a karbantartás oldalt:", err);
            });
    });
}
