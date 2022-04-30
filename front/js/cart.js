//Récupération panier via localStorage
let productList = JSON.parse(localStorage.getItem("productList"));

const positionEmptyCart = document.querySelector("#cart__items");
// appel fonction
callCart();
callForm();
postForm();


//Affichage panier
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
    //Pour apparaitre regroupée par modèle et couleurs
    productList.sort((a,b) => a.productName.localeCompare(b.productName));

    for (let product in productList)
    {
      let id = productList[product].id;

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
      ).then(function(data) 
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
          price.innerHTML = data.price + " €";

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

          callTotals(data);
          modifyQuantity();
          deleteProduct();
        }
      ).catch(function(err) 
        {
          console.log('Une erreur est survenue : ' + err);
        }
      );
    }
  }
}    
      

//Affiche total quantité et prix
function callTotals(data)
{
  // Récupération du total des quantités
  let elemsQtt = document.getElementsByClassName('itemQuantity');
  let myLength = elemsQtt.length,
  totalQtt = 0;

  for (let i = 0; i < myLength; ++i) 
  {
    totalQtt += parseInt(elemsQtt[i].value);
  }

  let totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.innerHTML = totalQtt;

  // Récupération du prix total
  totalPrice = 0;

  for (let i = 0; i < myLength; ++i) 
  {
    totalPrice += (parseInt(elemsQtt[i].value) * data.price);
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

//Formulaire Regex
function callForm() 
{
  // Ajout Regex
  let form = document.querySelector(".cart__order__form");

  //Expressions régulières
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  //Modification du prénom
  form.firstName.addEventListener('change', function() 
    {
      validFirstName(this);
    }
  );

  //Modification du nom
  form.lastName.addEventListener('change', function() 
    {
      validLastName(this);
    }
  );

  //Modification de l'adresse
  form.address.addEventListener('change', function() 
    {
      validAddress(this);
    }
  );

  //Modification de la ville
  form.city.addEventListener('change', function() 
    {
        validCity(this);
    }
  );

  //Modification de l'Email
  form.email.addEventListener('change', function() 
    {
        validEmail(this);
    }
  );

  //validation du prénom
  const validFirstName = function(inputFirstName) 
  {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) 
    {
      firstNameErrorMsg.innerHTML = '';
    }
    else 
    {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
    }
  };

  //validation du nom
  const validLastName = function(inputLastName) 
  {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) 
    {
      lastNameErrorMsg.innerHTML = '';
    }
    else
    {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
    }
  };

  //validation de l'adresse
  const validAddress = function(inputAddress) 
  {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) 
    {
      addressErrorMsg.innerHTML = '';
    }
    else
    {
      addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
    }
  };

  //validation de la ville
  const validCity = function(inputCity) 
  {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) 
    {
      cityErrorMsg.innerHTML = '';
    }
    else
    {
      cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
    }
  };

  //validation de l'Email
  const validEmail = function(inputEmail) 
  {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) 
    {
      emailErrorMsg.innerHTML = '';
    }
    else
    {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
  };
}

//Envoi infos utilisateur au localstorage
function postForm()
{
  const btn_commander = document.getElementById("order");

  //Ecouter le panier
  btn_commander.addEventListener("click", (event)=>
  {
    //Récupération coordonnées du formulaire utilisateur
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    //Construction d'un array depuis le local storage
    let idProducts = [];
    for (let i = 0; i<productList.length;i++) 
    {
      idProducts.push(productList[i].id);
    }

    const order = 
    {
      contact : 
        {
          firstName: inputName.value,
          lastName: inputLastName.value,
          address: inputAdress.value,
          city: inputCity.value,
          email: inputMail.value,
        },
      products: idProducts,
    } 

    const options = 
    {
      method: 'POST',
      body: JSON.stringify(order),
      headers: 
      {
        'Accept': 'application/json', 
        "Content-Type": "application/json" 
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => 
    {
      localStorage.clear();
      localStorage.setItem("orderId", data.orderId);

      window.location.href = "./confirmation.html";
    }
    )
    .catch((err) => 
      {
        alert ("Problème avec fetch : " + err.message);
      }
    );
  }
)
}