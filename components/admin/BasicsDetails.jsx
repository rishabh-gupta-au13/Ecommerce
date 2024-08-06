"use client"

import React from "react";
import { Camera } from "lucide-react";
import { db } from "../../utils";
import { toast } from "react-toastify";
import { userInfo } from "../../utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";


function BasicsDetails() {
    let timeOutId
    const {user}=useUser();
    console.log(user,"this is userrrrmmmmmmmm")



    const onInputChangeEvent=(event,fieldName)=>{
        clearTimeout(timeOutId)
        timeOutId=setTimeout(async ()=>{
            console.log("Input",event.target.value);
            const result =await db.update(userInfo).set({
                [fieldName]:event.target.value
            }).where(eq(userInfo.email,user?.primaryEmailAddress.emailAddress))

            if(result){
                toast.success('Saved!',{
                    position:'top-right'
                })
            }else{

                toast.error('Error!',{
                    position:'top-right'
                })

            }

        },1000)

    }
  return (
    <div className="p-7 rounded-lg bg-gray-800 my-7">
      <div className="flex gap-6 items-center">
        <Camera className="p-3 h-12 w-12 bg-gray-500 rounded-full" />

        <input type="text" placeholder="User Name" className="input w-full"   onChange={(event)=>{
            onInputChangeEvent(event,'name')

        }} />
      </div>

      <textarea
        className="textarea textarea-bordered mt-3 w-full"
        placeholder="Start Writing About Yourself"
        onChange={(event)=>{
            onInputChangeEvent(event,'bio')

        }}
        
      ></textarea>
    </div>
  );
}

export default BasicsDetails;
