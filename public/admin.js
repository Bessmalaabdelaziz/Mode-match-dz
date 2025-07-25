// === Charger les tenues depuis localStorage ===
let tenues = JSON.parse(localStorage.getItem("tenues")) || [];

function chargerTenues() {
    const tenues = JSON.parse(localStorage.getItem("tenues") || "[]");
    const liste = document.getElementById("liste-tenues");
    liste.innerHTML = "";
  
    tenues.forEach((tenue, index) => {
      const div = document.createElement("div");
      div.className = "tenue-card";
      div.innerHTML = `
        <img src="${tenue.image}" alt="${tenue.nom}">
        <p><strong>${tenue.nom}</strong><br><em>${tenue.genre} - ${tenue.style}</em></p>
        <button onclick="modifierTenue(${index})">✏️ Modifier</button>
        <button onclick="supprimerTenue(${index})">🗑️ Supprimer</button>
      `;
      liste.appendChild(div);
    });
  }
  
  // === Ajouter une nouvelle tenue ===
  function ajouterTenue() {
    const genre = document.getElementById("genre-select").value;
    const style = document.getElementById("style-select").value;
    const nom = document.getElementById("nom-tenue").value.trim();
    const imageInput = document.getElementById("image-tenue");
  
    if (!genre || !style || !nom || !imageInput.files.length) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const tenue = {
        nom: nom,
        style: style,
        genre: genre, // 👈 C'EST ICI qu'on stocke le genre
        image: e.target.result
      };
  
      const anciennesTenues = JSON.parse(localStorage.getItem("tenues")) || [];
      anciennesTenues.push(tenue);
      localStorage.setItem("tenues", JSON.stringify(anciennesTenues));
  
      document.getElementById("message-success").innerText = "Tenue ajoutée avec succès !";
  
      // Réinitialisation
      document.getElementById("nom-tenue").value = "";
      document.getElementById("image-tenue").value = "";
      document.getElementById("style-select").value = "";
      document.getElementById("genre-select").value = "";
      document.getElementById("nom-fichier").innerText = "";
    };
  
    reader.readAsDataURL(imageInput.files[0]);
  }
  
  
  
  
  // === Supprimer une tenue ===
  function supprimerTenue(index) {
    const tenues = JSON.parse(localStorage.getItem("tenues") || "[]");
    if (confirm("Supprimer cette tenue ?")) {
      tenues.splice(index, 1);
      localStorage.setItem("tenues", JSON.stringify(tenues));
      chargerTenues();
    }
  }
  
  // === Modifier une tenue ===
  function modifierTenue(index) {
    const tenues = JSON.parse(localStorage.getItem("tenues") || "[]");
    const tenue = tenues[index];
  
    document.getElementById("genre-select").value = tenue.genre;
    document.getElementById("style-select").value = tenue.style;
    document.getElementById("nom-tenue").value = tenue.nom;
  
    const form = document.getElementById("ajout-tenue-form");
    form.onsubmit = function (e) {
      e.preventDefault();
  
      const genre = document.getElementById("genre-select").value;
      const style = document.getElementById("style-select").value;
      const nom = document.getElementById("nom-tenue").value;
      const imageInput = document.getElementById("image-tenue");
  
      const updateAndSave = (imageData) => {
        tenue.genre = genre;
        tenue.style = style;
        tenue.nom = nom;
        if (imageData) tenue.image = imageData;
  
        tenues[index] = tenue;
        localStorage.setItem("tenues", JSON.stringify(tenues));
        chargerTenues();
        form.reset();
        form.onsubmit = (event) => {
          event.preventDefault();
          ajouterTenue();
        };
      };
  
      if (imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          updateAndSave(e.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        updateAndSave(); // pas de nouvelle image
      }
    };
  }
  
  // === Vérifier mot de passe ===
  function verifierMotDePasse() {
    const pass = document.getElementById("admin-password").value;
    if (pass === "mode123") {
      window.location.href = "admin.html"; // Redirige vers admin après login
    } else {
      alert("Mot de passe incorrect");
    }
  }
  
  // === Aller vers page principale ===
  function allerVersMain() {
    window.location.href = "main.html#mainSite";
  }
  
  // === Charger dès que la page est prête ===
  window.addEventListener("DOMContentLoaded", () => {
    chargerTenues();
    const form = document.getElementById("ajout-tenue-form");
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        ajouterTenue();
      };
    }
  });
  function afficherTenuesAdmin() {
    const liste = document.getElementById("liste-tenues");
    liste.innerHTML = "";
  
    const tenues = JSON.parse(localStorage.getItem("tenues") || "[]");
  
    tenues.forEach((t, index) => {
      const item = document.createElement("div");
      item.className = "tenue-admin-card";
  
      item.innerHTML = `
        <img src="${t.image}" alt="${t.nom}" class="admin-image">
        <p><strong>${t.nom}</strong> - ${t.genre} / ${t.style}</p>
        <button class="delete-btn" onclick="supprimerTenueAdmin(${index})">🗑️ Supprimer</button>
      `;
      liste.appendChild(item);
      
    });
  }
  function supprimerTenueAdmin(index) {
    const tenues = JSON.parse(localStorage.getItem("tenues") || "[]");
    tenues.splice(index, 1);
    localStorage.setItem("tenues", JSON.stringify(tenues));
    afficherTenuesAdmin(); // Mise à jour après suppression
  }
 // Quand l'admin clique sur "Enregistrer les contacts"
function enregistrerContact() {
    const numero = document.getElementById("contactNumero").value;
    const email = document.getElementById("contactEmail").value;
  
    const contact = { numero, email };
  
    localStorage.setItem("contactAdmin", JSON.stringify(contact));
    alert("Contact enregistré !");
  }
  const form = document.getElementById("formulaireTenue");
form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const res = await fetch("http://localhost:3000/tenues", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  alert(data.message);
  form.reset();
});
