"use client"
import React,{FC, useState} from 'react'
import Protected from '../hooks/useProtected'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import  Profile from "../components/Profile/Profile"
import { useSelector } from 'react-redux'
import Footer from '../components/Footer'

type Props = {}

const Page:FC<Props> = (props) => {


    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route,setRoute] = useState("Login");
    const {user} = useSelector((state:any)=>state.auth);
  return (
    <div className='min-h-screen'>
        <Protected>
        <Heading
        title={`${user?.name} profile`}
        description="CourseBundler is a platform for students."
        keywords="programming,machine learning"
      />
      <Header open={open} activeItem={activeItem} setOpen={setOpen} setRoute={setRoute} route={route}/>
      <Profile user={user}/>
      <Footer/>
        </Protected>
    </div>
  )
}

export default Page