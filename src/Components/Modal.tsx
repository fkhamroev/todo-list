import "./Modal.css";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
