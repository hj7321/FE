import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (element: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,
  modalContent: null,
  openModal: (element: React.ReactNode) =>
    set({ isModalOpen: true, modalContent: element }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
}));
