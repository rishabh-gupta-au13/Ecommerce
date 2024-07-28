"use client"
import { db } from '@/utils/index';
import { userInfo } from '@utils/schema'; 
 // Adjust the path based on your directory structure

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Admin() {

    const user=useUser();
    const router=useRouter();


    useEffect(()=>{
       user && checkUser()
    },[user])


    const checkUser=async ()=>{
        const result=await db.select().from(userInfo)
        .where(eq(userInfo.email.user?.primaryEmailAddress?.emailAddress));
        console.log(result,"this is result")


        if(result?.length===0){
            router.replace('/create')

        }
    }



  return (
    <div>Admin</div>
  )
}

export default Admin