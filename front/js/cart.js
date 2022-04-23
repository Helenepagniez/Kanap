//Récupération panier via localStorage
let productList = JSON.parse(localStorage.getItem("productList"));

const positionEmptyCart = document.querySelector("#cart__items");

callCart();

function callCart()
{
    // Lorsque panier est vide
    if (!productList) 
    {
        const emptyCart = `<p>Votre panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } 

    //Lorsque panier contient minimum 1 article
    else 
    {
        for (let product in productList)
        {
            document.getElementById('cart__items')
            .innerHTML += 
                `<article class="cart__item" data-id="${product.id}" data-color="${product.colorPicked}">
                <div class="cart__item__img">
                  <img src="${product.productImg}" alt="${product.productAltImg}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.productName}</h2>
                    <p>${product.colorPicked}</p>
                    <p>${product.productPrice}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="quantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
        }
    }
}


                