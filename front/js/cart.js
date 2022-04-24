//Récupération panier via localStorage
let productList = JSON.parse(localStorage.getItem("productList"));

const positionEmptyCart = document.querySelector("#cart__items");
// appel fonctions
callCart();
callTotals();
modifyQuantity();
deleteProduct();

function callCart()
{
  // Lorsque panier est vide
  if (!productList || productList ==0) 
  {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } 

  //Lorsque panier contient minimum 1 article
  else 
  {
    for (let product in productList)
    {
      // Insertion de l'élément "article"
      let article = document.createElement("article");
      document.getElementById("cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute('data-id', productList[product].id);

      // Insertion de l'élément "div"
      let divImg = document.createElement("div");
      article.appendChild(divImg);
      divImg.className = "cart__item__img";

      // Insertion de l'image
      let Img = document.createElement("img");
      divImg.appendChild(Img);
      Img.src = productList[product].productImg;
      Img.alt = productList[product].productAltImg;

      // Insertion de l'élément "div"
      let itemContent = document.createElement("div");
      article.appendChild(itemContent);
      itemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let itemContentTitlePrice = document.createElement("div");
      itemContent.appendChild(itemContentTitlePrice);
      itemContentTitlePrice.className = "cart__item__content__titlePrice";

      // Insertion du titre h3
      let title = document.createElement("h2");
      itemContentTitlePrice.appendChild(title);
      title.innerHTML = productList[product].productName;

      // Insertion de la couleur
      let color = document.createElement("p");
      title.appendChild(color);
      color.innerHTML = productList[product].colorPicked;
      color.style.fontSize = "20px";

      // Insertion du prix
      let price = document.createElement("p");
      itemContentTitlePrice.appendChild(price);
      price.innerHTML = productList[product].productPrice + " €";

      // Insertion de l'élément "div"
      let itemContentSettings = document.createElement("div");
      itemContent.appendChild(itemContentSettings);
      itemContentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let itemContentSettingsQuantity = document.createElement("div");
      itemContentSettings.appendChild(itemContentSettingsQuantity);
      itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
          
      // Insertion de "Qté : "
      let Qte = document.createElement("p");
      itemContentSettingsQuantity.appendChild(Qte);
      Qte.innerHTML = "Qté : ";

      // Insertion de la quantité
      let quantity = document.createElement("input");
      itemContentSettingsQuantity.appendChild(quantity);
      quantity.value = productList[product].quantity;
      quantity.className = "itemQuantity";
      quantity.setAttribute("type", "number");
      quantity.setAttribute("min", "1");
      quantity.setAttribute("max", "100");
      quantity.setAttribute("name", "itemQuantity");

      // Insertion de l'élément "div"
      let itemContentSettingsDelete = document.createElement("div");
      itemContentSettings.appendChild(itemContentSettingsDelete);
      itemContentSettingsDelete.className = "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let supprimer = document.createElement("p");
      itemContentSettingsDelete.appendChild(supprimer);
      supprimer.className = "deleteItem";
      supprimer.innerHTML = "Supprimer";

    }
  }
}
      
function callTotals()
{
  // Récupération du total des quantités
  let elemsQtt = document.getElementsByClassName('itemQuantity');
  let myLength = elemsQtt.length,
  totalQtt = 0;

  for (let i = 0; i < myLength; ++i) 
  {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.innerHTML = totalQtt;

  // Récupération du prix total
  totalPrice = 0;

  for (let i = 0; i < myLength; ++i) 
  {
    totalPrice += (elemsQtt[i].value * productList[i].productPrice);
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
}


// Modification d'une quantité de produit
function modifyQuantity() 
{
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let m = 0; m < qttModif.length; m++)
  {
    qttModif[m].addEventListener("change" , (event) => 
      {
        event.preventDefault();

        //Selection de l'element à modifier selon quantité ET valeur
        let quantityModif = productList[m].quantity;
        let qttModifValue = qttModif[m].value;
          
        if (qttModifValue !== quantityModif) {
          productList[m].quantity = qttModifValue;

          localStorage.setItem("productList", JSON.stringify(productList));
      
          location.reload();
        }
      }
    )
  }
}

// Suppression d'un produit
function deleteProduct() 
{
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let s = 0; s < btn_supprimer.length; s++)
  {
    btn_supprimer[s].addEventListener("click" , (event) => 
      {
        event.preventDefault();

        //Selection de l'element à supprimer selon id ET couleur
        let idDelete = productList[s].id;
        let colorDelete = productList[s].colorPicked;

        productList = productList.filter( el => el.id !== idDelete || el.colorPicked !== colorDelete );
          
        localStorage.setItem("productList", JSON.stringify(productList));

        //Alerte produit supprimé et refresh
        alert("Ce produit a bien été supprimé du panier");
        location.reload();
      }
    )
  }
} 