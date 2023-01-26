const populatePage = function (books) {
  let books_div = document.querySelector(".books");

  books.forEach((book) => {
    let card = document.createElement("div");

    card.classList.add("card");
    card.classList.add("col-4");
    card.classList.add("col-md-3");
    card.innerHTML = `
        <img src="${book.img}" class="card-img-top" alt="">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <span class="">€ ${book.price}</span>
          <a href="#" class="btn btn-primary" onclick="bookselected(event)">Aggiungi ai preferiti</a>
        </div>`;
    books_div.appendChild(card);
  });
};

const bookselected = function (event) {
  console.dir(event.target.pare);
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
      console.log(data);
      populatePage(data);
    })
    .catch((err) => console.log(err));
};
