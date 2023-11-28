import React from "react";
import { customAxios } from "@/Utils/customAxios";
import { useState, useCallback, useEffect } from "react";
import { CreateClubSelect } from "./CreateClubSelect";
import {
  ClubNameInput,
  ClubIntroductionInput,
  ButtonText,
  SaveButton,
  SelectContainer,
  DateFromToText,
  DateSelectBox,
  CheckBox,
  LabelText,
  Star,
  TextCss,
  CancelButton,
} from "./CreateClubBottomStyle";

export function CreateClubBottom({ imageSrc }: any) {
  const [clubNameInput, setClubNameInput] = useState(""); //input란
  const [clubIntroInput, setClubIntroInput] = useState(""); //input란 관리
  const [clubName, setClubName] = useState(""); // 동아리 이름
  const [col, setCol] = useState(""); // 중동 vs 과동
  const [maj, setMaj] = useState(""); // 중동 -> 중동, 과동 -> 과 선택
  const [dep, setDep] = useState(""); // 분과 선택
  const [onRecruit, setOnRecruit] = useState(false); // 모집중 여부 -> 초기값은 false
  const [recruitDateFrom, setRecruitDateFrom] = useState(""); //모집기간시작
  const [recruitDateTo, setRecruitDateTo] = useState(""); //모집기간끝
  const [recruitDate, setRecruitDate] = useState(""); //모집기간 시작과 끝을 연결한 총 기간
  const [clubIntroduction, setClubIntroduction] = useState(""); //동아리 소개 문구

  useEffect(() => {
    const startDate = new Date(recruitDateFrom);
    const endDate = new Date(recruitDateTo);

    if (recruitDateFrom !== "" && recruitDateTo !== "") {
      setRecruitDate(recruitDateFrom + " ~ " + recruitDateTo); //dateFrom와 To에 값이 있을 때만 찐date값 설정하기
    }
    if (startDate > endDate) {
      setRecruitDateFrom("");
      setRecruitDateTo("");
      setRecruitDate("");
      alert("날짜를 다시 확인해주세요");
    }
  }, [recruitDateTo, recruitDateFrom, recruitDate]);

  const onDelete = () => {
    setClubIntroInput("");
    setClubNameInput("");
    setRecruitDateFrom("");
    setRecruitDateTo("");
    // 여기까지는 input란 지우기
    setClubName("");
    setCol("");
    setMaj("");
    setDep("");
    setOnRecruit(false);
    setRecruitDate("");
    setClubIntroduction("");
  };

  const onSubmit = useCallback(() => {
    if (recruitDate === " ~ ") {
      setRecruitDate("");
    } // 기간을 설정 안했으면 기간을 공백으로 설정
    // 데이터 전송함수, 마지막 버튼에 작용시키면 됨
    const formData = new FormData();

    if (imageSrc) {
      // 이미지 파일이 존재하면 formData에 추가
      const imageData = dataURItoBlob(imageSrc);
      formData.append("ImageClub", imageData);
    } else {
      // 이미지 파일이 없으면 빈 Blob을 추가
      const emptyBlob = new Blob();
      formData.append("ImageClub", emptyBlob);
    }
    const isRecruitmentValue = onRecruit ? 1 : 0;
    const value = {
      college: col,
      division: dep,
      clubName: clubName,
      content: clubIntroduction,
      recruitmentPeriod: recruitDate,
      isRecruitment: isRecruitmentValue.toString(),
    };
    const blob = new Blob([JSON.stringify(value)], {
      type: "application/json",
    });
    formData.append("newClubDto", blob); // 또는  formData.append("data", JSON.stringify(value)); // JSON 형식으로 파싱.(백엔드의 요청에 따라 전송방식이 달라진다.)
    // formData.append("newClubDto", JSON.stringify(value));

    customAxios //api post 예시
      .post("/clubs/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Content-Type must be set to this.
        },
      })
      .catch((error) => {
        alert("저장 실패");
      });
  }, [clubName, col, dep, onRecruit, recruitDate, clubIntroduction, imageSrc]);

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

  return (
    <div>
      <TextCss>
        동아리 이름 <Star>*</Star>
      </TextCss>

      <ClubNameInput
        type="text"
        id="clubName"
        name="clubName"
        value={clubNameInput}
        onChange={(e) => {
          setClubNameInput(e.target.value);
          setClubName(e.target.value);
        }} //이렇게 value값 추출해서 axios로 보내면 됨
      />
      <SelectContainer>
        <CreateClubSelect
          filePath="createClub"
          first={true}
          college={col}
          setCollege={setCol}
          major={maj}
          setMajor={setMaj}
          dep={dep}
          setDep={setDep}
        />
      </SelectContainer>
      <LabelText>
        모집 여부:
        <CheckBox
          type="checkbox"
          checked={onRecruit} // 상태 값을 체크 박스에 반영
          onChange={(e) => setOnRecruit(e.target.checked)} // 체크 박스의 상태 변화를 처리하는 핸들러
        />
      </LabelText>
      <LabelText id="Period">
        모집 기간:
        <DateSelectBox
          type="text" // input 태그를 날짜 선택 모드로 설정
          id="recruitDateFrom"
          name="recruitDateFrom"
          value={recruitDateFrom}
          disabled={!onRecruit}
          onChange={(e) => setRecruitDateFrom(e.target.value)}
          placeholder="yy/mm/dd"
          onFocus={(e) => (e.target.type = "date")}
        />
      </LabelText>
      <DateFromToText>~</DateFromToText>
      <LabelText>
        <DateSelectBox
          type="text"
          id="recruitDateTo"
          name="recruitDateTo"
          value={recruitDateTo}
          disabled={!onRecruit}
          onChange={(e) => {
            setRecruitDateTo(e.target.value);
          }}
          placeholder="yy/mm/dd"
          onFocus={(e) => (e.target.type = "date")} // 클릭시 input 태그를 날짜 선택 모드로 설정
        />
      </LabelText>
      <TextCss id="Body">
        본문<Star>*</Star>
      </TextCss>
      <ClubIntroductionInput
        id="clubIntroduction"
        name="clubIntroduction"
        value={clubIntroInput}
        onChange={(e) => {
          setClubIntroduction(e.target.value);
          setClubIntroInput(e.target.value);
        }}
      />
      <div>
        <CancelButton>
          <ButtonText onClick={onDelete}>취소</ButtonText>
        </CancelButton>
        <SaveButton>
          <ButtonText onClick={onSubmit}>저장</ButtonText>
        </SaveButton>
      </div>
    </div>
  );
}
