"use client"
import DashboardHero from '../../components/Admin/DashboardHero'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import EditCategories from "../../components/Admin/Customization/EditCategories"

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
    <AdminProtected>
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
      <DashboardHero/>
       <EditCategories/>
      </div>
    </div>
    </AdminProtected>
  </div>
  )
}

export default Page