import { useEffect, useState } from 'react';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';
import api from '../api';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get('/recipes');
        setRecipes(res.data);
      } catch (err) {
        console.error('שגיאה בטעינה', err);
      }
    };
    fetchRecipes();
  }, []);

  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <h2>🛒 מתכונים</h2>
      <RecipeForm onAdd={handleAddRecipe} />
      <RecipeList items={recipes} setItems={setRecipes} onDelete={handleDeleteRecipe} />
    </>
  );

}