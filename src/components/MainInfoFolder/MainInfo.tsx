//API와 연결할 것을 고려하기
import clubimage from "@/../public/placeholder.png";
import React, { useEffect, useState } from "react";
import ClubTable from "./ClubTable";
import { customAxios } from "@/Utils/customAxios";
import {
  PageContainer,
  UserInfoText,
  OtherInfoText,
  OtherInfoTextContainer,
  BottomBorder,
  ClubImageCss,
  TextNImageContainer,
  SaveButton,
  ButtonText,
  TextSelectBox,
  TextNImageBox,
  CloseXimage,
  Texting,
} from "./MainInfoStyle";

export function MainInfo() {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    customAxios
      .get(`http://13.125.162.181:8084/member`) //본인 학번에 맞는 정보 불러오도록 수정
      .then((res) => {
        setUserData(res.data.data),
          // handleClicked(response.data.data[0].clubId)]
          // console.log(res.data.data.studentId)
          console.log(userData);
        console.log("불러오기 성공");
      })
      .catch((error) => console.error("에러:에러!!!!!!!!!!!!!!", error));
  }, [setUserData]);
  return (
    <PageContainer>
      <UserInfoText>회원정보</UserInfoText>
      <TextNImageContainer>
        <OtherInfoTextContainer>
          <OtherInfoText>이름</OtherInfoText>
          <TextSelectBox>
            <Texting id="NoneBox">{userData.memberName}</Texting>
          </TextSelectBox>

          <OtherInfoText>학번</OtherInfoText>
          <TextSelectBox>
            <Texting id="NoneBox">{userData.studentId}</Texting>
          </TextSelectBox>

          <OtherInfoText>소속</OtherInfoText>
          <TextSelectBox>
            <TextNImageBox>
              <Texting
                style={{
                  color:
                    userData.college1 && userData.major1
                      ? "var(--cool-gray-90, #21272a)"
                      : "transparent",
                }}
              >
                {userData.college1 &&
                  userData.major1 &&
                  `${userData.college1}-${userData.major1}`}
              </Texting>
              {userData.college1 && userData.major1 && (
                <CloseXimage src="/close.svg" alt="X" />
              )}

              <Texting
                style={{
                  color:
                    userData.college2 && userData.major2
                      ? "var(--cool-gray-90, #21272a)"
                      : "transparent",
                }}
              >
                {userData.college2 &&
                  userData.major2 &&
                  `${userData.college2}-${userData.major2}`}
              </Texting>
              {userData.college2 && userData.major2 && (
                <CloseXimage src="/close.svg" alt="X" />
              )}
              {/* API로 소속 여러개 */}
            </TextNImageBox>
          </TextSelectBox>
          <OtherInfoText>내 동아리</OtherInfoText>
        </OtherInfoTextContainer>
        <ClubImageCss src={clubimage} alt="club main image" />
      </TextNImageContainer>
      <ClubTable />

      <BottomBorder />
      <SaveButton>
        <ButtonText>저장</ButtonText>
      </SaveButton>
    </PageContainer>
  );
}
