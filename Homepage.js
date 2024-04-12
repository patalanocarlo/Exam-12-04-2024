document.addEventListener("DOMContentLoaded", function () {
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        //Funzioni per poter caricare il contenuto della mia API
        "https://striveschool-api.herokuapp.com/api/product",
        {
          headers: {
            //Ora do le autorizzazioni al browser per accedere al contenuto
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTBmNDdmMzA0NjAwMWFlNTlmNTgiLCJpYXQiOjE3MTI5MDY0ODUsImV4cCI6MTcxNDExNjA4NX0.5_H8VZ3zqZH4j3yBpgJoJjfffsBUnyCYzMIxJXTxZi0",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nel caricamento dei dati"); //uso subito una verifa in caso di errore cosi da capire subito il problema
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Si è verificato un errore:", error);
    }
  };

  const createProductCards = async () => {
    //Inizio la creazione delle card
    const products = await fetchProducts();
    const productCardsContainer = document.getElementById("productCards"); //prendo l'id dell elemento dal mio html

    products.forEach((product) => {
      //per ogni card produco un div con le classi di bootstrap...
      const card = document.createElement("div");
      card.classList.add("col-lg-4", "col-md-6", "mb-4");

      const cardInner = document.createElement("div"); //setto le grandezza della card massima
      cardInner.classList.add("card", "h-100");

      const cardImage = document.createElement("img");
      cardImage.classList.add("card-img-top"); //vado a creare il collegamento della immagine con la sua url
      cardImage.src = product.imageUrl;
      cardImage.alt = product.name;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const title = document.createElement("h2");
      title.classList.add("card-title");
      title.textContent = product.name; //nome che avro su ogni singola card

      const brand = document.createElement("p");
      brand.classList.add("card-text", "mb-1");
      brand.textContent = "Brand: " + product.brand; //brand che avro su ogni singola card

      const price = document.createElement("p");
      price.classList.add("card-text", "fw-bold");
      price.textContent = "Prezzo: " + product.price + " €"; //prezzo che avro su ogni singola card

      const description = document.createElement("p");
      description.classList.add("card-text"); //breve descrizzione di ogni singola card
      description.textContent = product.description;

      const discoverButton = document.createElement("button");
      discoverButton.classList.add("btn", "btn-primary", "me-2"); //creo il bottone con un evento sul suo click il quale mi colleghera alla pagina dettaglio...
      discoverButton.textContent = "Scopri di più"; //il bottone in questo caso e quello di scopri di più
      discoverButton.addEventListener("click", () => {
        const productData = encodeURIComponent(JSON.stringify(product));
        window.location.href = `dettaglio.html?product=${productData}`;
      });

      const editButton = document.createElement("button");
      editButton.classList.add("btn", "btn-secondary");
      editButton.textContent = "Modifica"; //Bottone di modifica che fa un lavoro simile a quello di dettaglio solo che ci farà andare nel backoffice
      editButton.addEventListener("click", () => {
        window.location.href = `backoffice.html`;
      });

      cardBody.appendChild(title);
      cardBody.appendChild(brand);
      cardBody.appendChild(price); //Qui avvio tutte le funzione di ogni singolo elemento....
      cardBody.appendChild(description);
      cardBody.appendChild(discoverButton);
      cardBody.appendChild(editButton);

      cardInner.appendChild(cardImage);
      cardInner.appendChild(cardBody);
      card.appendChild(cardInner);

      productCardsContainer.appendChild(card);
    });
  };

  createProductCards();
});
