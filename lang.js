(function () {
    const STORAGE_KEY = "cham-lang";

    const i18n = {
        vi: {
            "subtitle": {
                "privacy.html": "Chính sách bảo mật",
                "terms.html": "Điều khoản sử dụng"
            },
            "updated": "Cập nhật · 02/05/2026",
            "nav-privacy": "Privacy",
            "nav-terms": "Terms"
        },
        en: {
            "subtitle": {
                "privacy.html": "Privacy Policy",
                "terms.html": "Terms of Use"
            },
            "updated": "Last updated · May 2, 2026",
            "nav-privacy": "Privacy",
            "nav-terms": "Terms"
        }
    };

    function currentPage() {
        const path = window.location.pathname.split("/").pop();
        return path === "terms.html" ? "terms.html" : "privacy.html";
    }

    function applyLang(lang) {
        const page = currentPage();
        document.documentElement.lang = lang;

        document.querySelectorAll(".lang-section").forEach((el) => {
            el.classList.toggle("active", el.dataset.lang === lang);
        });

        document.querySelectorAll(".lang-toggle button").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });

        const subtitleEl = document.querySelector('[data-i18n="subtitle"]');
        if (subtitleEl) subtitleEl.textContent = i18n[lang].subtitle[page];

        const updatedEl = document.querySelector('[data-i18n="updated"]');
        if (updatedEl) updatedEl.textContent = i18n[lang].updated;
    }

    function init() {
        const saved = localStorage.getItem(STORAGE_KEY);
        const initial = saved === "en" || saved === "vi" ? saved : "vi";
        applyLang(initial);

        document.querySelectorAll(".lang-toggle button").forEach((btn) => {
            btn.addEventListener("click", () => {
                const lang = btn.dataset.lang;
                localStorage.setItem(STORAGE_KEY, lang);
                applyLang(lang);
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
