import { useModalStore } from "../../stores/modal.store";

const ModalBackground = () => {
  const { isModalOpen, modalContent, closeModal } = useModalStore();

  if (!isModalOpen) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      {modalContent}
    </div>
  );
};

export default ModalBackground;
