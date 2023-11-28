//API와 연결할 것을 고려하기
import clubimage from "@/../public/placeholder.png";
import React, { useEffect, useState } from "react";
import ClubTable from "./ClubTable";
import { customAxios } from "@/Utils/customAxios";
import { IsLogin } from "@/components/IsLogin/IsLogin";
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
  ImageDelete,
} from "./MainInfoStyle";
import { useCallback } from "react";
import { useRouter } from "next/router";

interface DataRow {
  userData: {
    memberName: string;
    studentId: string;
    major1: string;
    clubList: [];
  };
}

export function MainInfo() {
  const router = useRouter();
  const [userData, setUserData] = useState<DataRow["userData"]>({
    memberName: "",
    studentId: "",
    major1: "",
    clubList: [],
  });

  const [imageSrc, setImageSrc]: any = useState(null);
  // 출처: https://itprogramming119.tistory.com/entry/React-이미지-파일업로드-미리보기-구현하기 [코딩병원:티스토리]
  const [loginHeader, setLoginHeader] = useState(false);

  useEffect(() => {
    const loginHeader = IsLogin(); // IsLogin 함수를 호출하여 로그인 상태를 확인합니다.
    setLoginHeader(loginHeader);

    // setLoginHeader 값이 false이면 index.tsx로 이동합니다.
    if (!loginHeader) {
      router.push("/"); // 이동할 페이지의 경로를 설정합니다.
    }
  }, [setLoginHeader, router]);

  const onSubmit = useCallback(() => {
    const formData = new FormData();

    if (imageSrc) {
      // 이미지 파일이 있는 경우에만 formData에 추가
      const imageData = dataURItoBlob(imageSrc);
      formData.append("profileImage", imageData, "profileImage.jpg");
    } else {
      const emptyBlob = new Blob();
      formData.append("profileImage", emptyBlob, "profileImage.jpg");
    }

    customAxios
      .put(`/member`, formData, {})
      .then(() => {
        alert("저장 성공!");
        router.reload();
      })
      .catch((error) => console.error("Reason for error: ", error.response));
  }, [userData, imageSrc, router]);
  // Data URI를 Blob으로 변환하는 함수
  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  useEffect(() => {
    customAxios
      .get(`/member`)
      .then((res) => {
        setUserData(res.data.data);
        setImageSrc(res.data.data.profileImage);
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
          <TextSelectBox>{userData.memberName}</TextSelectBox>

          <OtherInfoText>학번</OtherInfoText>
          <TextSelectBox>{userData.studentId}</TextSelectBox>

          <OtherInfoText>소속</OtherInfoText>
          <TextSelectBox>{userData.major1}</TextSelectBox>
        </OtherInfoTextContainer>

        {imageSrc ? (
          <ClubImageCss src={imageSrc} />
        ) : (
          <PlaceholderImage src={clubimage} alt="Placeholder" />
        )}
      </TextNImageContainer>
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
      <OtherInfoText>내 동아리</OtherInfoText>
      <ClubTable clubList={userData.clubList} />

      <BottomBorder />
      <SaveButton>
        <ButtonText onClick={onSubmit}>저장</ButtonText>{" "}
        {/*추후에 멤버 정보 변경 기능 추가 필요 */}
      </SaveButton>
    </PageContainer>
  );
}
