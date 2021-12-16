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

// Fontcions AJAX

// getXhr() : ouvrir une connexion AJAX

function getXhr(){
    let xhr = null;
    // est-ce que le navigateur supporte AJAX
    if( window.ActiveXObject || window.XMLHttpRequest ){ 
        // ActiveXObject représente le protocole AJAX pour IE, 
        // XMLHttpRequest pour les autres navigateurs 
        if( window.ActiveXObject ){// si IE
            try{// on essaie le premier protocole, si une erreur arrive() en retour
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){ // c'est forcément l'autre protocole quel'on utilise
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
        }else{ // s'il ne s'agit pas d'un internet explorer
            xhr = new XMLHttpRequest();
        }
    }else{
        console.log('le navigateur ne supporte pas ajax');
        xhr = false;
    }
    return xhr;
}

function jsonUsersTable(data){
    let html = '';
    
    for(let user of data){
        //console.log(user);
        html += `
        <tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>
        `;
    }
    return html;
}

function jsonUsersTableObject(data){
    let thead = '';
    let tbody = '';
    let isFirstRound = true;
    thead += '<tr>';

    for(let user of data){
        //ici, chaque élément du JSON
        tbody += `<tr data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">`;
        // on parcour les propriétés de l'objet user
        for( let key in user){
            //on vérfie que chaque propriété trouvée est une propriété directe de l'objet
            if(user.hasOwnProperty(key)){
                // si c'est le premier user, on crée la ligne d'entête du tableau,
                // en récupérant les clefs des propriétés 
                if(isFirstRound){
                    thead += `<th> ${key} </th>`;
                }
                // si la propriété ne contient pas un objet (deuxième niveau),
                // on l'inclus directement dans une cellule
                if('object' !== typeof user[key]){
                    tbody += `<td> ${user[key]} </td>`
                }else{
                    // si la propriété contient un objet (deuxième niveau)
                    tbody += `<td>`
                    for(item in user[key]){
                        if(user[key].hasOwnProperty(item)){
                            // on ajoute les détails de l'objet dans la cellule (nom de la propriété et sa valeur)
                            // si elle ne contient pas d'objet
                            if('object' !== typeof user[key][item]){
                                tbody += ` ${item} : ${user[key][item]}`;
                            }
                            //si c'est un objet, on ne l'ajoute pas (troisième niveau non affiché)
                        }
                    }
                    tbody += `</td>`
                }
            }
        }
        isFirstRound = false;
        tbody += `</tr>`;
    }

    thead += '</tr>';

    return [thead, tbody];
}