import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

  const addItem = () => {
    if (title && quantity) {
      const newItem = {
        title: title,
        quantity: quantity,
      };
      setItems([...items, newItem]);
      setTitle("");
      setQuantity("");
    }
  };

  const removeItem = (index) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (shouldDelete) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  return (
    <>
      <section className="main">
        <div className="main-list">
          <h1 className="main-title">Shopping List</h1>
          <div className="main-div">
            <input
              type="text"
              className="main-input"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              className="main-num"
              placeholder="14"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button className="main-btn" onClick={addItem}>
              Add
            </button>
          </div>
          <ul className="main-ul">
            {items.map((item, index) => (
              <li className="main-li" key={index}>
                <div>
                  <div className="main-number">{item.quantity}</div>
                  <h3 className="main-name">{item.title}</h3>
                </div>
                <button
                  className="main-close"
                  onClick={() => removeItem(index)}
                >
                  <img src="../src/assets/svg/Vector.svg" alt="" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default App;
