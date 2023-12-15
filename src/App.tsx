import React, { useState } from "react";
import "./App.css";
import { Modal } from "./Components/Modal";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemIndexToDelete, setItemIndexToDelete] = useState(null);
  const [itemIndexToEdit, setItemIndexToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedQuantity, setEditedQuantity] = useState("");

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

  const removeItem = () => {
    if (itemIndexToDelete !== null) {
      const updatedItems = [...items];
      updatedItems.splice(itemIndexToDelete, 1);
      setItems(updatedItems);
      setItemIndexToDelete(null);
    }
  };

  const editItem = () => {
    if (itemIndexToEdit !== null && editedTitle && editedQuantity) {
      const updatedItems = [...items];
      updatedItems[itemIndexToEdit] = {
        title: editedTitle,
        quantity: editedQuantity,
      };
      setItems(updatedItems);
      setItemIndexToEdit(null);
      setEditedTitle("");
      setEditedQuantity("");
    }
  };

  const closeModal = () => {
    setItemIndexToDelete(null);
    setItemIndexToEdit(null);
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
                <div className="main-btns">
                  <button
                    className="main-edit"
                    onClick={() => setItemIndexToEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="main-close"
                    onClick={() => setItemIndexToDelete(index)}
                  >
                    {/* <img src="../src/assets/svg/Vector.svg" alt="" /> */}
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Modal active={itemIndexToDelete !== null} setActive={closeModal}>
        <div className="modal-question">
          <h3 className="modal-question">Are you sure to delete?</h3>
          <div className="modal-desc">
            If you delete this, you will not be able to restore this data.
          </div>
          <div className="modal-btns">
            <button className="modal-btn" onClick={removeItem}>
              Yes
            </button>
            <button className="modal-btn" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </Modal>
      <Modal active={itemIndexToEdit !== null} setActive={closeModal}>
        <div className="modal-question">
          <h3 className="modal-question">Enter data you want edit</h3>
          <div className="modal-edit">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit title"
              className="edit-input"
            />
            <input
              type="number"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
              placeholder="Edit quantity"
              className="edit-input"
            />
            <button className="edit-save" onClick={editItem}>
              Save
            </button>
            <button className="edit-btn" onClick={closeModal}>
              <img
                src="../src/assets/svg/Vector.svg"
                alt=""
                className="edit-close"
              />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
