 class Book {
    constructor(id, title, author, pages, read) {
        this.id = id
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

// Interact with browser's local storage
class Storage {
    static store(book) {
        let bookStorage = JSON.parse(localStorage.getItem('books')) || []
        bookStorage.unshift(book)
        localStorage.setItem('books', JSON.stringify(bookStorage))
    }  

    // Remove book from local storage
    static remove(id) {
        let storedBooks = JSON.parse(localStorage.getItem('books')) || []
        let filteredBooks = storedBooks.filter(book => `book-${book.id}` !== id)
        localStorage.setItem('books', JSON.stringify(filteredBooks))
    }

    // Get all books from local storage and parse to JS object
    static getBooks() {
        return JSON.parse(localStorage.getItem('books')) || []
    }

    // Create a unique ID for new book
    static createID() {
        let id = 0
        let storedBooks = JSON.parse(localStorage.getItem('books')) || []
        let existingIDs = []
        storedBooks.forEach(book => {
            existingIDs.push(book.id)
        })
        while (existingIDs.includes(id)) {
            id++
        }
        return id
    }

    // Change a book's read status 
    static changeReadStatus(id) {
        let storedBooks = JSON.parse(localStorage.getItem('books')) || []
        storedBooks.forEach(book => {
            if(`read-${book.id}`=== id) {
                book.read = !book.read
            }
        })
        localStorage.setItem('books', JSON.stringify(storedBooks))
    }
}

const modal = document.querySelector('.modal')

// Interact with UI components of the app
class UI {
    static displayBooks() {
        let books = document.querySelector('.books')
        while (books.firstChild) {
            books.removeChild(books.firstChild)
        }

        let storedBooks = JSON.parse(localStorage.getItem('books'))
        if (storedBooks === null) return
        storedBooks.forEach(book => {
            let bookDiv = document.createElement('div')
            bookDiv.setAttribute('class', `book-${book.id}`)
            bookDiv.innerHTML = `
                <div class="title">${book.title}</div>
                <div class="author">by <span class="author-output">${book.author}</span></div>
                <div class="info"><b>Pages: </b><span class="pages-output">${book.pages}</span></div>
                <div class="info"><b>Read: </b> <span class="read-output">${book.read}</span></div>
                <button id="book-${book.id}" class="btn remove-btn">Remove</button>
                <button id="read-${book.id}" class="btn read-btn">Read</button>
            `
            books.appendChild(bookDiv)
        })
    }

    static clearForm() {
        const form = document.querySelector('form');
        form.reset();
    }

    static closeModal() {
        if (modal == null) return 
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    static openModal() {
        if (modal == null) return 
        modal.classList.add('active')
        overlay.classList.add('active')
    }
}

// Buttons
const removeBtn = document.querySelectorAll('.remove-btn')
const addBtn = document.querySelector('.add-btn')
const submitBtn = document.querySelector('.submit-btn')
const closeBtn = document.querySelector('.close-btn')

// Show modal
addBtn.addEventListener('click', () => {
    UI.openModal(modal)
})

// Hide modal
closeBtn.addEventListener('click', () => {
    UI.closeModal(modal)
})

// Form
const authorInput = document.querySelector('#author')
const titleInput = document.querySelector('#title')
const pagesInput = document.querySelector('#pages')
const readInput = document.querySelector('#read')

// collect input
submitBtn.addEventListener('click', () => {
    const title = titleInput.value
    const author = authorInput.value
    const pages = pagesInput.value
    const isRead = readInput.checked
    let id = Storage.createID()
    const book = new Book(id, title, author, pages, isRead)
    Storage.store(book)
    UI.displayBooks()
    UI.clearForm()
    UI.closeModal()
})

UI.displayBooks()

const bodyEl = document.querySelector('body')

bodyEl.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
        Storage.remove(e.target.id)
        UI.displayBooks()
    }
    if (e.target.classList.contains('read-btn')) {
        Storage.changeReadStatus(e.target.id)
        UI.displayBooks()
    }
})