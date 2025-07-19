const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./Routes/recipeRoutes');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT =  process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to mongodb"))
.catch((err) => console.error("Mongodb connection error", err));

const app = express();
app.use(cors());
app.use(express.json());


let items = [
  { id: 1, text: 'לחם' },
  { id: 2, text: 'חלב' },
];

let recipe = [];



// POST new item
app.post('/api/items', (req, res) => {
  const newItem = {
    id: Date.now(),
    text: req.body.text,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(item => item.id !== id);
  res.status(204).end();
});

app.use('/api', recipeRoutes);

app.use(express.static(path.join(__dirname,'../dist/shopping-client')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../dist/shopping-client','index.html'));
});


app.listen(PORT, () => 
  console.log(`Server running on  port http://localhost:${PORT}`));


