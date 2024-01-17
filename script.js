// Mock data for initial book library
const initialLibrary = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic', borrowed: false },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', borrowed: false },
    { title: '1984', author: 'George Orwell', category: 'Dystopian', borrowed: false },
];

// Vue.js app
const app = new Vue({
    el: '#app',
    data: {
        library: [],
        newBook: { title: '', author: '', category: '' },
    },
    mounted() {
        // Initialize the library from localStorage or use the mock data
        this.library = JSON.parse(localStorage.getItem('library')) || initialLibrary;
    },
    methods: {
        addBook() {
            if (this.newBook.title && this.newBook.author) {
                this.library.push({ ...this.newBook, borrowed: false });
                this.saveLibrary();
                this.clearForm();
            } else {
                alert('Title and Author are required fields.');
            }
        },
        borrowBook(index) {
            if (!this.library[index].borrowed) {
                this.library[index].borrowed = true;
                this.saveLibrary();
            } else {
                alert('This book is already borrowed.');
            }
        },
        returnBook(index) {
            if (this.library[index].borrowed) {
                this.library[index].borrowed = false;
                this.saveLibrary();
            } else {
                alert('This book is not currently borrowed.');
            }
        },
        saveLibrary() {
            localStorage.setItem('library', JSON.stringify(this.library));
        },
        clearForm() {
            this.newBook = { title: '', author: '', category: '' };
        },
    },
    template: `
        <div>
            <h1>My Book Library</h1>

            <form @submit.prevent="addBook">
                <label for="title">Title:</label>
                <input v-model="newBook.title" type="text" id="title" required>

                <label for="author">Author:</label>
                <input v-model="newBook.author" type="text" id="author" required>

                <label for="category">Category:</label>
                <input v-model="newBook.category" type="text" id="category">

                <button type="submit">Add Book</button>
            </form>

            <div>
                <h2>Book List</h2>
                <div v-for="(book, index) in library" :key="index" class="book-item">
                    <strong>{{ book.title }}</strong> by {{ book.author }}
                    (Category: {{ book.category || 'N/A' }})
                    <button @click="borrowBook(index)" :disabled="book.borrowed">Borrow</button>
                    <button @click="returnBook(index)" :disabled="!book.borrowed">Return</button>
                </div>
            </div>
        </div>
    `,
});
