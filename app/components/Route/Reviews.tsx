import Image from "next/image";
import React, { FC } from "react";
import { styles } from "../../styles/style";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment: "To purchase a plan, just open the extension popup in your Chrome browser and click the button Subscribe today. Then enter your credit card details. Once completed, refresh Instagram so the subscription changes is updated correctly.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack developer | Quarter university",
    comment: "To purchase a plan, just open the extension popup in your Chrome browser and click the button Subscribe today Then enter your credit card details. Once completed, refresh Instagram so the subscription changes is updated correctly.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Student | Cambridge university",
    comment: "To purchase a plan, just open the extension popup in your Chrome browser and click the button Subscribe today Then enter your credit card details. Once completed, refresh Instagram so the subscription changes is updated correctly.",
  },
  {
    name: "Mina  Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Student | Cambridge university",
    comment: "To purchase a plan, just open the extension popup in your Chrome browser and click the button Subscribe today Then enter your credit card details. Once completed, refresh Instagram so the subscription changes is updated correctly.",
  },
];

const Reviews: FC<Props> = () => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center gap-20">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/image-1.jpg")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-blue-500">Our Strength</span>
            {""}
            <br /> See What They Say About us.
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            dolorum quod quasi tempora cumque a ad nihil placeat, natus non
            exercitationem perspiciatis expedita quo. Officiis suscipit
            aspernatur sequi debitis fugiat.
          </p>
          <br />
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-col-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-col-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews.map((i, index) => (
          <ReviewCard item={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
