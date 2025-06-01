import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  isClosable: boolean;
  openModal: (element: React.ReactNode, closable?: boolean) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,
  modalContent: null,
  isClosable: true,
  openModal: (element: React.ReactNode, closable = true) =>
    set({ isModalOpen: true, modalContent: element, isClosable: closable }),
  closeModal: () =>
    set({ isModalOpen: false, modalContent: null, isClosable: true }),
}));
