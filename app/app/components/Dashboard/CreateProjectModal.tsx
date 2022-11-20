"use client";
import { useRef, useState } from "react";
import Modal from "../Modal";

interface DashboardEditProfileModalProps {
  createProjectModalOpen: boolean;
  setCreateProjectModalOpen: (createProjectModalOpen: boolean) => void;
}

function DashboardEditProfileModal({
  setCreateProjectModalOpen,
  createProjectModalOpen,
}: DashboardEditProfileModalProps) {
  const [modalChanges, setModalChanges] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const submitProjectCreation = async () => {
    const response = await fetch("/api/project/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInputRef.current?.value,
        description: descriptionInputRef.current?.value,
      }),
    });

    const data = await response.json();
    if (!data.success) {
      alert(data.message);
      return;
    }

    console.log(data);
  };

  return (
    <>
      {createProjectModalOpen && (
        <Modal
          changed={modalChanges}
          close={() => setCreateProjectModalOpen(false)}
        >
          <h1 className="text-xl mb-2">Create Project</h1>
          <p className="font-medium">Project name</p>
          <input
            ref={nameInputRef}
            onInput={() => setModalChanges(true)}
            type="text"
            className="bg-gray-100 w-full mb-2 border border-gray-200 text-gray-500 p-2 rounded-sm"
          />
          <p className="font-medium">Project description</p>
          <input
            ref={descriptionInputRef}
            onInput={() => setModalChanges(true)}
            type="text"
            className="bg-gray-100 w-full mb-2 border border-gray-200 text-gray-500 p-2 rounded-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setCreateProjectModalOpen(false)}
              className="bg-gray-700 border border-gray-600 p-2 rounded-md flex items-center gap-2 flex-1 justify-center"
            >
              Cancel
            </button>
            <button
              disabled={!modalChanges}
              onClick={submitProjectCreation}
              className="bg-blue-600 border border-blue-500 p-2 rounded-md flex items-center gap-2 flex-1 justify-center"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default DashboardEditProfileModal;
