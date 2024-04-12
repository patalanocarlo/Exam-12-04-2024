document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("product"); //Funzione che va a prendere i valori dei prodotti, i loro id e la url
  const product = JSON.parse(decodeURIComponent(productId));

  const productImage = document.getElementById("productImage");
  const productName = document.getElementById("productName");
  const productDescription = document.getElementById("productDescription"); //creo delle costanti che si vanno ad abbianare ai miei elementi cosi da poterli rendere visibi in pagina
  const productPrice = document.getElementById("productPrice");

  productImage.src = product.imageUrl;
  productName.textContent = product.name;
  productDescription.textContent = product.description;
  productPrice.textContent = "Prezzo: " + product.price + " €";
});
