import CoursePlayer from "../../../app/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import { styles } from "../../styles/style";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "../../../redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [answer, setAnswer] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      isError: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const course = courseData?.course;

  const isPreviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]?._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();

      toast.success("Question created successfully");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new Question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer Added Successfully");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New reply Received",
          message: `You have a new Question reply  ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.data?.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data?.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new Question in ${data[activeVideo].title}`,
        userId: user._id,
      });
      toast.success("Review Added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replySuccess) {
      setReply("");
      refetch();
      toast.success("Answer Added Successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    // questionId,courseId,contentId,answer
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review Can't be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply Can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full  flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          }  dark:text-white w-[unset] text-black !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-0-[.8]"
          }`}
          onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo)}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lession
        </div>
        <div
          className={`${
            styles.button
          }  dark:text-white text-black !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-0-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lession
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["OverView", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + ":"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : ""}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={48}
              rows={5}
              placeholder="Write your question..."
              className={`outline-none bg-transparent mt-3 border dark:border-[#ffffff57] border-[#000] 800px:w-full p-2 rounded w-[-90%] 800px:text-[18px] font-Poppins dark:text-white text-black`}
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-not-allowed"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full ">
          <>
            {!isPreviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : ""}
                    alt=""
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            color="rgb(246,186,0)"
                            size={25}
                            className="mr-1 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            color="rgb(246,186,0)"
                            size={25}
                            className="mr-1 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={48}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent mt-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[-90%] 800px:text-[18px] font-Poppins dark:text-white text-black"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full my-5 dark:text-white text-black" key={index}>
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={item.user.avatar ? item.user.avatar.url : ""}
                          alt=""
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p className="dark:text-white text-black">
                          {item.comment}
                        </p>
                        <small className="dark:text-[#ffffff83] text-[#000]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" &&
                      item.commentReplies.length === 0 && (
                        <span
                          className={`${styles.label} !ml-10 cursor-pointer`}
                          onClick={() => {
                            setIsReviewReply(true);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply{" "}
                          <BiMessage
                            size={20}
                            className="cursor-pointer"
                            fill="#ffffff83"
                          />
                        </span>
                      )}
                    {isReviewReply && reviewId === item._id && (
                      <div className="w-full flex relative">
                        <input
                          className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-[#000] p-[5px] w-[95%]"
                          type="text"
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          placeholder="Enter Your Reply..."
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px] dark:text-white text-black">
                          <Image
                            src={i.user.avatar ? i.user.avatar.url : ""}
                            alt=""
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2 dark:text-white text-black">
                          <h5 className="text-[20px]">{i.user.name}</h5>
                          <VscVerifiedFilled className="text-[#ffffff83] ml-2 text-[20px] dark:text-green-500 text-blue-500" />
                          <p>{i.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            data={data}
            key={index}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            setQuestionId={setQuestionId}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  setQuestionId,
  item,
  answer,
  setAnswer,
  answerCreationLoading,
  handleAnswerSubmit,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item.user.avatar ? item.user.avatar.url : ""}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px] dark:text-white text-black">
              {item?.user.name}
            </h5>
            <p className="dark:text-white text-black">{item?.question}</p>
            <small className="text-[#ffffff83]">
              {!item.createdAt ? "" : format(item.createdAt)}*
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer" fill="#ffffff83" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#ffffff43]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive &&  (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white" key={item._id}>
                <div>
                  <Image
                    src={item.user.avatar ? item.user.avatar.url : ""}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>{" "}
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="dark:text-[#58c750] text-blue-500 ml-2 text[20px]" />
                    )}
                  </div>

                  <p>{item.answer}</p>
                  <small className="#ffffff83">{format(item.createdAt)}</small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter Your Reply..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:text-white text-black border-[#00000027] dark:border-[#fff] p-[5px] w-[95%] ${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
