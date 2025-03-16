const addBookBtn = document.querySelector(".add-new");
const addDialog = document.querySelector(".add-new-dialog");
const submitDialog = document.querySelector(
	".form-row > button[type = 'submit']"
);

const myLibrary = [];

function toggleQuote() {
	const quoteContainer = document.querySelector(".quote-container");
	quoteContainer.classList.toggle("display-none");
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function Book({ title, author, pages, language, genre, isRead }) {
	if (!new.target) {
		throw Error("Use new keyword to call a constructor function");
	}
	this.uid = crypto.randomUUID();
	this.title = capitalize(title);
	this.author = capitalize(author);
	this.pages = pages;
	this.language = capitalize(language);
	this.genre = capitalize(genre);
	this.isRead = isRead;
}

Book.prototype.toggleCheckboxStatus = function () {
	this.isRead = !this.isRead;
};

function addBookToLibrary(userInputs) {
	const book = new Book(userInputs);
	myLibrary.push(book);
}

function createCard(newBook) {
	const card = document.createElement("div");
	card.classList.add("card");
	const content = `<div class="title">${newBook.title}</div>
	<div class="author info"><span class="info-type">By:</span> <span>${newBook.author}</span></div>
	<div class="pages info"><span class="info-type">Number of Pages:</span> <span>${newBook.pages}</span></div>
	<div class="language info"><span class="info-type">Language:</span> <span>${newBook.language}</span></div>
	<div class="genre info"><span class="info-type">Genre:</span> <span>${newBook.genre}</span></div>
	<div class="switch info">
		<label for="${newBook.uid}" class="info-type">Read?:</label>
		<input type="checkbox" id="${newBook.uid}" class="toggle" name="isRead">
	</div>
	<button class="button" data-card-uid="${newBook.uid}">Remove</button>`;
	card.innerHTML = content;
	return card;
}

function setCheckboxStatus(newBook) {
	const inputElement = document.querySelector(`input[id = "${newBook.uid}"]`);
	if (inputElement) {
		inputElement.checked = newBook.isRead;
	} else {
		console.error(`No input element was found with id ${newBook.uid}`);
	}
	inputElement.addEventListener("click", () => {
		newBook.toggleCheckboxStatus();
	});
}

function popBookFromLibrary(newBookUid) {
	const indexOfBook = myLibrary.findIndex((book) => book.uid === newBookUid);
	myLibrary.splice(indexOfBook, 1);
	console.log(myLibrary);
}

function addRemoveFunctionality(card, newBookUid) {
	const removeButton = document.querySelector(
		`[data-card-uid = "${newBookUid}"]`
	);
	removeButton.addEventListener("click", () => {
		card.remove();
		popBookFromLibrary(newBookUid);
	});
}

function displayCards(newBook) {
	const cardContainer = document.querySelector("main");
	const card = createCard(newBook);
	cardContainer.appendChild(card);
	setCheckboxStatus(newBook);
	addRemoveFunctionality(card, newBook.uid);
}

addBookBtn.addEventListener("click", () => {
	addDialog.showModal();
});

function getInputs() {
	const inputList = document.querySelectorAll(".form-row input");
	const userInputs = {};
	inputList.forEach((element) => {
		if (element.type === "checkbox") {
			userInputs[element.name] = element.checked;
		} else {
			userInputs[element.name] = element.value;
		}
	});
	return userInputs;
}

submitDialog.addEventListener("click", (event) => {
	event.preventDefault();
	const userInputs = getInputs();
	addBookToLibrary(userInputs);
	document.querySelector("dialog form").reset();
	addDialog.close();

	if (myLibrary.length === 1) {
		toggleQuote();
	}

	displayCards(myLibrary[myLibrary.length - 1]);
});

toggleQuote();
addBookToLibrary({
	title: "Example Book title1",
	author: "Book Author",
	pages: 555,
	genre: "Example genre",
	language: "Example Language",
	isRead: true,
});
addBookToLibrary({
	title: "Example Book title2",
	author: "Book Author",
	pages: 555,
	genre: "Example genre",
	language: "Example Language3",
	isRead: false,
});
addBookToLibrary({
	title: "Example Book title4",
	author: "Book Author",
	pages: 555,
	genre: "Example genre",
	language: "Example Language",
	isRead: true,
});
addBookToLibrary({
	title: "Example Book title4",
	author: "Book Author",
	pages: 555,
	genre: "Example genre",
	language: "Example Language",
	isRead: false,
});

displayCards(myLibrary[0]);
displayCards(myLibrary[1]);
displayCards(myLibrary[2]);
displayCards(myLibrary[3]);
