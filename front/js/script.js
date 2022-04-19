/********************API*************************/
let url = 'http://localhost:3000/api/products'; /*url API*/

var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request(url,myInit);

/*Récupération données ( requêtes HTTP)*/
fetch(url,myInit).then(function(res) 
{
    if (res.ok) 
    {
        return res.json();
    }
}
).then(function(products) 
{
    createProducts(products);
}
).catch(function(err) 
{
    console.log('Une erreur est survenue : ' + err);
}
);


// fonctions
function createProducts(products){
    for(let product of products) {
        console.log(product.altTxt);
    }
}
