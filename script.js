const myLibrary = [];

function Book(title, author, pages, language, genre, isRead) {
	if (!new.target) {
		throw Error("Use new keyword to call a constructor function");
	}
	this.uid = crypto.randomUUID();
	this.title = title.charAt(0).toUpperCase() + title.slice(1);
	this.author = author.charAt(0).toUpperCase() + author.slice(1);
	this.pages = pages;
	this.language = language.charAt(0).toUpperCase() + language.slice(1);
	this.genre = genre.charAt(0).toUpperCase() + genre.slice(1);
	this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, language, genre, isRead) {
	const book = new Book(title, author, pages, language, genre, isRead);
	myLibrary.push(book);
}

function createCard(book) {
	const card = document.createElement("div");
	card.classList.add("card");
	const content = `<div class="title">${book.title}</div>
			<div class="author info"><span class="info-type">By:</span> <span>${book.author}</span></div>
			<div class="pages info"><span class="info-type">Number of Pages:</span> <span>${book.pages}</span></div>
			<div class="language info"><span class="info-type">Language:</span> <span>${book.language}</span></div>
			<div class="genre info"><span class="info-type">Genre:</span> <span>${book.genre}</span></div>
			<label class="switch info">
				<span class="info-type">Mark as read:</span>
				<input type="checkbox">
				<span class="slider"></span>
			</label>`;
	card.innerHTML = content;

	return card;
}

function displayCards(myLibrary) {
	const cardContainer = document.querySelector(".card-container");
	for (const book of myLibrary) {
		const card = createCard(book);
		cardContainer.appendChild(card);
	}
}

addBookToLibrary(
	"Operating system",
	"dheeraj",
	21,
	"english",
	"programming",
	"true"
);

addBookToLibrary("Atomic system", "aryan", 24, "english", "Chemistry", "false");
addBookToLibrary("Video system", "akash", 20, "english", "Design", "true");

displayCards(myLibrary);
