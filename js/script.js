// création d'une petite bibliothèque de fonctions utilise sur tout le site
// vérifier le chargement de la page

function loaded(callable){
    window.addEventListener('DOMContentLoaded', callable);
}

// fonction raccourci de document.querySelector
function s(selector){
    return document.querySelector(selector);
}

// fonction raccourci de document.querySelectorAll
function sAll(selector){
    return document.querySelectorAll(selector);
}

function cE(element){
    return document.createElement(element);
}

// fonction création de cookie
// par défaut, sans variable à l'appel, la fonction setcookie détruire la cookie appelé
// setCookie('monCookie') => par défaut détruire la cookie monCookie
function setCookie(name, value ='', days = -1){
    let dateNow = new Date();
    dateNow.setTime( dateNow.getTime() + (days * 24 * 60 * 60 * 1000) );
    document.cookie = `${name}=${value}; expires=${dateNow.toUTCString()}; SameSite=Strict; Secure`;
}

// aller chercher un cookie s'il existe
function getCookie(name){
    //unCookie=12; monCookie2=test; monCookie=Nicolas;
    //.split() => transforme une chaîne de caractère en un tablea, en utilisant une sous-chaîne comme délimiteur
    // dans les cookie, le délimiteur est la chaîne '; '
    let tabCookie = document.cookie.split('; ');
    //console.log(tabCookie);
    for(cookie of tabCookie){
        let tabValue = cookie.split('=');
        //console.log(tabValue);
        if(name === tabValue[0]){
            return tabValue[1];
        }
    }
    return false;
}

function clearCookie(){
    let tabCookie = document.cookie.split('; ');
    for(cookie of tabCookie){
        let tabValue = cookie.split('=');
        setCookie(tabValue[0]);
    }
}