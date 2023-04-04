import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal(props) {
  const { children } = props;

  const modalRootRef = useRef(document.getElementById('parent-phone'));
  const modalRef = useRef(document.createElement('div'));

  const currentRootRef = modalRootRef.current;

  useEffect(() => {
    if (currentRootRef) {
      currentRootRef.appendChild(modalRef.current);
    }

    return () => {
      if (currentRootRef) {
        currentRootRef.removeChild(modalRef.current);
      }
    };
  }, []);

  return createPortal(children, modalRef.current);
}

export default Modal;
