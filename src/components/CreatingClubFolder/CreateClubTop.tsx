//div -> table로 수정
//API와 연결할 것을 고려하기
import React, { useCallback, useEffect, useState } from "react";
import clubimage from "@/../public/placeholder.png";
import { CreateClubBottom } from "./CreateClubBottom";
import {
  ClubImageText,
  TopBorder,
  BotBorder,
  CreatingClubText,
  EssentialText,
  PageContainer,
  ImageNTextConatiner,
  TopTextContainer,
  OptimizeText,
  ClubImage,
  Star,
  ImageUpLoad,
  ImageDelete,
  DeleteButton,
} from "./CreateClubTopStyle";
import { ClubImageCss } from "../MainInfoFolder/MainInfoStyle";

export function CreateClubTop() {
  const [imageSrc, setImageSrc]: any = useState(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };
  const resetImageSrc = useCallback(() => {
    setImageSrc(null);
  }, [setImageSrc]);

  useEffect(() => {
    console.log(imageSrc);
  }),
    [imageSrc];
  return (
    <PageContainer>
      <TopTextContainer>
        <CreatingClubText>동아리생성</CreatingClubText>
        <EssentialText>*필수항목</EssentialText>
      </TopTextContainer>
      <TopBorder />
      <ImageNTextConatiner>
        <ClubImageText>
          동아리 이미지 <Star>*</Star>
        </ClubImageText>
        {imageSrc ? (
          <ClubImageCss src={imageSrc} />
        ) : (
          <ClubImage src={clubimage} alt="club main image" />
        )}
      </ImageNTextConatiner>
      <ImageUpLoad>
        <input
          id="fileInput"
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => onUpload(e)}
        />
      </ImageUpLoad>
      <ImageDelete>
        <DeleteButton onClick={resetImageSrc}>삭제</DeleteButton>
      </ImageDelete>
      <OptimizeText>*이미지는 640*640 비율에 최적화 되어있습니다.</OptimizeText>
      <BotBorder />
      <CreateClubBottom imageSrc={imageSrc} />
    </PageContainer>
  );
}
