const populatePage = function (books) {
  let books_div = document.querySelector(".books");
  books_div.childNodes[0].remove();
  books.forEach((book) => {
    let card = document.createElement("div");

    card.classList.add("card");
    card.classList.add("col-4");
    card.classList.add("col-md-3");
    card.innerHTML = `
        <img src="${book.img}" class="card-img-top" alt="book-cover">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <span class="price">€ ${book.price}</span>
          <div>
              <a href="#" class="btn btn-primary mb-2" onclick="bookPreferred(event)">Aggiungi ai preferiti</a>
              <a href="#" class="btn btn-danger" onclick="bookToRemove(event)">Rimuovi</a>
          </div>
        </div>`;
    books_div.appendChild(card);
  });
};

const bookToRemove = function (event) {
  event.target.parentElement.parentElement.parentElement.remove();
};

const searchBooksByName = function (text) {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return new Object({ status: res.status }); //oggetto che contiene lo stato di errore
      }
    })
    .then((data) => {
      //filtro i titoli che contengono il parametro cercato
      console.log(
        data.filter((book) =>
          book.title.toLowerCase().includes(text.toLowerCase())
        )
      );
      return data.filter((book) =>
        book.title.toLowerCase().includes(text.toLowerCase())
      );
    })
    .catch((err) => console.log(err));
  return 1;
};
window.onload = () => {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return new Object({ status: res.status }); //oggetto che contiene lo stato di errore
      }
    })
    .then((data) => {
      //   console.log(data);
      populatePage(data);
    })
    .catch((err) => console.log(err));

  //casella ricerca:
  let search_input = document.querySelector("#search input");
  let search_btn = document.querySelector("#search button");

  search_btn.onclick = () => {
    console.log(search_input.value);
    console.log(searchBooksByName(search_input.value));
  };
};
