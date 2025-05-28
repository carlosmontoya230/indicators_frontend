import { ModalProps } from "./modal.interface";
import CloseIcon from "@mui/icons-material/Close";
import "./modal.css";

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
