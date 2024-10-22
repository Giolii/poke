import React from "react";
import "../styles/Modal.css";

export function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Stop propagation to prevent closing modal when clicking inside */}
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>
          <img src="/close.png" />
        </button>
      </div>
    </div>
  );
}
