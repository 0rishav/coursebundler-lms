import React, { FC, useEffect, useRef, useState } from "react";
import Toast from "react-hot-toast";
import { SiSpringsecurity } from "react-icons/si";
import { styles } from "../../../app/styles/style";
import { useSelector } from "react-redux";
import { useActivationMutation } from "../../../redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

type verifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
 

  const [activation, { isSuccess, error }] = useActivationMutation();
  const [inValidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      Toast.success("Account Activated Successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errData = error as any;
        Toast.error(errData.data.message);
        setInvalidError(true)
      } else {
        console.log("An error occured", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<verifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyMember = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyMember);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <SiSpringsecurity size={30} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] bg-transparent border-[3px] rounded-[20px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              inValidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            }`}
            maxLength={1}
            placeholder=""
            value={verifyNumber[key as keyof verifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify Your Account
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go Back to Sign In?{" "}
        <span
          className="text-[#2190ff] pt-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;
