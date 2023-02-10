import React, { FC } from "react";

interface ConfirmDialogProps {
  title?: string,
  content?: string,
  confirmLabel?: string,
  onConfirm: () => void,
  onCancel: () => void,
  open: boolean
}

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  if (!props.open) {
    return null;
  }

  return <div style={{
    position: "absolute",
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }}>
    <div style={{border: "1px solid black", backgroundColor: "white", padding: 10}}>
      <p>
        <strong>{props.title}</strong>
      </p>
      <p>
        {props.content}
      </p>
      <div style={{display: "flex" , gap: 10, justifyContent: "flex-end"}}>
        <button onClick={props.onCancel}>Annuler</button>
        <button onClick={props.onConfirm}>{props.confirmLabel}</button>
      </div>
    </div>
  </div>;
}

ConfirmDialog.displayName = "ConfirmDialog";
ConfirmDialog.defaultProps = {
  title: "Confirmation",
  content: "Êtes-vous sur de vouloir confirmer?",
  confirmLabel: "Confirmer"
}