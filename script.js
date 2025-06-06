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

class Book {
	uid = crypto.randomUUID();
	constructor({ title, author, pages, language, genre, isRead }) {
		this.title = Book.capitalize(title);
		this.author = Book.capitalize(author);
		this.pages = pages;
		this.language = Book.capitalize(language);
		this.genre = Book.capitalize(genre);
		this.isRead = isRead;
	}

	static capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	toggleCheckboxStatus() {
		this.isRead = !this.isRead;
	}
}

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
	if (myLibrary.length === 0) {
		toggleQuote();
	}
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
	const form = document.querySelector("dialog > form");
	if (!form.reportValidity()) {
		return;
	}
	const userInputs = getInputs();
	addBookToLibrary(userInputs);
	document.querySelector("dialog form").reset();

	if (myLibrary.length === 1) {
		toggleQuote();
	}
	addDialog.close();

	displayCards(myLibrary[myLibrary.length - 1]);
});

addBookToLibrary({
	title: "Example Book Title",
	author: "Book Author",
	pages: 842,
	genre: "Example genre",
	language: "Example Language",
	isRead: true,
});

displayCards(myLibrary[0]);
