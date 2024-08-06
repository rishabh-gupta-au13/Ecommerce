"use client"
import React, { useEffect } from 'react'
import { db } from '../../utils'
import { userInfo } from '../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'




function Provider({children}) {

    const {user}= useUser();


    useEffect(()=>{

        user && getUserDetails();

    },[user])


    const getUserDetails=async ()=>{
        const results=await db.select().from(userInfo).where(eq(userInfo.email,user?.primaryEmailAddress.emailAddress));

        console.log(results)
    }
  return (
    <div>


        {children}
    </div>
  )
}

export default Provider