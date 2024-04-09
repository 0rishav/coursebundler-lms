"use client"
import React, { FC } from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse"

type Props = {}

const Page:FC<Props> = ({params}:any) => {
    const id = params?.id;
  return (
    <div>
        <Heading 
         title="CourseBundler - Admin"
         description="CourseBundler is a platform for students."
         keywords="programming,machine learning"
        />
        <div className="flex">
            <div className='1500px:w-[16%] w-1/5'>
                <AdminSidebar/>
            </div>
            <div className='w-[85%]'>
                <DashboardHeader/>
                {/* <CreateCourse/> */}
                <EditCourse id={id}/>
            </div>
        </div>
    </div>
  )
}

export default Page