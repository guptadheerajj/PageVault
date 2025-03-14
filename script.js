const addBookBtn = document.querySelector(".add-new");
const addDialog = document.querySelector(".add-new-dialog");
const submitDialog = document.querySelector(
	".form-row > button[type = 'submit']"
);

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
				<span class="info-type">Read?:</span>
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

addBookBtn.addEventListener("click", (event) => {
	addDialog.showModal();
});

function getInputs() {
	const inputList = document.querySelectorAll(".form-row input");
	const userInputs = [];
	inputList.forEach((element) => {
		userInputs.push(element.value);
	});

	return userInputs;
}

submitDialog.addEventListener("click", (event) => {
	event.preventDefault();
	const userInputs = getInputs();
	addBookToLibrary(...userInputs);
	document.querySelector("dialog form").reset();
	
	addDialog.close();
	const cardContainer = document.querySelector(".card-container");
	cardContainer.innerHTML = "";
	displayCards(myLibrary);
});
