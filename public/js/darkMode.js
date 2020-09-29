/*
 * C'est un bref tuto sur le dark mode juste histoire de vous dépanner
 * Biensur si vous voulez quelque chose de plus complet il va falloir y passer plus de temps ;)
 */

// Ici on récupère la balise main grace à son id 'main'
// <main> est dans le partial 'head' et </main> est dans le partial 'end'
const main = document.getElementById('main')
// Ici on définit que darkStorage est la récupération du storage 'dark'
const darkStorage = localStorage.getItem('dark')

// Cette function permet d'activer ou désactiver le dark mode
function activedDarkMode () {
    // si le darkmode n'est pas actif alors il créé un item dans le localStorage
    if (!darkStorage) localStorage.setItem('dark', true)
    // sinon il le supprime
    else localStorage.removeItem('dark')
    // Et on recharge la page
    location.reload();
}

// si l'item dans le localStorage est présent alors il ajoute la class dark-mode sur notre balise 'main'
if (darkStorage) main.classList.add('dark-mode')