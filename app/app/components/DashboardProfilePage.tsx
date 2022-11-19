import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { User } from "@prisma/client";

interface DashboardProfilePageProps {
  user: User;
}

function DashboardProfilePage({ user }: DashboardProfilePageProps) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileModalChanges, setEditProfileModalChanges] = useState(false);
  const [profilePreviewURL, setProfilePreviewURL] = useState(
    user.profileImage || "/images/app/profile.png"
  );
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
      setEditProfileModalChanges(true);
    }
  };

  return (
    <>
      {showEditProfileModal && (
        <Modal
          changed={editProfileModalChanges}
          close={() => setShowEditProfileModal(false)}
        >
          <h1 className="text-xl mb-2">Edit Profile</h1>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="rounded-full grid items-center overflow-hidden object-cover h-[100px] w-[100px]">
              <Image
                src={profilePreviewURL}
                alt="profile"
                width={100}
                height={100}
              />
            </div>
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
      <div className="flex items-center gap-4 border border-gray-600 p-4 border-x-0 border-t-0">
        <div className="rounded-full overflow-hidden">
          <Image
            width={150}
            height={150}
            src={user.profileImage || "/images/app/profile.png"}
            alt="profile"
          />
        </div>
        <div className="h-full gap-2 flex flex-col justify-center">
          <h1 className="text-3xl capitalize">{user.name || "anonymous"}</h1>
          <p>joined x days ago</p>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="bg-blue-600 border-blue-500 rounded-md p-2 flex gap-2 items-center justify-center"
          >
            <i className="bx bxs-edit"></i>
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default DashboardProfilePage;
