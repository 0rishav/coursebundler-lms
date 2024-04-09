import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">CourseBundler?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Are You Ready to take your programming skills to the next level? Look
          no further than CourseBundler, the premier programming community
          dedicated to helping new programmers achieve their goals and reach
          their full potential.
          <br />
          <br />
          As the founder and CEO of CourseBundler, I Know firsthand Challanges
          that come with learning and growing in the programming
          industry.Thats'why I created CourseBundler to provide new programmers
          with the resources and support they need to succeed.
          <br />
          <br />
          Our Websites is a treasure trove of informative videos on everything
          from programming basics to advanced technique. But that's just the
          beginning.Our affordable courses are designed to give you the
          high-quality education you need to succeed in the industry, without
          breaking the bank.
          <br />
          <br />
          At CourseBundler,we Believe that price should never be a barrier to
          achieving your dreams. That's why our courses are priced low so that
          anyone, regardless of their financial situation, can access the tools
          and knowledge they need to succeed.
          <br />
          <br />
          But CourseBundler is more than just a community ww're a family. Our
          supportive community of like-minded individuals is here to help you
          every step of the way, whether you're just starting out or looking to
          take your skills to the next level.
          <br />
          <br />
          with CourseBundler by Your Side. there's nothing standing between you
          and your dream job. Our courses and community will provide you with
          the potentials, support and Motivation You need to unleash your full
          potentials and become a skilled programmer.
          <br />
          <br />
          So what are You Waiting for? Join the Becodemy family today and let's
          conquer the programming industry together with our affordable courses,
          informative videos, and supportive community, the sky's the limit.
        </p>
        <br />
        <span className="font-Cursive text-[22px]">Rishav Raj</span>
        <h5 className="text-[18px] font-Poppins">Founder and CEO of Becodemy</h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
