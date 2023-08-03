//styled완료
import { InputLarge } from "./InputLarge";
import { Password } from "./InputLargeWithShowOption";
import { useState, useCallback } from "react";
import axios from "axios";
import { setCookie } from "@/Utils/customAxios";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: default;
`;
const LoginTextAlign = styled.div`
  text-align: center;
`;
const SignInOnclick = styled.div`
  position: absolute;
  inset: 0;
  background-color: #9ca3af;
  opacity: 0.75;
`;
const LoginSpanCss = styled.span`
  display: inline-block;
  vertical-align: middle;
  height: 80vh;
`;
const LoginModal = styled.div`
  display: inline-block;
  background-color: #ffffff;
  border-radius: 1.5rem;
  text-align: left;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  transform: translate(-0%, -0%);
  vertical-align: middle;
  width: 60rem;
  height: 45rem;
`;
const LoginText = styled.div`
  color: #697077;
  font-size: 6.4rem;
  font-weight: 700;
  margin-top: 4.6rem;
  margin-bottom: 3.5rem;
  text-align: center;
`;
const LoginPasswordContainer = styled.div`
  display: flex;
  margin-left: 4rem;
  justify-content: space-between;
  margin-top: -1.5rem;
  margin-bottom: 2rem;
  color: #001d6c;
  font-size: 1.4rem;
  line-height: 140%;
  text-align: right;
`;
const ForgetPassword = styled.div`
  margin-right: 3.7rem;
  cursor: pointer;
`;

const SignUpText = styled(ForgetPassword)``;

const LoginButton = styled.button`
  width: 52rem;
  height: 4.8rem;
  background-color: #0090f9;
  margin-left: 4rem;
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  cursor: default;
`;
const CenterRow = styled.div`
  text-align: center;
`;
const CenterCol = styled.span`
  display: inline-block;
  vertical-align: middle;
  height: 80vh;
`;
const Background = styled.div`
  position: absolute;
  inset: 0;
  background-color: #6b7280;
  opacity: 0.75;
`;
const Box = styled.div``;
interface Modal {
  signInModal: boolean;
  toggleSignUp: () => void;
  toggleSignIn: () => void;
}

export function SignIn({ signInModal, toggleSignUp, toggleSignIn }: Modal) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = useCallback(() => {
    const formData = {
      studentId: id,
      password: pw,
    };
    axios //api post 예시
      .post("http://52.79.111.78:8080/login", formData)
      .then((res) => {
        console.log(res.data);
        const Token = res.data.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${Token.accessToken}`;
        localStorage.setItem("accessToken", Token.accessToken);
        setCookie("refreshToken", Token.refreshToken);
        toggleSignIn();
      })
      .catch((error) => {
        alert("저장 실패");
      });
  }, [id, pw, toggleSignIn]);

  return signInModal ? (
    <PageContainer>
      <LoginTextAlign>
        <SignInOnclick onClick={toggleSignIn} />
        <LoginSpanCss />

        <LoginModal>
          <LoginText>로그인</LoginText>
          <InputLarge
            text="아이디"
            placeholder="학번"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setId(e.target.value);
            }}
          />
          <Password
            text="비밀번호"
            placeholder="비밀번호"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPw(e.target.value);
            }}
          />
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
