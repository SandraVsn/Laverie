// Animation page avec ajout classe Reveal-visible au scroll
const visibilityRatio = 0.1;

// Création de l'objet option de l'API Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: visibilityRatio,
};

// Callback executée dès que l'élément est visible
const isVisible = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > visibilityRatio) {
      entry.target.classList.add("reveal-visible");
      observer.unobserve(entry.target);
    }
  });
};

// Nouvel IntersectionObserver
const observer = new IntersectionObserver(isVisible, observerOptions);

// Elément à observer
document.querySelectorAll("[class*=reveal-]").forEach((reveal) => {
  observer.observe(reveal);
});

// API adresse
document.querySelector("#adresse").addEventListener("input", (event) => {
  console.log(event.target.value);
  let url = `https://api-adresse.data.gouv.fr/search/?q=${event.target.value.replace(
    / /g,
    "+"
  )}&limit=5`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((datas) => {
      let affichage = `<datalist id="listeAdresses">`;
      for (let data of datas.features) {
        affichage += `<option value="${data.properties.label}">`;
      }
      affichage += "</datalist>";
      document.querySelector("#adresses").innerHTML = affichage;
    })
    .catch((err) => {
      console.log("erreur : " + err);
    });
});
