const traductions = {
    fr: {
      accueil: "Accueil",
      contact: "Contact",
      retour: "⬅ Retour",
    },
    ar: {
      accueil: "الرئيسية",
      contact: "اتصل بنا",
      retour: "⬅ رجوع",
    },
    en: {
      accueil: "Home",
      contact: "Contact",
      retour: "⬅ Back",
    }
  };
  
  function changerLangue(langue) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const cle = el.getAttribute("data-i18n");
      el.textContent = traductions[langue][cle] || el.textContent;
    });
  }
  