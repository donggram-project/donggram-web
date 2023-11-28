import React, { useCallback } from "react";

import { customAxios } from "@/Utils/customAxios";
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
    if (clubData.recruitment === true) {
      customAxios
        .post(`/clubs/${clubData.clubId}/join`)
        .then((res) => {
          alert("신청이 완료되었습니다.");
        })
        .catch((error) => {
          alert("신청이 실패했습니다.");
          console.error(error);
        });
    } else {
      alert("이 동아리는 모집 중이 아닙니다.");
    }
  }, [clubData]);
  return (
    <>
      <DetailExplainText>상세설명</DetailExplainText>
      <HeadBorder></HeadBorder>

      <ExplainContainer>
        <ClubImage src={clubData.clubImage} alt="club main image" />
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
