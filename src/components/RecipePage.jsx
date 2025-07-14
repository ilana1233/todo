import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './RecipePage.css'; // אופציונלי, רק אם יש עיצוב

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const confirm = window.confirm('האם ברצונך למחוק את המתכון?');
    if (!confirm) return;

    try {
      await api.delete(`/recipes/${id}`);
      navigate('/');
    } catch (err) {
      console.error('שגיאה במחיקה',err);
    }
  };

  // שליפת מתכון לפי id
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError('שגיאה בטעינת המתכון');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>🔄 טוען מתכון...</div>;
  if (error) return <div>❌ {error}</div>;
  if (!recipe) return <div>❗ המתכון לא נמצא</div>;

  return (
    <div className="recipe-page">
      <h2>📖 {recipe.title}</h2>
      <p>{recipe.description}</p>

       <div className='recipe-buttons'>
       <button onClick={() =>  navigate('/')}>חזרה לרשימה</button>
       <button onClick={handleDelete}>מחק</button>
    </div>
    </div>
   
  );
}

