import { InputLarge } from "@components/InputLarge/InputLarge";
import { Password } from "@components/InputLargeWithShowOption/InputLargeWithShowOption";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { customAxios } from "@/Utils/customAxios";
import { setCookie } from "@/Utils/customAxios";
import {
  PageContainer,
  LoginTextAlign,
  SignInOnclick,
  LoginSpanCss,
  LoginModal,
  LoginText,
  LoginPasswordContainer,
  ForgetPassword,
  SignUpText,
  LoginButton,
} from "./SignIn.styled";
import axios from "axios";

interface Modal {
  signInModal: boolean;
  toggleSignUp: () => void;
  toggleSignIn: () => void;
  LoginControl: Dispatch<SetStateAction<boolean>>;
}

export function SignIn({
  signInModal,
  toggleSignUp,
  toggleSignIn,
  LoginControl,
}: Modal) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = useCallback(() => {
    const formData = {
      studentId: id,
      password: pw,
    };
    axios //api post 예시
      .post("http://13.125.162.181:8084/login", formData) // 8084으로 바꿔보라해서 바꿔봄
      .then((res) => {
        const Token = res.data.data;
        axios.defaults.headers.common["Access_Token"] = `${Token.accessToken}`;
        localStorage.setItem("accessToken", Token.accessToken);
        setCookie("refreshToken", Token.refreshToken);
        toggleSignIn();
        LoginControl(true);
      })
      .catch((error) => {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      });
  }, [id, pw, toggleSignIn, LoginControl]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return signInModal ? (
    <PageContainer>
      <LoginTextAlign>
        <SignInOnclick onClick={toggleSignIn} />
        <LoginSpanCss />

        <LoginModal>
          <LoginText>로그인</LoginText>
          <form>
            <InputLarge
              text="아이디"
              placeholder="학번"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setId(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <Password
              text="비밀번호"
              placeholder="비밀번호"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPw(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </form>
          <LoginPasswordContainer>
            <ForgetPassword onClick={toggleSignIn}>
              비밀번호를 잊으셨나요?
            </ForgetPassword>
            <SignUpText onClick={toggleSignUp}>회원가입</SignUpText>
          </LoginPasswordContainer>
          <LoginButton onClick={onSubmit}>로그인</LoginButton>
        </LoginModal>
      </LoginTextAlign>
    </PageContainer>
  ) : null;
}
