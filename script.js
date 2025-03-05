let xp = 0;
let sante = 100;
let or = 50;
let armeActuelle = 0;
let combat;
let santeMonstre;
let inventaire = ["bâton"];

const bouton1 = document.querySelector('#button1');
const bouton2 = document.querySelector("#button2");
const bouton3 = document.querySelector("#button3");
const texte = document.querySelector("#text");
const xpTexte = document.querySelector("#xpText");
const santeTexte = document.querySelector("#healthText");
const orTexte = document.querySelector("#goldText");
const statsMonstre = document.querySelector("#monsterStats");
const nomMonstre = document.querySelector("#monsterName");
const santeMonstreTexte = document.querySelector("#monsterHealth");
const armes = [
  { name: 'bâton', power: 5 },
  { name: 'couteau', power: 30 },
  { name: 'marteau', power: 50 },
  { name: 'glaive', power: 100 }
];
const monstres = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "bête à crocs",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const lieux = [
  {
    name: "place de la ville",
    "button text": ["Aller à la boutique", "Descendre dans la grotte", "Affronter le dragon"],
    "button functions": [allerBoutique, allerGrotte, affronterDragon],
    text: "Vous êtes sur la place de la ville. Vous voyez un panneau qui dit \"Boutique\"."
  },
  {
    name: "boutique",
    "button text": ["Acheter 10 santé (10 or)", "Acheter une arme (30 or)", "Retourner à la place de la ville"],
    "button functions": [acheterSante, acheterArme, allerPlace],
    text: "Vous entrez dans la boutique."
  },
  {
    name: "grotte",
    "button text": ["Combattre le slime", "Combattre la bête à crocs", "Retourner à la place de la ville"],
    "button functions": [combattreSlime, combattreBete, allerPlace],
    text: "Vous entrez dans la grotte. Vous voyez des monstres."
  },
  {
    name: "combat",
    "button text": ["Attaquer", "Esquiver", "Fuir"],
    "button functions": [attaquer, esquiver, allerPlace],
    text: "Vous combattez un monstre."
  },
  {
    name: "tuer monstre",
    "button text": ["Retourner à la place de la ville", "Retourner à la place de la ville", "Retourner à la place de la ville"],
    "button functions": [allerPlace, allerPlace, oeufPaques],
    text: 'Le monstre crie "Arg!" en mourant. Vous gagnez des points d\'expérience et trouvez de l\'or.'
  },
  {
    name: "perdre",
    "button text": ["REJOUER?", "REJOUER?", "REJOUER?"],
    "button functions": [recommencer, recommencer, recommencer],
    text: "Vous êtes mort. &#x2620;"
  },
  { 
    name: "gagner", 
    "button text": ["REJOUER?", "REJOUER?", "REJOUER?"], 
    "button functions": [recommencer, recommencer, recommencer], 
    text: "Vous avez vaincu le dragon! VOUS GAGNEZ LE JEU! &#x1F389;" 
  },
  {
    name: "oeuf de pâques",
    "button text": ["2", "8", "Retourner à la place de la ville?"],
    "button functions": [choisirDeux, choisirHuit, allerPlace],
    text: "Vous trouvez un jeu secret. Choisissez un numéro ci-dessus. Dix numéros seront choisis au hasard entre 0 et 10. Si le numéro que vous choisissez correspond à l'un des numéros aléatoires, vous gagnez!"
  }
];

// initialiser les boutons
bouton1.onclick = () => { allerBoutique(); };
bouton2.onclick = () => { allerGrotte(); };
bouton3.onclick = () => { affronterDragon(); };

function mettreAJour(lieu) {
  statsMonstre.style.display = "none";
  bouton1.innerText = lieu["button text"][0];
  bouton2.innerText = lieu["button text"][1];
  bouton3.innerText = lieu["button text"][2];
  bouton1.onclick = lieu["button functions"][0];
  bouton2.onclick = lieu["button functions"][1];
  bouton3.onclick = lieu["button functions"][2];
  texte.innerHTML = lieu.text;
}

function allerPlace() {
  mettreAJour(lieux[0]);
}

function allerBoutique() {
  mettreAJour(lieux[1]);
}

function allerGrotte() {
  mettreAJour(lieux[2]);
}

function acheterSante() {
  if (or >= 10) {
    or -= 10;
    sante += 10;
    orTexte.innerText = or;
    santeTexte.innerText = sante;
  } else {
    texte.innerText = "Vous n'avez pas assez d'or pour acheter de la santé.";
  }
}

