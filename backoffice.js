function fetchProducts() {
  return new Promise((resolve, reject) => {
    fetch("https://striveschool-api.herokuapp.com/api/product", {
      //come in homepage ho creato una prima funzione di controllo dell api
      headers: {
        //Token del api
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTBmNDdmMzA0NjAwMWFlNTlmNTgiLCJpYXQiOjE3MTI5MDY0ODUsImV4cCI6MTcxNDExNjA4NX0.5_H8VZ3zqZH4j3yBpgJoJjfffsBUnyCYzMIxJXTxZi0", // Assicurati di inserire il tuo token di accesso
      },
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject("Errore nel caricamento dei dati");
        }
      })
      .catch((error) => reject(error));
  });
}

// Funzione per creare le card dei prodotti
function createProductCards(products) {
  const productCardsContainer = document.getElementById("productCards"); //associazione
  productCardsContainer.innerHTML = ""; //vado a pulire il contenuto del prodotto precedente

  products.forEach((product) => {
    //vado a creare le card con un foreach usando sempre le classi bootstrap
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "mb-4");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card", "h-100");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.src = product.imageUrl;
    cardImage.alt = product.name;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body"); //faccio la stessa cosa che ho fatto in homepage per ricreare le card e modificarle successivamente...

    const title = document.createElement("h2");
    title.classList.add("card-title");
    title.textContent = product.name;

    const brand = document.createElement("p");
    brand.classList.add("card-text", "mb-1");
    brand.textContent = "Brand: " + product.brand;

    const price = document.createElement("p");
    price.classList.add("card-text", "fw-bold");
    price.textContent = "Prezzo: " + product.price + " €";

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.textContent = product.description;

    // Bottone per la modifica del prodotto
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-secondary", "me-2");
    editButton.textContent = "Modifica"; //qui inizia la modifica
    editButton.addEventListener("click", () => {
      //bottone che quando cliccato fare uscire un prompt simile ad un alert per far cambiare i valori di name brand description e price

      const newName = prompt(
        "Inserisci il nuovo nome del prodotto:",
        product.name
      );
      const newBrand = prompt(
        "Inserisci il nuovo brand del prodotto:",
        product.brand
      );
      const newPrice = parseFloat(
        prompt("Inserisci il nuovo prezzo del prodotto:", product.price)
      );
      const newDescription = prompt(
        "Inserisci la nuova descrizione del prodotto:",
        product.description
      );

      if (newName && newBrand && !isNaN(newPrice) && newDescription) {
        product.name = newName;
        product.brand = newBrand;
        product.price = newPrice; //ho creato una if condizion che se rispèettata farà aggiornare i valori da vecchi a nuovi mostrandoli a schermo
        product.description = newDescription;

        title.textContent = newName;
        brand.textContent = "Brand: " + newBrand;
        price.textContent = "Prezzo: " + newPrice + " €";
        description.textContent = newDescription;
      }
    });

    const deleteButton = document.createElement("button"); //ora per le operazione più delicate vado a far in modo di creare una autorizazione per l'eliminazione dei contenuti...
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Elimina";
    deleteButton.addEventListener("click", () => {
      //al click viene chiesta conferma
      // Chiedi conferma prima di eliminare il prodotto
      const confirmDelete = confirm(
        "Sei sicuro di voler eliminare questo prodotto?"
      );
      if (confirmDelete) {
        // Rimuove la card quando il bottone Elimina viene cliccato
        card.remove();
        // Effettua una richiesta sotto forma di DELETE DEL API per eliminare l id della card
        fetch(
          `https://striveschool-api.herokuapp.com/api/product/${product._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTBmNDdmMzA0NjAwMWFlNTlmNTgiLCJpYXQiOjE3MTI5MDY0ODUsImV4cCI6MTcxNDExNjA4NX0.5_H8VZ3zqZH4j3yBpgJoJjfffsBUnyCYzMIxJXTxZi0",
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              console.log("Prodotto eliminato con successo!");
            } else {
              console.error(
                "Errore durante l'eliminazione del prodotto:",
                response.statusText
              );
            }
          })
          .catch((error) => {
            console.error(
              "Si è verificato un errore durante l'eliminazione del prodotto:",
              error
            );
          });
      }
    });

    cardBody.appendChild(title);
    cardBody.appendChild(brand);
    cardBody.appendChild(price);
    cardBody.appendChild(description); //avvio tutti gli elementi
    cardBody.appendChild(editButton);
    cardBody.appendChild(deleteButton);

    cardInner.appendChild(cardImage);
    cardInner.appendChild(cardBody);
    card.appendChild(cardInner);

    productCardsContainer.appendChild(card);
  });
}

// Funzione per creare un nuovo prodotto
function createProduct(newProduct) {
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZTBmNDdmMzA0NjAwMWFlNTlmNTgiLCJpYXQiOjE3MTI5MDY0ODUsImV4cCI6MTcxNDExNjA4NX0.5_H8VZ3zqZH4j3yBpgJoJjfffsBUnyCYzMIxJXTxZi0", // Assicurati di inserire il tuo token di accesso
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Prodotto creato con successo!");
        // Aggiorna la lista dei prodotti dopo aver creato un nuovo prodotto
        fetchProducts().then((products) => {
          createProductCards(products);
        });
      } else {
        console.error(
          "Errore durante la creazione del prodotto:",
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error(
        "Si è verificato un errore durante la creazione del prodotto:",
        error
      );
    });
}

const createForm = document.getElementById("createForm");
createForm.addEventListener("submit", (event) => {
  event.preventDefault(); //previene il comportamente visto in lezione del form

  // Ottieni i valori dei campi del form
  const name = document.getElementById("name").value;
  const brand = document.getElementById("brand").value;
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("imageUrl").value;

  // Crea un oggetto con i dati del nuovo prodotto in questo caso crea una card
  const newProduct = {
    name: name,
    brand: brand,
    price: price,
    description: description,
    imageUrl: imageUrl,
  };

  // Chiama la funzione
  createProduct(newProduct);

  // Resetta il form dopo la creazione del prodotto
  createForm.reset();
});

// Inizializzazione: ottieni e visualizza i prodotti all'avvio della pagina
fetchProducts().then((products) => {
  createProductCards(products);
});
