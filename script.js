//On récupère les élements du DOM pour pouvoir les utiliser
const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const essaiBtn = document.getElementById("essaiBtn");
const rejouerBtn = document.getElementById("rejouer");
const body = document.getElementsByTagName("body")[0]; //pour changer le fond avec le dégradé chaud/froid ; on sélectionne le rang 0 = body

//On récupère les icônes coeur pour les générer automatiquement en fonction du nb d'essai restant
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>'; //on reprend les liens HTML
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

//On intègre les dégradés chaud/froid en fonction du nombre envoyé
const bgFroid = "linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)";
const bgTiede = "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)";
const bgChaud = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
const bgBrulant = "linear-gradient(to right, #f83600 0%, #f9d423 100%)";

const bgWin = "linear-gradient(to top, #e14fad 0%, #f9d423 100%)";
const bgLose =
  "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";

//La logique : on définit ce qui se passe au chargement de la page et lors d'une interaction avec l'utilisateur
const play = () => {
  //nombre aléatoire

  const randomNb = Math.floor(Math.random() * 101); //math random = un chiffre entre 0 et 1 sachant que 1 est exclu -> donc on multiplie par 101. On rajoute math floor pour garder un chiffre entien (arrondi à la valeur en dessous 100,6 -> 100).
  const totalVies = 6;
  let vies = totalVies; //vies correspond au départ au nbtotal de vie mais changera par la suite
  console.log(randomNb); //pour voir le nb choisi par math random dans la console

  //actualisation à chaque essai

  formulaire.addEventListener("submit", (e) => {
    //e = element sur lequel se déroule l'évenement
    e.preventDefault(); //empêche l'envoi du formulaire lors du submit (ne recharge pas la page)
    const valeurInput = parseInt(input.value); //on récupère la valeur que l'utilisateur a entré, parseInt traduit en nb car sinon string

    if (valeurInput < 0 || valeurInput > 100) return; //return = on arrête tout

    if (valeurInput === randomNb) {
      body.style.backgroundImage = bgWin;
      message.textContent = `BRAVO !!! Le nombre était bien ${randomNb}`; // `` = text spéc, permet de rajouter des variables dans le texte grâce à ${}
      rejouerBtn.style.display = "block"; // était en non par défaut
      essaiBtn.setAttribute("disabled", ""); //le bouton Envoyer ne fonctionne plus
    }
    //Création d'intervalles, valeurInput différent du randomNb
    if (valeurInput !== randomNb) {
      if (randomNb <= valeurInput + 2 && randomNb >= valeurInput - 2) {
        body.style.backgroundImage = bgBrulant;
        message.textContent = "C'est brûlant !!! 🔥🔥🔥";
      } else if (randomNb <= valeurInput + 5 && randomNb >= valeurInput - 5) {
        body.style.backgroundImage = bgChaud;
        message.textContent = "Tu chauffes !!! 🔥";
      } else if (randomNb <= valeurInput + 10 && randomNb >= valeurInput - 10) {
        body.style.backgroundImage = bgTiede;
        message.textContent = "Hmm c'est tiède... 😐";
      } else {
        body.style.backgroundImage = bgFroid;
        message.textContent = "C'est froid... 🥶";
      }
      vies--; //dans tous ces cas on perd une vie
      verifyLose(); //on vérifie si on a perdu ou pas
    }
    //Actualiser le nombre de vie
    actualiseCoeurs(vies);
  });

  //on crée la fonction dans la fonction play
  const verifyLose = () => {
    if (vies === 0) {
      body.style.backgroundImage = bgLose;
      body.style.color = "red";
      essaiBtn.setAttribute("disabled", ""); //le bouton Envoyer ne fonctionne plus
      message.textContent = `Vous avez perdu. La réponse était ${randomNb}.`;
      rejouerBtn.style.display = "block"; //l'option rejouer est à nouveau visible
    }
  };
  const actualiseCoeurs = (vies) => {
    divVies.innerHTML = ""; //on enlève tout le code HTML qu'il y a dans div vies
    let tableauVies = [];
    for (let i = 0; i < vies; i++) {
      tableauVies.push(coeurPlein); //tant que i est inf à vies, on rajoute des coeurs.
    }
    for (let i = 0; i < totalVies - vies; i++) {
      tableauVies.push(coeurVide);
    }
    tableauVies.forEach((coeur) => {
      divVies.innerHTML += coeur; //pour chaque élement du tableau (chaque coeur), on va rajouter l'élement aux autres dans le div vies
    });
  };
  actualiseCoeurs(vies); //pour le début du jeu

  //Forcer le rechargement de la page après le clic Rejouer

  rejouerBtn.addEventListener("click", () => {
    message.style.display = "none";
    document.location.reload(true);
  });
};

play(); //On appele la fonction play
