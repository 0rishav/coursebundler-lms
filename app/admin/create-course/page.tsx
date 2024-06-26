"use client"
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse"
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";

type Props = {}

const page = (props: Props) => {
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
                <CreateCourse/>
            </div>
        </div>
    </div>
  )
}

export default page