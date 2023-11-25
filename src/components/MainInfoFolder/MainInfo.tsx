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
  ImageUpLoad,
  PlaceholderImage,
  DeleteButton,
} from "./MainInfoStyle";
import { useCallback } from "react";
import { useRouter } from "next/router";

interface DataRow {
  studentId: string;
  memberName: string;
  major1: string;
}

export function MainInfo() {
  const router = useRouter();
  const [userData, setUserData] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userCollege, setUserCollege] = useState("");
  const [imageSrc, setImageSrc]: any = useState(null);
  // 출처: https://itprogramming119.tistory.com/entry/React-이미지-파일업로드-미리보기-구현하기 [코딩병원:티스토리]

  const onSubmit = useCallback(() => {
    console.log("이름 = ", userName);
    console.log("학번 = ", userId);
    console.log("전공 =", userCollege);
    console.log("사진 = ", imageSrc);
    customAxios
      .put(`http://13.125.162.181:8084/member/`, {
        memberName: userName,
        studentId: userId,
        major1: userCollege,
        profileImage: imageSrc,
      })
      .then(() => {
        console.log("put success");
        router.reload();
      })
      .catch((error) => console.error("에러 발생 이유: ", error.response));
  }, [userName, userId, userCollege, imageSrc]);

  useEffect(() => {
    console.log("이름 = ", userName);
    console.log("학번 = ", userId);
    console.log("전공 =", userCollege);
    console.log("사진 = ", imageSrc);
  }),
    [userName, userId, userCollege, imageSrc];

  useEffect(() => {
    customAxios
      .get(`http://13.125.162.181:8084/member`)
      .then((res) => {
        setUserData(res.data.data);
        setUserName(res.data.data.memberName);
        setUserId(res.data.data.studentId);
        setUserCollege(res.data.data.major1);
        setImageSrc(res.data.data.profileImage);

        console.log(res.data.data);
        console.log(userData);
        console.log("불러오기 성공");
      })
      .catch((error) => console.error("에러:에러!!!!!!!!!!!!!!", error));
  }, [setUserData]);

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
  //itprogramming119.tistory.com/entry/React-이미지-파일업로드-미리보기-구현하기 [코딩병원:티스토리]
  const resetImageSrc = useCallback(() => {
    setImageSrc(null);
  }, [setImageSrc]);

  return (
    <PageContainer>
      <UserInfoText>회원정보</UserInfoText>
      <TextNImageContainer>
        <OtherInfoTextContainer>
          <OtherInfoText>이름</OtherInfoText>
          <TextSelectBox
            id="name"
            placeholder={userData.memberName}
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
          ></TextSelectBox>

          <OtherInfoText>학번</OtherInfoText>
          <TextSelectBox
            id="id"
            placeholder={userData.studentId}
            onChange={(event) => setUserId(event.target.value)}
            value={userId}
          ></TextSelectBox>

          <OtherInfoText>소속</OtherInfoText>
          <TextSelectBox
            id="college"
            placeholder={userData.major1}
            onChange={(event) => setUserCollege(event.target.value)}
            value={userCollege}
          ></TextSelectBox>
          <OtherInfoText>내 동아리</OtherInfoText>
        </OtherInfoTextContainer>

        {imageSrc ? (
          <ClubImageCss src={imageSrc} />
        ) : (
          <PlaceholderImage src={clubimage} alt="Placeholder" />
        )}
      </TextNImageContainer>
      <ImageUpLoad>
        <input
          accept="image/*"
          multiple
          type="file"
          onChange={(e) => onUpload(e)}
        />
        <DeleteButton onClick={resetImageSrc}>삭제</DeleteButton>
      </ImageUpLoad>

      <ClubTable clubList={userData.clubList} />

      <BottomBorder />
      <SaveButton>
        <ButtonText onClick={onSubmit}>저장</ButtonText>{" "}
        {/*추후에 멤버 정보 변경 기능 추가 필요 */}
      </SaveButton>
    </PageContainer>
  );
}
