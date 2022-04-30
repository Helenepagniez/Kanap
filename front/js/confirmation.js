//Affiche numéro de commande
function commandNumber(){
    const idNode = document.getElementById("orderId");
    idNode.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

commandNumber();