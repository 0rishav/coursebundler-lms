"use client"
import Heading from '../../utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import DashboardHeader from '../../components/Admin/DashboardHeader'
import UserAnalytics from "../../components/Admin/Analytics/UserAnalytics"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
   
    <Heading
      title="CourseBundler-Admin"
      description="CourseBundler is a platform for students to learn and get help from teachers"
      keywords="programming,mern,redux,machinelearning"
    />
    <div className="flex h-screen">
      <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar/>
      </div>
      <div className="w-[85%]">
     <DashboardHeader/>
      <UserAnalytics isDashboard={true}/>
      </div>
    </div>
   
  </div>
  )
}

export default page