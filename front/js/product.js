//fonction pour récupérer id du produit dans l'url
let params = new URL(document.location).searchParams;
let id = params.get("id");

let url = 'http://localhost:3000/api/products/' + id; /*url API*/

var myHeaders = new Headers();

var myInit = 
            {
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
            };

var myRequest = new Request(url,myInit);

//Récupération données ( requêtes HTTP)
fetch(url,myInit).then(function(res) 
    {
        if (res.ok) 
        {
            return res.json();
        }
    }
    ).then(function(product) 
    {
        showProduct(product);
    }
    ).catch(function(err) 
    {
        console.log('Une erreur est survenue : ' + err);
    }
    );

// fonction affichage détails du produit selectionné
function showProduct(product)
{
    //création éléments statiques
    let imageAlt = document.querySelector("article div.item__img");
    let name = document.getElementById("title");
    let prix = document.getElementById("price");
    let description = document.getElementById("description");
    let couleurOption = document.getElementById("colors");

    //apparition dynamique des éléments
    imageAlt.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    name.innerHTML += product.name;
    prix.textContent = `${product.price} `;
    description.innerHTML += product.description;
    couleurOption.innerHTML += product.couleurOption;

    // choix couleurs dynamiques
    for (let couleur of product.colors) 
    {
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
    }
}
