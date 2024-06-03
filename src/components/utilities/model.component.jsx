import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./modal.component.css";
import { Subject_ShowModal$ } from "../../subjects/modal.behavior-subject";
export default function Modal() {
  const opacityRef = useRef(null);
  const toggleModal = (show) => {
    if (!show) opacityRef.current.classList.remove("modal-open");
    else opacityRef.current.classList.add("modal-open");
  };
  useEffect(() => {
    Subject_ShowModal$.asObservable().subscribe((show) => {
      toggleModal(show);
    });
  }, []);
  return ReactDOM.createPortal(
    <>
      <div className="modal" ref={opacityRef} onClick={toggleModal}>
        <div className="loader"></div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
