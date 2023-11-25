import React, { useState } from "react";
import showEye from "@public/showEye.svg";
import showEye2 from "@public/showEye2.svg";
import {
  PageContainer,
  TextShowing,
  Border,
  TextInput,
  PasswordEyeImage,
} from "./InputLargeWithShowOption.styled";

interface Input {
  text: string;
  placeholder: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Password({ text, placeholder, onKeyDown, onChange }: Input) {
  const [inputType, setInputType] = useState("password");

  const handleImageClick = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <PageContainer>
      <TextShowing>{text}</TextShowing>
      <Border>
        <TextInput
          type={inputType}
          placeholder={placeholder}
          autoComplete="off"
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
        <PasswordEyeImage
          src={inputType === "password" ? showEye2 : showEye}
          onClick={handleImageClick}
          alt="toggle visibility"
        />
      </Border>
    </PageContainer>
  );
}
