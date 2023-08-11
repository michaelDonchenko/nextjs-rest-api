"use client";

import React from "react";

interface Props {
  id: string;
  body: React.ReactNode;
}

const Modal = ({id, body}: Props) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <button
          onClick={() => window.createModal.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {body}
      </div>
    </dialog>
  );
};

export default Modal;
