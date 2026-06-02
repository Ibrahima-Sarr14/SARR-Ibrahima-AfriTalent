// ============================================
//   AFRITALENT — main.js
//   Auteur : SARR Ibrahima
//   Date : 2026
// ============================================

// ── 1. ANNÉE DYNAMIQUE DANS LE FOOTER
document.getElementById('year').textContent = new Date().getFullYear();

// ── 2. NAVBAR DYNAMIQUE AU SCROLL
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            nav.style.padding = '0.3rem 0';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.padding = '0.8rem 0';
        }
    }
});


// ── 3. DARK MODE avec localStorage
const darkBtn = document.getElementById('darkModeBtn');

// Appliquer le thème sauvegardé au chargement de la page
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (darkBtn) darkBtn.textContent = '☀️';
}

// Quand on clique sur le bouton dark mode
if (darkBtn) {
    darkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            darkBtn.textContent = '🌙';
        }
    });
}


// ── 4. BOUTON RETOUR EN HAUT
const btnTop = document.getElementById('btnTop');

window.addEventListener('scroll', () => {
    if (btnTop) {
        if (window.scrollY > 300) {
            btnTop.style.display = 'flex';
        } else {
            btnTop.style.display = 'none';
        }
    }
});

if (btnTop) {
    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── 5. COMPTEURS ANIMÉS avec IntersectionObserver
function animateCounter(el) {
    const target = +el.dataset.target;
    const step = target / (2000 / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString('fr-FR');
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            document.querySelectorAll('.counter').forEach(animateCounter);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.getElementById('statistiques') ||
                     document.getElementById('chiffres');
if (statsSection) statsObserver.observe(statsSection);

// ── 6. FILTRAGE DYNAMIQUE DES FREELANCES
const boutons = document.querySelectorAll('.btn-filtre');
const cartes = document.querySelectorAll('#grille-freelances .col-12');

boutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
        boutons.forEach(b => b.classList.remove('actif'));
        bouton.classList.add('actif');
        const categorie = bouton.dataset.categorie;
        cartes.forEach(carte => {
            if (categorie === 'tous' || carte.dataset.categorie === categorie) {
                carte.style.display = 'block';
            } else {
                carte.style.display = 'none';
            }
        });
    });
});

// ── 7. ANIMATIONS FADE-IN AU SCROLL
const fadeElements = document.querySelectorAll('section');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
});

// ── 8. VALIDATION FORMULAIRE CONTACT
const formulaire = document.getElementById('formulaire-contact');

if (formulaire) {
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        let valide = true;

        // Récupérer les champs
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');
        const sujet = document.getElementById('sujet');
        const message = document.getElementById('message');

        // Reset erreurs
        document.querySelectorAll('.msg-erreur').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.form-control, .form-select').forEach(el => {
            el.style.borderColor = '';
        });

        // Vérifier nom
        if (nom.value.trim() === '') {
            document.getElementById('erreur-nom').textContent = '⚠️ Le nom est obligatoire';
            nom.style.borderColor = 'red';
            valide = false;
        } else {
            nom.style.borderColor = 'green';
        }

        // Vérifier prénom
        if (prenom.value.trim() === '') {
            document.getElementById('erreur-prenom').textContent = '⚠️ Le prénom est obligatoire';
            prenom.style.borderColor = 'red';
            valide = false;
        } else {
            prenom.style.borderColor = 'green';
        }

        // Vérifier email avec regex
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value)) {
            document.getElementById('erreur-email').textContent = '⚠️ Email invalide (ex: nom@email.com)';
            email.style.borderColor = 'red';
            valide = false;
        } else {
            email.style.borderColor = 'green';
        }

        // Vérifier sujet
        if (sujet.value === '') {
            document.getElementById('erreur-sujet').textContent = '⚠️ Veuillez choisir un sujet';
            sujet.style.borderColor = 'red';
            valide = false;
        } else {
            sujet.style.borderColor = 'green';
        }

        // Vérifier message minimum 20 caractères
        if (message.value.trim().length < 20) {
            document.getElementById('erreur-message').textContent = '⚠️ Message trop court (minimum 20 caractères)';
            message.style.borderColor = 'red';
            valide = false;
        } else {
            message.style.borderColor = 'green';
        }

        // Si tout est valide — afficher succès
        if (valide) {
            formulaire.reset();
            document.querySelectorAll('.form-control, .form-select').forEach(el => {
                el.style.borderColor = '';
            });
            const succes = document.getElementById('msg-succes');
            succes.style.display = 'block';
            setTimeout(() => {
                succes.style.display = 'none';
            }, 5000);
        }
    });
}