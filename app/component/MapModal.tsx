import { motion } from 'framer-motion';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import Modal from 'react-modal';

const customStyles = {
  content: {
    height: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const MapModal = (
  props: React.PropsWithChildren<{
    modalIsOpen: boolean;
    center: { lat: number; lng: number };
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }>
) => {
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    props.setIsOpen(false);
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        <GoogleMap
          center={props.center}
          mapContainerStyle={{ width: '100rem', height: '100rem' }}
          zoom={15}
        >
          <MarkerF position={props.center} />
        </GoogleMap>
      </motion.div>
    </Modal>
  );
};
export default MapModal;
