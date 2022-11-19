"use client";
import Image from "next/image";

import { User } from "@prisma/client";
import { useContext, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { userContext } from "../../ApplicationContext";

function DashboardProfilePage() {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const user = useContext(userContext);

  return (
    <>
      <EditProfileModal
        showEditProfileModal={showEditProfileModal}
        setShowEditProfileModal={setShowEditProfileModal}
      />
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
