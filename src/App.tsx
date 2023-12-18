import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { Modal } from "./Components/Modal";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [itemIndexToDelete, setItemIndexToDelete] = useState(null);
  const [itemIndexToEdit, setItemIndexToEdit] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [isAscendingOrder, setIsAscendingOrder] = useState(true);
  const [doneItems, setDoneItems] = useState([]);

  const changeOrder = () => {
    const sortedItems = [...items];
    if (isAscendingOrder) {
      sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedItems.sort((a, b) => b.title.localeCompare(a.title));
    }

    const reorderedItems = sortedItems.map((item, index) => {
      const newItem = { ...item, index };
      return newItem;
    });

    setItems(reorderedItems);
    setIsAscendingOrder(!isAscendingOrder);
  };

  const moveToDone = (index) => {
    const itemToMove = items[index];
    if (!doneItems.includes(itemToMove)) {
      setDoneItems([...doneItems, itemToMove]);
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const addItem = () => {
    if (title) {
      const newItem = {
        title: title,
      };
      setItems([...items, newItem]);
      setTitle("");
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
    if (itemIndexToEdit !== null && editedTitle) {
      const updatedItems = [...items];
      updatedItems[itemIndexToEdit] = {
        title: editedTitle,
      };
      setItems(updatedItems);
      setItemIndexToEdit(null);
      setEditedTitle("");
    }
  };

  const closeModal = () => {
    setItemIndexToDelete(null);
    setItemIndexToEdit(null);
  };

  useEffect(() => {
    if (itemIndexToEdit !== null) {
      const itemToEdit = items[itemIndexToEdit];
      setEditedTitle(itemToEdit.title || "");
    }
  }, [itemIndexToEdit, items]);

  return (
    <>
      <section className="main">
        <div className="main-list">
          <h1 className="main-title">Shopping List</h1>
          <div className="main-div">
            <form
              action=""
              className="main-form"
              onSubmit={(e) => {
                e.preventDefault();
                addItem();
              }}
            >
              <input
                type="text"
                className="main-input"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input type="submit" className="main-btn" value="Add" />
            </form>
            <button className="main-order " onClick={changeOrder}>
              <FontAwesomeIcon icon={faChevronUp} />
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <section className="main-lists">
            <ul className="main-ul">
              <h1 className="main-sub">Tasks to do</h1>
              {items.map((item, index) => (
                <li className="main-li" key={index}>
                  <p className="li-order" onClick={() => changeOrder(index)}>
                    {index + 1}
                  </p>

                  <div>
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
                      className="main-donebtn"
                      onClick={() => moveToDone(index)}
                    >
                      Done
                    </button>
                    <button
                      className="main-close"
                      onClick={() => setItemIndexToDelete(index)}
                    >
                      X
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="line"></div>
            <ul className="main-ul">
              <h1 className="main-sub">Done tasks</h1>
              {doneItems.map((item, index) => (
                <li className="main-lidone" key={index}>
                  <p className="li-order">{index + 1}</p>
                  <div>
                    <h3 className="main-name">{item.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </section>
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
          <form
            action=""
            className="modal-edit"
            onSubmit={(e) => {
              e.preventDefault();
              editItem();
            }}
          >
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Edit title"
              className="edit-input"
              required
            />

            <input type="submit" className="edit-save" value="Save" />
            <button className="edit-btn" onClick={closeModal}>
              Х
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default App;
