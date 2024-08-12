"use client";

import React, { useContext, useEffect, useState } from "react";
import { Camera, Link2, MapPin } from "lucide-react";
import { db } from "../../utils";
import { toast } from "react-toastify";
import { userInfo } from "../../utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { UserDetailsContext } from "../../app/_context/UserDetailsContext";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/fireBaseConfig";

function BasicsDetails() {
  let timeOutId;
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailsContext);
  // console.log(userDetail,"this is user")
  const [selectedOption, setSelectedOption] = useState();
  const [userProfileImage, setProfileImage] = useState();

  useEffect(() => {
    userDetail && setProfileImage(userDetail?.profileImage);
  }, [userDetail]);

  const onInputChangeEvent = (event, fieldName) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(async () => {
      console.log("Input", event.target.value);
      const result = await db
        .update(userInfo)
        .set({
          [fieldName]: event.target.value,
        })
        .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

      if (result) {
        toast.success("Saved!", {
          position: "top-right",
        });
      } else {
        toast.error("Error!", {
          position: "top-right",
        });
      }
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // console.log(file);

    const fileName = Date.now().toString() + "." + file.type.split("/")[1];
    const storageRef = ref(storage, fileName);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then(async (snapshot) => {
      const result = await db
        .update(userInfo)
        .set({
          profileImage: fileName + "?alt=media",
        })
        .where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

      if (result) {
        toast.success("Saved!", {
          position: "top-right",
        });
        setProfileImage(fileName);
      } else {
        toast.error("Error!", {
          position: "top-right",
        });
      }

      // console.log("Uploaded a blob or file!");
    });
  };
  return (
    <div className="p-7 rounded-lg bg-gray-800 my-7">
      <div className="flex gap-6 items-center">
        <label htmlFor="file-input">
          <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full cursor-pointer" />
        </label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileUpload}
          accept="image/png, image/gif, image/jpeg"
          style={{ display: "none" }}
        />

        <input
          type="text"
          placeholder="User Name"
          defaultValue={userDetail?.name}
          className="input w-full"
          onChange={(event) => {
            onInputChangeEvent(event, "name");
          }}
        />
      </div>

      <textarea
        className="textarea textarea-bordered mt-3 w-full"
        placeholder="Start Writing About Yourself"
        defaultValue={userDetail?.bio}
        onChange={(event) => {
          onInputChangeEvent(event, "bio");
        }}
      ></textarea>

      <div>
        <div className="flex gap-3 mt-6">
          <MapPin
            className={`h-14 w-12 p-3 rounded-md hover:bg-gray-600 text-blue-500 ${
              selectedOption === "location" && "bg-gray-600"
            }`}
            onClick={() => setSelectedOption("location")}
          />
          <Link2
            className={`h-14 w-12 p-3 rounded-md hover:bg-gray-600 text-yellow-500 ${
              selectedOption === "Url" && "bg-gray-600"
            }`}
            onClick={() => setSelectedOption("Url")}
          />
        </div>

        {selectedOption === "location" ? (
          <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <MapPin />
              <input
                type="text"
                className="grow"
                placeholder="Location"
                key={1}
                defaultValue={userDetail?.location}
                onChange={(event) => {
                  onInputChangeEvent(event, "location");
                }}
              />
            </label>
          </div>
        ) : selectedOption === "Url" ? (
          <div className="mt-2">
            <label className="input input-bordered flex items-center gap-2">
              <Link2 />
              <input
                type="text"
                className="grow"
                placeholder="Url"
                key={2}
                defaultValue={userDetail?.link}
                onChange={(event) => {
                  onInputChangeEvent(event, "link");
                }}
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BasicsDetails;
