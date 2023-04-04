import { useEffect, useRef } from 'react';
import Modal from '../components/Modal';

function CountryCodeModal(props) {
  const { setShowModal } = props;
  const childRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (!childRef?.current?.contains?.(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Modal>
      <div ref={childRef} style={{ height: '100px', backgroundColor: 'yellow' }}>
        TEMP
      </div>
    </Modal>
  );
}

export default CountryCodeModal;
