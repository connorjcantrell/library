class Book {
    constructor(title, author, description, pages, read) {
        this.title = title
        this.author = author
        this.description = description
        this.pages = pages
        this.read = read
    }
    store() {
        let bookStorage = []
        bookStorage = JSON.parse(localStorage.getItem('books')) || []
        bookStorage.unshift(this)
        localStorage.setItem('books', JSON.stringify(bookStorage))
    }
}

class UI {
    static displayBooks() {
        let books = document.querySelector('.books')
        let storedBooks = JSON.parse(localStorage.getItem('books'))
        storedBooks.forEach(book => {
            let bookDiv = document.createElement('div')
            bookDiv.innerHTML = `
                <div class="title">${book.title}</div>
                <div class="author">by <span class="author-output">${book.author}</span></div>
                <div class="info"><b>Description: </b><br><span class="description-output">${book.description}
                </span></div>
                <div class="info"><b>Pages: </b><span class="pages-output">${book.pages}</span></div>
                <div class="info"><b>Read: </b> <span class="read-output">${book.read}</span></div>
                <button class="remove">Remove</button>
            `
            books.appendChild(bookDiv)
        })
    }
}

// Buttons
const removeBtn = document.querySelectorAll('.remove-btn')
const addBtn = document.querySelector('.add-btn')
const submitBtn = document.querySelector('.submit-btn')
const closeBtn = document.querySelector('.close-btn')

// Show modal
addBtn.addEventListener('click', () => {
    const modal = document.querySelector('.modal')
    openModal(modal)
})

// Hide modal
closeBtn.addEventListener('click', () => {
    const modal = document.querySelector('.modal')
    closeModal(modal)
})

// Form
const authorInput = document.querySelector('#author')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const pagesInput = document.querySelector('#pages')
const readInput = document.querySelector('#read')

// collect input
submitBtn.addEventListener('click', () => {
    const title = titleInput.value
    const author = authorInput.value
    const description = descriptionInput.value
    const pages = pagesInput.value
    const isRead = readInput.checked
    const book = new Book(title, author, description, pages, isRead)
    book.store()
    UI.displayBooks()
})

// removeBtn.addEventListener('click', e => {
//     // TODO: Delete book from library
// })

function openModal(modal) {
    if (modal == null) return 
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return 
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

UI.displayBooks()