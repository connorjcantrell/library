// class Book {
//     constructor(title, author, description, pages, read) {
//         this.title = title
//         this.author = author
//         this.description = description
//         this.pages = pages
//         this.read = read
//     }
    
//     store() {
//     }

//     remove() {

//     }
// }

const removeBtn = document.querySelectorAll('.remove-btn')
const addBtn = document.querySelector('.add-btn')
const submitBtn = document.querySelector('.submit-btn')
const closeBtn = document.querySelector('.close-btn')

// Form
const authorEl = document.querySelector('#author')
const titleEl = document.querySelector('#title')
const descriptionEl = document.querySelector('#description')
const pagesEl = document.querySelector('#pages')
const readEl = document.querySelector('#read')

let books = []

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

// collect input
submitBtn.addEventListener('click', () => {
    let book = {
        title : titleEl.value,
        author : authorEl.value,
        description : descriptionEl.value,
        pages : pagesEl.value,
        isRead : readEl.value
    }
    books.unshift(book)
    console.log(book)
})

// removeBtn.addEventListener('click', () => {
//     // Delete book from library
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