
const config_file = 'config.yml'
const section_names = ['home', 'research', 'publications', 'projects', 'awards', 'news', 'service', 'beyond']

// Gallery image data
const galleryData = {
    cook: [
        '275459d76a2e109ba809240ab814d3b5.jpg',
        '27f758759a5776c33fa8367616c9d8e8.jpg',
        '2886a081e21297f0d3a82c61fa9b02eb.jpg',
        '28c5ac4c5a88b0723c1d8501ddbdd5ff.jpg',
        '31c74a11a0a2b486111785083d0aecca.jpg',
        '3b5bbdb5af2fa0dc2a59d729f112f679.jpg',
        '5956eccd9a92de6c2280e7cdb8aed6f0.jpg',
        '5a281e65f45a3c16b570ddd34250791b.jpg',
        '66d35ea19a5bfe37c83174cc8db59c21.jpg',
        '6bc978dde12e0e9810869012c6c73831.jpg',
        '70457eadd7590879f51097d956b44b7d.jpg',
        '76ff3f5b4627b145c49844e163f3a400.jpg',
        'a3691fa48a78a7b39ff587c3388fabb2.jpg',
        'b9c8c3d3d98a1cd0d1a0e059f7ed6891.jpg',
        'c81bb8648c696873d75f5612ad89c5ba.jpg',
        'cbcb3573ba5aea1a18e40d9f0426edf0.jpg',
        'dc12c5d8652a2fbde160ed2c42e23bab.jpg',
        'fc654290b4356a763ffc0a3936151786.jpg',
        '000796d4bb79706e2a0c253bc663b571.jpg',
        '47aaf957d98b7bfed19fc3d21944b3a1.jpg',
        '53886b2f0f80e5eea1dcba9207e9c05d.jpg',
        '67d534db42d84e4a48592b3f5974eafc.jpg',
        '7896754ac3138ed6b3a9ee9bbce1e8e1.jpg',
        'd54980503d37168c49e748aa80fe7fa3.jpg'
    ],
    travel: [
        '19f7bdd2165cadf1b511006cf7801a53.jpg',
        '3d18e1d9f68d7d27da74ab419b7e6ffd.jpg',
        '52e67621cd2b84a420c44b8470eff846.jpg',
        '6c987b3072b915e02ac15a5d0417b8a2.jpg',
        '6f76390a33d526f0799790dade572d18.jpg',
        '74876a2e17940bf255e05773dd374f4e.jpg',
        '814e54e3dac00244217087622cc78a2f.jpg',
        '8d799e207039e6564797efce525defe2.jpg',
        'a1689996fb22c18cf0a6a31d82225e11.jpg',
        'b7767f70528b862b7a9c3fa706e171a5.jpg',
        'bafaf2bcd96fbec0cde12699ab020d6f.jpg',
        'ff2c33399c7659eb647feb785c954190.jpg'
    ],
    talkshow: [
        '720ffbfd7493ebd6edfd5bd2128ebdd7.jpg',
        '91601661a0d926409369fe9f146fe0c9.jpg',
        '9aa4ad58ed34e18edfc462cce7715f50.jpg',
        'b4a19d7f13dc837bb2d4fc4909cfd728.jpg'
    ],
    pet: [
        '4a33e8bf20d4001d2696cb77e4eb6a2c.jpg',
        '4e809a57dee9586c19e6910e03b882b8.jpg',
        'e7fa75bf26fd2917cb6a66fd8af15fb1.jpg',
        'parrot1.jpg',
        'parrot2.jpg',
        'parrot3.jpg'
    ],
    CAO: [
        'dc74b7656d33661564ab1fd28ba72baa.jpg',
        'e42916ddb0898fc9bd101730fd8a0b76.jpg'
    ]
};

// Gallery category descriptions (EN / CN)
const galleryDescriptions = {
    cook: {
        en: 'National Intermediate Chinese Cook — can prepare over 100 Chinese dishes.',
        cn: '国家中级中式烹调师——擅长烹饪上百种中式菜肴。'
    },
    travel: {
        en: 'Visited the USA, Japan, Singapore, UK, Malaysia, Indonesia, and more.',
        cn: '足迹遍布美国、日本、新加坡、英国、马来西亚、印度尼西亚等地。'
    },
    talkshow: {
        en: 'Enjoys performing stand-up comedy, with a talent for humor and storytelling.',
        cn: '幽默风趣，喜欢讲脱口秀，经常登台表演。'
    },
    pet: {
        en: 'Cat "Dr." (博士) & Parrot "Niuniu" (妞妞) — Niuniu inspired the invention of the <a href="https://github.com/junbolian/PO">Parrot Optimizer (PO)</a>, recognized as an <em>ESI Hot Paper</em> (top 0.1%).',
        cn: '猫咪"博士" & 鹦鹉"妞妞" — 受妞妞启发发明了<a href="https://github.com/junbolian/PO">鹦鹉优化器（PO）</a>，论文被评为 <em>ESI 热点论文</em>（千分之一）。'
    },
    CAO: {
        en: 'Chief Analytics Officer (CAO) at Wenzhou Buyi Pharmacy, a national TOP-100 pharmaceutical retail enterprise.',
        cn: '温州市布衣大药房（全国百强药品零售企业）首席分析官。'
    }
};

let currentCategory = 'cook';
let currentImageIndex = 0;
let currentImages = [];

function getContentDir(lang) {
    return lang === 'cn' ? 'contents/cn/' : 'contents/';
}

function detectLanguage() {
    const saved = localStorage.getItem('site-lang');
    if (saved) return saved;
    const browserLang = navigator.language || navigator.userLanguage || '';
    if (browserLang.startsWith('zh')) return 'cn';
    return 'en';
}

function loadContent(lang) {
    const content_dir = getContentDir(lang);

    marked.use({ mangle: false, headerIds: false });
    section_names.forEach((name) => {
        fetch(content_dir + name + '.md')
            .then(response => {
                if (!response.ok) {
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

    // Update gallery tab i18n
    document.querySelectorAll('[data-i18n-en]').forEach(el => {
        el.textContent = lang === 'cn' ? el.dataset.i18nCn : el.dataset.i18nEn;
    });
}

function setActiveLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    localStorage.setItem('site-lang', lang);
}

// Gallery functions
function renderGallery(category) {
    currentCategory = category;
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const images = galleryData[category] || [];
    currentImages = images.map(img => 'static/assets/img/gallery/' + category + '/' + img);

    // Render description
    const descEl = document.getElementById('galleryDesc');
    if (descEl) {
        const lang = localStorage.getItem('site-lang') || 'en';
        const desc = galleryDescriptions[category];
        const text = desc ? (lang === 'cn' ? desc.cn : desc.en) : '';
        descEl.innerHTML = text;
        descEl.style.display = text ? 'block' : 'none';
    }

    grid.innerHTML = '';
    images.forEach((img, idx) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = (idx * 0.05) + 's';
        item.innerHTML = '<img src="static/assets/img/gallery/' + category + '/' + img + '" alt="" loading="lazy" />';
        item.addEventListener('click', () => openLightbox(idx));
        grid.appendChild(item);
    });

    // Update active tab
    document.querySelectorAll('.gallery-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.category === category);
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = currentImages[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentImageIndex = (currentImageIndex + direction + currentImages.length) % currentImages.length;
    document.getElementById('lightboxImg').src = currentImages[currentImageIndex];
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

    // Gallery tabs
    document.querySelectorAll('.gallery-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            renderGallery(tab.dataset.category);
        });
    });

    // Initial gallery render
    renderGallery('cook');

    // Lightbox controls
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
    document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeLightbox();
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

});
