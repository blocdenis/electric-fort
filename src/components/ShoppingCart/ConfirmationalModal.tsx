import React, { useEffect, useRef, RefObject } from 'react';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  buttonRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current && modalRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      modalRef.current.style.top = `${buttonRect.top + window.scrollY}px`;
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="modal">
      <div className="modal-content">
        <p>Видалити товар з кошика? </p>
        <div className="modal-buttons">
          <button onClick={onClose}>Ні</button>
          <button onClick={onConfirm}>Так</button>
        </div>
      </div>
      <style jsx>{`
        .modal {
          position: absolute;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .modal-buttons {
          display: flex;
          margin-top: 20px;
          gap: 32px;
        }
        .modal-buttons button {
          border: none;
          border-radius: 5px;
          cursor: pointer;
          background-color: #ffe500;
          color: #000;
          font: $regular18;
          padding: 4px 32px 4px 32px;
        }
        /* .modal-buttons button:first-child {
          background-color: #f44336;
          color: white;
        }
        .modal-buttons button:last-child {
          background-color: #ccc;
        } */
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
