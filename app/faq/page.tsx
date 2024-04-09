"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ/FAQ";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  return (
    <div className="min-h-screen">
      <Heading
        title="FAQ-CourseBundler"
        description="CourseBubler is a learning management system for programmers"
        keywords="programming,mern,redux"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <FAQ/>
      <Footer />
    </div>
  );
};

export default Page;
