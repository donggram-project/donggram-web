import React, { useCallback } from "react";

import { customAxios } from "@/Utils/customAxios";
import clubimage from "@/../public/placeholder.png";
import {
  DetailExplainText,
  HeadBorder,
  ExplainContainer,
  ClubImage,
  ClubName,
  ClubExplainContainer,
  GreyBorder,
  ClubDetailExplain,
  ClubExplainTextGrey,
  ClubExplainTextBlack,
  RegisterButton,
  BottomExplainHeader,
  BottomExplainText,
  BottomGreyBorder,
} from "./ClubData.styled";

const ClubData = ({ clubData }: any) => {
  const onSubmit = useCallback(() => {
    console.log(clubData.clubId);
    customAxios
      .post(`/clubs/${clubData.clubId}/join`)

      .then((res) => {
        console.log("신청 완료");
      })
      .catch((error) => {
        console.log("신청 실패");
        console.log(error);
      });
  }, [clubData]);
  return (
    <>
      <DetailExplainText>상세설명</DetailExplainText>
      <HeadBorder></HeadBorder>

      <ExplainContainer>
        <ClubImage src={clubimage} alt="club main image" />
        <div>
          <ClubName>{clubData.clubName}</ClubName>
          <ClubExplainContainer>
            <GreyBorder></GreyBorder>
            <br />
            <ClubDetailExplain>
              <li>
                <ClubExplainTextGrey>단과대:</ClubExplainTextGrey>
              </li>
              <ClubExplainTextBlack>{clubData.college}</ClubExplainTextBlack>
            </ClubDetailExplain>

            <br />
            <ClubDetailExplain>
              <li>
                <ClubExplainTextGrey>소속 과:</ClubExplainTextGrey>
              </li>
              <ClubExplainTextBlack>{clubData.department}</ClubExplainTextBlack>
              {/* 소속과 관련된 데이터를 사용하도록 변경 */}
            </ClubDetailExplain>
            <br />
            <ClubDetailExplain>
              <li>
                <ClubExplainTextGrey>카테고리:</ClubExplainTextGrey>
              </li>
              <ClubExplainTextBlack>{clubData.division}</ClubExplainTextBlack>
            </ClubDetailExplain>

            <br />
            <ClubDetailExplain>
              <li>
                <ClubExplainTextGrey>모집기간:</ClubExplainTextGrey>
              </li>
              <ClubExplainTextBlack>
                {clubData.recruitmentPeriod}
              </ClubExplainTextBlack>
            </ClubDetailExplain>
            <RegisterButton onClick={onSubmit}>신청하기</RegisterButton>
            {/* onClick={onSubmit} 추가하기 */}
          </ClubExplainContainer>
        </div>
      </ExplainContainer>
      <HeadBorder></HeadBorder>
      <BottomExplainHeader>동아리소개</BottomExplainHeader>
      <BottomGreyBorder></BottomGreyBorder>
      <BottomExplainText>{clubData.content}</BottomExplainText>
      <BottomGreyBorder></BottomGreyBorder>
    </>
  );
};

export default ClubData;
