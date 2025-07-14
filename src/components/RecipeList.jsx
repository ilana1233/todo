import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./RecipeList.css";

export default function RecipeList({ items = [], setItems }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // התחלת עריכה
  const handleEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditDesc(item.description); // תיקון פה!
  };

  // שמירת עריכה
  const handleSave = async (id) => {
    try {
      const res = await api.put(`/recipes/${id}`, {
        title: editTitle,
        description: editDesc
      });
      const updated = res.data;
      setItems((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      setEditId(null);
      setEditTitle('');
      setEditDesc('');
    } catch (err) {
      console.log("שגיאה בשמירה", err);
    }
  };

  return (
    <div>
      <h3>📋 רשימת מתכונים</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <div className="edit-form">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <button onClick={() => handleSave(item.id)}>💾 שמור</button>
              </div>
            ) : (
              <>
                <Link to={`/recipes/${item.id}`} className="recipe-link">
                  {item.title}
                </Link>
                <button onClick={() => handleEdit(item)}>✏️ ערוך</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

