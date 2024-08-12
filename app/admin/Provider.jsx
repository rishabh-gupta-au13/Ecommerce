"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../utils'
import { userInfo } from '../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import { UserDetailsContext } from '../_context/UserDetailsContext'




function Provider({children}) {

    const {user}= useUser();

    const [userDetail,setUserDetail]=useState([]);


    useEffect(()=>{

        user && getUserDetails();

    },[user])


    const getUserDetails=async ()=>{
        const results=await db.select().from(userInfo).where(eq(userInfo.email,user?.primaryEmailAddress.emailAddress));
        setUserDetail(results[0])
    }
  return (
    <UserDetailsContext.Provider value={{userDetail,setUserDetail}}>
    <div>


        {children}
    </div>
    </UserDetailsContext.Provider>
  )
}

export default Provider