function acheterArme() {
  if (armeActuelle < armes.length - 1) {
    if (or >= 30) {
      or -= 30;
      armeActuelle++;
      orTexte.innerText = or;
      let nouvelleArme = armes[armeActuelle].name;
      texte.innerText = "Vous avez maintenant une " + nouvelleArme + ".";
      inventaire.push(nouvelleArme);
      texte.innerText += " Dans votre inventaire, vous avez : " + inventaire;
    } else {
      texte.innerText = "Vous n'avez pas assez d'or pour acheter une arme.";
    }
  } else {
    texte.innerText = "Vous avez déjà l'arme la plus puissante!";
    bouton2.innerText = "Vendre l'arme pour 15 or";
    bouton2.onclick = vendreArme;
  }
}

function vendreArme() {
  if (inventaire.length > 1) {
    or += 15;
    orTexte.innerText = or;
    let armeActuelle = inventaire.shift();
    texte.innerText = "Vous avez vendu une " + armeActuelle + ".";
    texte.innerText += " Dans votre inventaire, vous avez : " + inventaire;
  } else {
    texte.innerText = "Ne vendez pas votre seule arme!";
  }
}

function combattreSlime() {
  combat = 0;
  allerCombat();
}

function combattreBete() {
  combat = 1;
  allerCombat();
}

function affronterDragon() {
  combat = 2;
  allerCombat();
}

function allerCombat() {
  mettreAJour(lieux[3]);
  santeMonstre = monstres[combat].health;
  statsMonstre.style.display = "block";
  nomMonstre.innerText = monstres[combat].name;
  santeMonstreTexte.innerText = santeMonstre;
}

function attaquer() {
  texte.innerText = "Le " + monstres[combat].name + " attaque.";
  texte.innerText += " Vous l'attaquez avec votre " + armes[armeActuelle].name + ".";
  sante -= obtenirValeurAttaqueMonstre(monstres[combat].level);
  if (monstreEstTouche()) {
    santeMonstre -= armes[armeActuelle].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    texte.innerText += " Vous ratez.";
  }
  santeTexte.innerText = sante;
  santeMonstreTexte.innerText = santeMonstre;
  if (sante <= 0) {
    perdre();
  } else if (santeMonstre <= 0) {
    if (combat === 2) {
      gagnerJeu();
    } else {
      vaincreMonstre();
    }
  }
  if (Math.random() <= .1 && inventaire.length !== 1) {
    texte.innerText += " Votre " + inventaire.pop() + " se casse.";
    armeActuelle--;
  }
}

function obtenirValeurAttaqueMonstre(level) {
  const coup = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(coup);
  return coup > 0 ? coup : 0;
}

function monstreEstTouche() {
  return Math.random() > .2 || sante < 20;
}

function esquiver() {
  const chance = Math.random();
  if (chance < 0.5) {
    texte.innerText = "Vous esquivez l'attaque du " + monstres[combat].name + " et contre-attaquez!";
    santeMonstre -= armes[armeActuelle].power;
    santeMonstreTexte.innerText = santeMonstre;
    if (santeMonstre <= 0) {
      if (combat === 2) {
        gagnerJeu();
      } else {
        vaincreMonstre();
      }
    }
  } else {
    texte.innerText = "Vous tentez d'esquiver mais le " + monstres[combat].name + " vous touche!";
    sante -= obtenirValeurAttaqueMonstre(monstres[combat].level);
    santeTexte.innerText = sante;
    if (sante <= 0) {
      perdre();
    }
  }
}

function vaincreMonstre() {
  or += Math.floor(monstres[combat].level * 6.7);
  xp += monstres[combat].level;
  orTexte.innerText = or;
  xpTexte.innerText = xp;
  mettreAJour(lieux[4]);
}

function perdre() {
  mettreAJour(lieux[5]);
}

function gagnerJeu() {
  mettreAJour(lieux[6]);
}

function recommencer() {
  xp = 0;
  sante = 100;
  or = 50;
  armeActuelle = 0;
  inventaire = ["bâton"];
  orTexte.innerText = or;
  santeTexte.innerText = sante;
  xpTexte.innerText = xp;
  allerPlace();
}

function oeufPaques() {
  mettreAJour(lieux[7]);
}

function choisirDeux() {
  choisir(2);
}

function choisirHuit() {
  choisir(8);
}

function choisir(deviner) {
  const nombres = [];
  while (nombres.length < 10) {
    nombres.push(Math.floor(Math.random() * 11));
  }
  texte.innerText = "Vous avez choisi " + deviner + ". Voici les numéros aléatoires:\n";
  for (let i = 0; i < 10; i++) {
    texte.innerText += nombres[i] + "\n";
  }
  if (nombres.includes(deviner)) {
    texte.innerText += "Correct! Vous gagnez 20 or!";
    or += 20;
    orTexte.innerText = or;
  } else {
    texte.innerText += "Faux! Vous perdez 10 santé!";
    sante -= 10;
    santeTexte.innerText = sante;
    if (sante <= 0) {
      perdre();
    }
  }
}