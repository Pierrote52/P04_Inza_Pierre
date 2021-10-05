function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += "responsive";
    console.log(x.className); 
    document.getElementById('main').style.paddingTop= "70%";
    document.getElementById('laBar').style.marginTop = "4em";
  } else {
    x.className = "topnav";
    document.getElementById('main').style.paddingTop= "0%";
    document.getElementById('laBar').style.marginTop = "0em";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

//Une constante qui permet de recuperer l'element a du clique sur la croix.
const closeModal = document.getElementById("closeModal");
//passe à true si le formulaire est conforme. 
const formulaireConform = false;

//
let finClick = document.getElementById('closeFin');


//List des locations butons.
let locationBtn = document.getElementsByName('location');


//fonction pour ajout des villes dans une liste. 
for(i = 0;i<locationBtn.length;i++){
  let theElement = document.getElementById('location'+(i+1));

  theElement.addEventListener('click',function(event){
    console.log(event.target.value);
    participationCitys = event.target.value;
  })
}

//Données du formulaire.
let lastName;
let firstName;
let email;
let birthDay;
let quantityCount = 0;
let participationCitys;
let acceptConditionsUtilisation = true; 
let abonnementNewsLetter = false;

//Les constantes des phrases de réponse dans le HTML.
const responseFirst = document.getElementById('firstResponse');
const responseLast = document.getElementById('lastResponse');
const responseMail = document.getElementById('mailResponse');
const responseBirth = document.getElementById('birthResponse');
const responseQuantity = document.getElementById('quantityResponse');
const responseConditions = document.getElementById('conditionsResponse');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Methode appelé lors de l'appuis sur la croix pour fermer le formulaire.
closeModal.addEventListener('click', function(){
  modalbg.style.display = "none";
})

//fonction qui permet de savoir si le prénom ne comporte pas de numéros, commence par une majuscule et est en un seul mot. 
document.getElementById('first').addEventListener('change',function(value){
 
  //Expression regulière qui contrôle la saisie de texte
  if (/^[A-Za-zéèàç\-]+$/.test(value.target.value) ){
    console.log('Name Ok ! ');
    console.log(value.target.value);
    lastName = value.target.value;
    responseFirst.style.display= "block";
    responseFirst.innerText= "Prénom valide";
    responseFirst.style.color="green";
    
    //Si la Regex retourne une valeur false, je signale à l'utilisateur avec un message en Rouge en dessous du champ. 
  }else{
    lastName = null;
    responseFirst.style.display= "block";
    responseFirst.innerText= "Prénom non-valide";
    responseFirst.style.color="red";
    


  };

})

//fonction qui permet de controller le NOM.
document.getElementById('last').addEventListener('change',function(value){
 

  //RegEx qui permet de controler que le champ saisie est bien un champ texte. 
  if (/^[A-Za-zéèàç\-]+$/.test(value.target.value) ){
    console.log('Name Ok ! ');
    console.log(value.target.value);
    firstName = value.target.value;
    responseLast.style.display= "block";
    responseLast.innerText= "Nom valide";
    responseLast.style.color="green";
    
    //Ce qu'il faut faire si l'input n'est pas valide. Je notifie l'utilisateur par un petit message en dessous du champ. 
  }else{
    firstName = null;
    responseLast.style.display= "block";
    responseLast.innerText= "Nom non-valide";
    responseLast.style.color="red";

  };

})
//fonction de verification de l'email avec RegEx.
document.getElementById('email').addEventListener('change',function(mail){
//Cette RegEx permet de contrôlr la saisie d'un e-mail. 
  if(/^([a-z]||[0-9]||[-|.|/|=|+|,|?|è|é|"|'|(|&|$|*)])+[@]{1}([a-z]||[0-9]||[-|.|/|=|+|,|?|è|é|"|'|(|&|$|*)]){3,}[.]{1}[a-z]{2,3}$/.test(mail.target.value)){
    responseMail.textContent = "e-mail valide";
    responseMail.style.color = "green";
    responseMail.style.display= "block";
    email = mail;

  } else {
    responseMail.textContent = "e-mail non-valide";
    responseMail.style.color = "red";
    responseMail.style.display= "block";

  }





})
//fonction de verification du birthDate avec RegEx.
document.getElementById('birthdate').addEventListener('change',function(birth){
  birth.preventDefault();

  //Cette RegEx permet de verifier que la date de naissance soit cohérente. 
  if(/^[1]{1}[9]{1}[1-9]{1}[0-9]{1}[-]{1}/.test(birth.target.value) || /^[2]{1}[0]{1}(([0]{1}[0-9]{1})||([1]{1}[0-4]{1}))[-]{1}/.test(birth.target.value)  ){
    // console.log(birth.target.value);
    // console.log('Date Ok ');
    birthDay = birth.target.value;
    responseBirth.textContent = 'Année de naissance valide';
    responseBirth.style.color= "green";
    responseBirth.style.display= "block";



  }else{
    birthDay = null;
    console.log(birth.target.value);
    console.log('NON-Valide');
    responseBirth.textContent = 'Année de naissance non-valide';
    responseBirth.style.color= "red";
    responseBirth.style.display= "block";
    
  }


})
//fonction qui permet de notifier l'utilisateur que le nombre de tournois effectué n'a pas été enregistré. 
document.getElementById('quantity').addEventListener('input', function(quantity){

  console.log();
  
//Verifie que le le nombre de parcours réalisés soient inférieurs à 99 , et que la lettre e ne soit pas mentionnée dans le champ. Cette lettre etant prise en compte à cause de sa signification Exponencielle "e". 
  if(quantity.data > 99 || quantity.data =="e"||quantity.data ==null){
    quantityCount = null;
    responseQuantity.textContent = "donnée non-valide";
    responseQuantity.style.color = "red";
    responseQuantity.style.display = "block";

  } else {
    if(quantity.target.value ==null){quantityCount = 0};
    quantityCount = quantity.target.value;
    responseQuantity.textContent = "donnée valide";
    responseQuantity.style.color = "green";
    responseQuantity.style.display = "block";

  }
})

//fonction qui contrôle le nom de la ville et l'ajoute aux villes de participation. 
document.getElementById('location1').addEventListener('click', function(event){
  participationCitys = event.target.value;
})

//Cette fonction vérifie que les conditions d'utilisations ont bien été acceptées. 
document.getElementById('checkbox1').addEventListener('click', function(){

  //par defaut la valeur étant sur true, ici nous assignon l'inverse de la valeur par defaut en cas de click.
  acceptConditionsUtilisation = !acceptConditionsUtilisation;
})

//Cette fonction permet de savoir si la case d'abonnement à la NewsLetter à été cochée. 
document.getElementById('checkbox2').addEventListener('click', function(){

  //par defaut la valeur étant sur true, ici nous assignon l'inverse de la valeur par defaut en cas de click.
  abonnementNewsLetter = !abonnementNewsLetter;
})


//Cette fonction vérifie la validité du formulaire. 
document.getElementById('submit').addEventListener('click', function(elemnt){
      elemnt.preventDefault();
//Ici nous vérifions que tous les champs soient correctement remplies. 
  if(lastName!=null && firstName!=null && email!=null && birthDay!=null && acceptConditionsUtilisation==true){
    console.log('Formulaire OK ');
    let form = document.getElementById('formulaire');
    form.style.display = "none";

    document.getElementById('textDeFin').style.display = "block";
    document.getElementsById('content').style.height = "90%";

  }else{
    //TODO:Injecter pour les phrases de negativité.
    if(lastName==null){
      console.log("ERROR");
      console.log(lastName);
      responseLast.style.display= "block";
      responseLast.innerText= "Nom non-valide";
      responseLast.style.color="red";};
      if(firstName ==null){
        responseFirst.style.display= "block";
      responseFirst.innerText= "Prénom non-valide";
      responseFirst.style.color="red";

      };
      if(email==null){
        responseMail.style.display= "block";
        responseMail.innerText= "e-mail non-valide";
        responseMail.style.color="red";
      };
      if(birthDay==null){
        responseBirth.style.display= "block";
        responseBirth.innerText= "anniversaire non-valide";
        responseBirth.style.color="red";
      };
      if(acceptConditionsUtilisation ==false){


      }
    let phraseFormulaireInvaid = document.getElementById('formulairePhrase');
    phraseFormulaireInvaid.textContent = "Formulaire non-valide";
    phraseFormulaireInvaid.style.color = "red";
    phraseFormulaireInvaid.style.display = "block";

  }

});

finClick.addEventListener('click',function(){
  modalbg.style.display = "none";
})