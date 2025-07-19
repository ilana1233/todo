const express = require('express');
const router = express.Router();
const item = require('../models/item');

let recipes = []; // שמירת מתכונים בזיכרון

// ✅ שליפת כל המתכונים
router.get('/items', (req, res) => {
  res.json(recipes);
});

// ✅ שליפת מתכון לפי ID
router.get('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return res.status(404).json({ message: 'מתכון לא נמצא' });
  }
  res.json(recipe);
});

// ✅ הוספת מתכון חדש
router.post('/recipes/:id', (req, res) => {
  const { title, description } = req.body;
  const newRecipe = {
    id: Date.now(),
    title,
    description,
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// ✅ עדכון מתכון לפי ID
router.put('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'מתכון לא נמצא' });
  }
  const updatedRecipe = { ...recipes[index], title, description };
  recipes[index] = updatedRecipe;
  res.json(updatedRecipe);
});

// ✅ מחיקת מתכון לפי ID
router.delete('/recipes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'מתכון לא נמצא' });
  }
  recipes.splice(index, 1);
  res.status(204).end();
});

module.exports = router;

