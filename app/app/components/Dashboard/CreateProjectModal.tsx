"use client";
import { useContext, useRef, useState } from "react";
import { userContext } from "../../ApplicationContext";
import Modal from "../Modal";

interface DashboardEditProfileModalProps {
  showEditProfileModal: boolean;
  setShowEditProfileModal: (showEditProfileModal: boolean) => void;
}

function DashboardEditProfileModal({
  setShowEditProfileModal,
  showEditProfileModal,
}: DashboardEditProfileModalProps) {
  const user = useContext(userContext);
  const [editProfileModalChanges, setEditProfileModalChanges] = useState(false);
  const [profilePreviewURL, setProfilePreviewURL] = useState(
    user.profileImage || "/images/app/profile.png"
  );
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = () => {};

  return (
    <>
      {showEditProfileModal && (
        <Modal
          changed={editProfileModalChanges}
          close={() => setShowEditProfileModal(false)}
        >
          <h1 className="text-xl mb-2">Edit Profile</h1>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div
              style={{
                backgroundImage: `url(${profilePreviewURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-full h-[100px] w-[100px]"
            />
            <input
              onInput={upload}
              ref={fileInputRef}
              type="file"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-700 border border-gray-600 p-2 rounded-md flex items-center gap-2"
            >
              <i className="bx bxs-image-add"></i>
              Upload Image
            </button>
          </div>
          <p className="font-medium">Your name</p>
          <input
            ref={nameInputRef}
            onInput={() => setEditProfileModalChanges(true)}
            type="text"
            className="bg-gray-100 w-full mb-2 border border-gray-200 text-gray-500 p-2 rounded-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditProfileModal(false)}
              className="bg-gray-700 border border-gray-600 p-2 rounded-md flex items-center gap-2 flex-1 justify-center"
            >
              Cancel
            </button>
            <button
              disabled={!editProfileModalChanges}
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
