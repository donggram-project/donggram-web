import { useState, useCallback } from "react";
import { InputLarge } from "@components/InputLarge/InputLarge";
import { InputSmall } from "@components/InputSmall/InputSmall";
import { MajorSelector } from "@components/MajorSelector/MajorSelector";
import { Password } from "@components/Password/Password";
import { customAxios } from "@/Utils/customAxios";
import {
  PageContainer,
  PageTextAlign,
  BackGroundColor,
  SignUpSpanCss,
  SignUpModal,
  SignUpText,
  AlreadyHaveAccount,
  SubmitButton,
} from "./SignUp.styled";
import axios from "axios";

interface Modal {
  signUpModal: boolean;
  toggleSignUp: () => void;
  toggleSignIn: () => void;
}

export function SignUp({ signUpModal, toggleSignUp, toggleSignIn }: Modal) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [col1, setCol1] = useState<string>("");
  const [col2, setCol2] = useState<string>("");
  const [major1, setMajor1] = useState<string>("");
  const [major2, setMajor2] = useState<string>("");

  const onSubmit = useCallback(() => {
    const formData = {
      studentId: id,
      name: name,
      password: password,
      checkPassword: checkPassword,
      college1: col1,
      college2: col2,
      major1: major1,
      major2: major2,
    };

    axios //api post 예시
      .post("/join", formData)
      .then((res) => {
        toggleSignUp();
      })
      .catch((error) => {
        alert("회원가입 실패. 다시 시도해주세요.");
        console.error(error);
      });
  }, [
    id,
    name,
    password,
    checkPassword,
    col1,
    col2,
    major1,
    major2,
    toggleSignUp,
  ]);
  const dummyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
    }
  };
  return signUpModal ? (
    <PageContainer>
      <PageTextAlign>
        <BackGroundColor onClick={toggleSignUp} />
        <SignUpSpanCss />
        <SignUpModal>
          <SignUpText>회원가입</SignUpText>
          <AlreadyHaveAccount onClick={toggleSignIn}>
            이미 계정을 소유하고 있나요?
          </AlreadyHaveAccount>
          <form>
            <InputLarge
              onKeyDown={dummyKeyDown}
              text="아이디*"
              placeholder="학번"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setId(e.target.value);
              }}
            />
            <Password
              password={password}
              setPassword={setPassword}
              confirmPassword={checkPassword}
              setConfirmPassword={setCheckPassword}
            />
          </form>
          <InputSmall
            text="이름*"
            placeholder="이름"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <MajorSelector
            filePath="major"
            first={true}
            college={col1}
            setCollege={setCol1}
            major={major1}
            setMajor={setMajor1}
          />
          <MajorSelector
            filePath="major"
            first={false}
            college={col2}
            setCollege={setCol2}
            major={major2}
            setMajor={setMajor2}
          />
          <SubmitButton onClick={onSubmit}>회원가입</SubmitButton>
        </SignUpModal>
      </PageTextAlign>
    </PageContainer>
  ) : null;
}
