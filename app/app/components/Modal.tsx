import Image from "next/image";

interface ModalProps {
  children: React.ReactNode;
  close: () => void;
  changed?: boolean;
}

function Modal({ children, close }: ModalProps) {
  return (
    <main
      onClick={() => close()}
      style={{ background: "rgba(0, 0, 0, 0.5)", pointerEvents: "all" }}
      className="fixed top-0 left-0 z-40 w-screen h-screen grid place-items-center"
    >
      <div
        style={{ pointerEvents: "all" }}
        className="bg-gray-800 border border-gray-600 border-x-0 w-full sm:max-w-[450px] sm:border-x-1 sm:rounded-md p-4"
      >
        {children}
      </div>
    </main>
  );
}

export default Modal;
