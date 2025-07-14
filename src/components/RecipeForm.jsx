import { useState } from 'react';
import api from '../api';

export default function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = async () => {
    if (!title || !desc) return;
    try {
    const res = await api.post('/recipes', { title, description: desc });
    onAdd(res.data);
    setTitle('');
    setDesc('');
    } catch (err) {
      console.error('שגיאה בהוספה',err)
    }
  };

  return (
    <div>
      <h2>🍲 הוסף מתכון</h2>
      <input placeholder="שם מתכון" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea placeholder="תיאור" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <br />
      <button onClick={handleAdd}>➕ הוסף מתכון</button>
      
    </div>
  );

}
