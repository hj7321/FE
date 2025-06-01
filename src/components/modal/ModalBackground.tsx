import { useModalStore } from "../../stores/modal.store";

const ModalBackground = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const modalContent = useModalStore((state) => state.modalContent);
  const isClosable = useModalStore((state) => state.isClosable);
  const closeModal = useModalStore((state) => state.closeModal);
  console.log("🌟ModalBackground 렌더링됨!!🌟");

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => {
        if (isClosable) closeModal();
      }}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      {modalContent}
    </div>
  );
};

export default ModalBackground;
