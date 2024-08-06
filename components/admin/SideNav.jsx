import { BarChart, Brush, Layers3, Settings } from 'lucide-react';
import React from 'react';
import { UserButton } from '@clerk/nextjs';

const SideNav = () => {

    const menuList=
    [

        {id:1,name:"Pages" ,icon:Layers3},
        {id:2,name:"Style" ,icon:Brush},
        {id:3,name:"Status" ,icon:BarChart},
        {id:4,name:"Settings" ,icon:Settings},
       
    ]



  return (
   
    <div className='p-4 bg-[#00000052] h-screen'> 
       {menuList.map((menu,index)=>{
        return(

        <div className='p-2 py-4 rounded-lg bg-primary flex items-center justify-center mb-5
        tooltip-info tooltip tooltip-right cursor-pointer' data-tip={menu.name}>
           
            <menu.icon className='text-white text-center'/>
        </div>
        )
       })}
       <div className='fixed bottom-5 px-5'>
        <UserButton/>
       </div>
    </div>
   
  )
}

export default SideNav