'use client'
import { db } from "../../utils/index";
import { userInfo } from "../../utils/schema";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";

const Create = (userId) => {
  const [userName, setUserName] = useState("");

  const { isLoaded, isSignedIn, user } = useUser();

  console.log(user?.fullName,"this is userrrr");

  console.log(user?.primaryEmailAddress.emailAddress,"this is email")

  const router = useRouter();
  const onCreateBtnClick = async () => {
    if (userName.length > 10) {
      toast.error("Error Notification !", {
        position: "top-left",
      });

      console.log("No more than 10 character");
      return;
    }

    const result = await db.insert(userInfo).values({
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userName: userName.replace(" ", ""),
      userId:userId.userId
    });

    if (result) {
      toast.success("User Created Succesfully", {
        position: "top-right",
      });
      router.replace("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 border rounded-lg flex flex-col">
        <h2 className="font-bold text-2xl py-5 text-center">
          Create Portfolio UserName
        </h2>
        <label className="py-2">Add UserName for your portfolio</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(event) => setUserName(event.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button
          onClick={() => onCreateBtnClick()}
          disabled={!userName}
          className="btn btn-primary my-2"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Create;
