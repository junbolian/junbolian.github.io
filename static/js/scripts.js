
const config_file = 'config.yml'
const section_names = ['home', 'research', 'publications', 'projects', 'awards', 'news', 'service']

function getContentDir(lang) {
    return lang === 'cn' ? 'contents/cn/' : 'contents/';
}

function detectLanguage() {
    // 1. Check localStorage
    const saved = localStorage.getItem('site-lang');
    if (saved) return saved;
    // 2. Check browser language
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (browserLang.startsWith('zh')) return 'cn';
    // 3. Default English
    return 'en';
}

function loadContent(lang) {
    const content_dir = getContentDir(lang);

    // Load markdown sections
    marked.use({ mangle: false, headerIds: false });
    section_names.forEach((name) => {
        fetch(content_dir + name + '.md')
            .then(response => {
                if (!response.ok) {
                    // Fallback to English if CN file not found
                    return fetch('contents/' + name + '.md').then(r => r.text());
                }
                return response.text();
            })
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            })
            .then(() => {
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    });
}

function setActiveLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    localStorage.setItem('site-lang', lang);
}

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Load YAML config
    fetch('contents/' + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString());
                }
            });
        })
        .catch(error => console.log(error));

    // Language toggle
    const currentLang = detectLanguage();
    setActiveLang(currentLang);
    loadContent(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setActiveLang(lang);
            loadContent(lang);
        });
    });

});
