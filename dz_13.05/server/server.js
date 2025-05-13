const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let books = [
  {
        "id": uuidv4(),
        "title": "1984",
        "description": "Dystopian novel about surveillance and control.",
        "price": 15,
        "author": "George Orwell"
    },
    {
        "id": uuidv4(),
        "title": "Brave New World",
        "description": "A futuristic society shaped by technology and conditioning.",
        "price": 13,
        "author": "Aldous Huxley"
    }
];

let cart = [];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found...' });
  res.json(book);
});

app.get('/cart', (req, res) => {
  res.json(cart);
});

app.post('/cart', (req, res) => {
  const { bookId } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: 'Book not found...' });
  cart.push(book);
  res.status(201).json(book);
});

app.delete('/cart/:id', (req, res) => {
  cart = cart.filter(b => b.id !== req.params.id);
  res.json({ message: 'Book deleted from cart' });
});

app.listen(port, () => {
  console.log(`Book server listening on http://localhost:${port}`);
});