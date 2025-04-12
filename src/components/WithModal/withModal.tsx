import React, { useState, ComponentType } from "react";
import ModalPortal from "../Modal/ModalPortal";

interface WithModalProps {
  openModal?: () => void;
}

const withModal = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return function WithModal(props: P) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
      <>
        <WrappedComponent {...props} openModal={openModal} />
        {isModalOpen && (
          <ModalPortal closeModal={closeModal}>
            <div>
              <h2>Detalles del Doctor</h2>
              <p>Información adicional del doctor...</p>
            </div>
          </ModalPortal>
        )}
      </>
    );
  };
};

export default withModal;