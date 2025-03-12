const myLibrary = [];

function Book(title, author, pages, genre, isRead) {
	this.uid = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, genre, isRead) {
	const book = new Book(title, author, pages, genre, isRead);
	myLibrary.push(book);
}

function display(myLibrary) {
	for (const book of myLibrary) {
		console.log(book);
	}
}

addBookToLibrary("Operating system", "dheeraj", 21, "programming", "true");
addBookToLibrary("Computer system", "noname", 26, "COmputer", "false");
addBookToLibrary("Atomic system", "aryan", 24, "Chemistry", "false");
addBookToLibrary("Video system", "akash", 20, "Design", "true");

display(myLibrary);
