//fonction pour récupérer id du produit dans l'url
let params = new URL(document.location).searchParams;
let id = params.get("id");

//url API
let url = 'http://localhost:3000/api/products/' + id; 

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
    let colorOption = document.getElementById("colors");

    //apparition dynamique des éléments
    imageAlt.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    name.innerHTML += product.name;
    prix.textContent = `${product.price} `;
    description.innerHTML += product.description;
    colorOption.innerHTML += product.colorOption;

    //choix colors dynamiques
    for (let color of product.colors) 
    {
        colorOption.innerHTML += `<option value="${color}">${color}</option>`;
    }

    let button = document.getElementById("addToCart");
    button.addEventListener('click', function()
    {
        let stockProduct=document.getElementById("quantity");
        let colorOption=document.getElementById("colors");

        if ((stockProduct.value === "0") 
            || (colorOption.value === ""))
        {
            alert("Veuillez sélectionner une couleur et une quantité");
        }
        else
        {
            //Recupération choix de la color
            let colorPicked = colorOption.value;
                
            //Recupération choix de la quantité
            let quantity = stockProduct.value;

            //Récupération des options de l'article à ajouter au panier
            let productOptions = 
            {
                id: id,
                colorPicked: colorPicked,
                quantity: quantity,
                productName: product.name,
                productPrice: product.price,
                productDescription: product.description,
                productImg: product.imageUrl,
                productAltImg: product.altTxt
            };

            let productList = JSON.parse(localStorage.getItem("productList"));
            
            if (productList) 
            {

                const resultFind = productList.find(
                    (product) => product.id === id && product.colorPicked === colorPicked);
                    
                    //Si le produit commandé est déjà dans le panier
                    if (resultFind) 
                    {
                        resultFind.quantity = parseInt(resultFind.quantity) + parseInt(productOptions.quantity);
                        localStorage.setItem("productList", JSON.stringify(productList));
                    }
                    
                    //Si le produit commandé n'est pas dans le panier
                    else 
                    {
                        productList.push(productOptions);
                        localStorage.setItem("productList", JSON.stringify(productList));
                    }
            }
            else 
            {
                productList=[];
                productList.push(productOptions);
                localStorage.setItem("productList", JSON.stringify(productList));
                console.table(productList);
            }
            
            //alerte pop-up
            var result = confirm("Le produit a bien été ajouté à votre panier\n Voulez-vous aller directement au panier ?", "confirmez");
            
            // résultat et chargement page
            if (result === true)
            {
                window.location.href = "./cart.html"
            }
            else
            {
                window.location.href ="./index.html"
            }
        }
    });
};
