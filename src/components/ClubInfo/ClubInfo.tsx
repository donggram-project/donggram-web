//동아리 정보
import {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import placeholder from "@public/placeholder.png";
import {
  ClubContainer,
  ClubImage,
  ClubCol,
  Body,
  ClubRow,
  Text,
  Admin,
  Date,
  ClubRow2,
  Text2,
  ClubName,
  Value,
  CheckBox,
  RecruitDate,
  Introduction,
  Buttons,
  Delete,
  CompleteButtons,
  Cancle,
  Save,
  ClubTab,
  PendingButtons,
  Placeholder,
} from "./ClubInfo.styled";
import { customAxios } from "@/Utils/customAxios";
import { AdminClubHeader } from "../AdminClubHeader/AdminClubHeader";
import { AdminClubMemberManageTable } from "../AdminClubMemberManageTable/AdminClubMemberManageTable";

interface DataRow {
  clubId: string;
  clubName: string;
  clubImage: string;
  admin: string;
  clubCreated: string;
  college: string;
  division: string;
  recruitment: boolean;
  recruitmentPeriod: string;
  content: string;
}

interface ParentProps {
  ClickedId: string;
  isClubInfo: boolean;
  setIsClubInfo: Dispatch<SetStateAction<boolean>>;
  ClickedStatus: string;
  handleStatus: (value: string) => void;
}

export const ClubInfo = ({
  ClickedId,
  isClubInfo,
  setIsClubInfo,
  handleStatus,
  ClickedStatus,
}: ParentProps) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [club, setClub] = useState<DataRow>();
  const [changedClub, setChangedClub] = useState<DataRow>();
  const [recruitDates, setRecruitDates] = useState<string[]>([]);

  const handleAdminChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedAdmin = e.target.value;
      if (changedClub) {
        setChangedClub({ ...changedClub, admin: changedAdmin });
      }
    },
    [changedClub]
  );
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedName = e.target.value;
      if (changedClub) {
        setChangedClub({ ...changedClub, clubName: changedName });
      }
    },
    [changedClub]
  );
  const handleCollegeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedCollege = e.target.value;
      if (changedClub) {
        if (changedCollege === "중앙동아리") {
          setChangedClub({
            ...changedClub,
            college: changedCollege,
          });
        } else {
          setChangedClub({ ...changedClub, college: changedCollege });
        }
      }
    },
    [changedClub]
  );
  const handleDepartChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedDepart = e.target.value;
      if (changedClub) {
        setChangedClub({ ...changedClub, division: changedDepart });
      }
    },
    [changedClub]
  );
  const handleIntroChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedIntro = e.target.value;
      if (changedClub) {
        setChangedClub({ ...changedClub, content: changedIntro });
      }
    },
    [changedClub]
  );
  const handleRecruitStartChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedDate = e.target.value;
      if (changedClub) {
        const newRecruitDates = [...recruitDates];
        newRecruitDates[0] = changedDate;
        setRecruitDates(newRecruitDates);
        const changedDates = recruitDates[0] + "~" + recruitDates[1];
        setChangedClub({ ...changedClub, recruitmentPeriod: changedDates });
      }
    },
    [changedClub, recruitDates]
  );
  const handleRecruitEndChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedDate = e.target.value;
      if (changedClub) {
        const newRecruitDates = [...recruitDates];
        newRecruitDates[1] = changedDate;
        setRecruitDates(newRecruitDates);
        const changedDates = recruitDates[0] + "~" + recruitDates[1];
        setChangedClub({ ...changedClub, recruitmentPeriod: changedDates });
      }
    },
    [changedClub, recruitDates]
  );
  const handleRecruitChange = useCallback(() => {
    if (changedClub) {
      if (changedClub.recruitment === true) {
        changedClub.recruitmentPeriod === "";
        const newRecruitDates = ["", ""];
        setRecruitDates(newRecruitDates);
      }
      setChangedClub({ ...changedClub, recruitment: !changedClub.recruitment });
    }
  }, [changedClub]);
  const handelCancleClick = useCallback(() => {
    setChangedClub(club);
    const dates = club?.recruitmentPeriod.split("~") || [];
    if (dates.length === 1 && dates[0] === "") {
      dates.push("");
    }
    setRecruitDates(dates);
  }, [club]);
  const handleSaveClick = useCallback(() => {
    setClub(changedClub);
  }, [changedClub]);
  const handleClubApprove = useCallback(() => {
    customAxios
      .put(`/admin/clubs/${ClickedId}/approve`)
      .then((res) => {
        handleStatus("approve");
        alert("동아리가 승인되었습니다.");
      })
      .catch(() => alert("동아리 승인에 실패하였습니다."));
  }, [ClickedId, handleStatus]);
  const handleClubReject = useCallback(() => {
    customAxios
      .put(`/admin/clubs/${ClickedId}/reject`)
      .then((res) => {
        handleStatus("reject");
        alert("동아리가 거절되었습니다.");
      })
      .catch(() => alert("동아리 거절에 실패하였습니다."));
  }, [ClickedId, handleStatus]);

  useEffect(() => {
    customAxios
      .get(`admin/clubs/${ClickedId}`)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data.clubCreated == null) {
          response.data.data.clubCreated = "-";
        }
        setClub(response.data.data);
        setChangedClub(response.data.data);
        let dates = [];
        if (response.data.data.recruitment) {
          dates = response.data.data.recruitmentPeriod?.split("~") || [];
        } else {
          dates = ["", ""];
        }
        setRecruitDates(dates);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, [ClickedId, club?.recruitmentPeriod, ClickedStatus]);

  const PrintImage = useCallback(() => {
    if (changedClub) {
      if (changedClub.clubImage) {
        return <ClubImage src={changedClub.clubImage} alt="userImage" />;
      }
    }
    return <Placeholder src={placeholder} alt="userImage" priority />;
  }, [changedClub]);

  return changedClub ? (
    isClubInfo ? (
      ClickedStatus != "approve" ? (
        <ClubTab>
          <AdminClubHeader
            isClubInfo={isClubInfo}
            setIsClubInfo={setIsClubInfo}
          />
          <ClubContainer>
            <PrintImage />
            <Body>
              <ClubCol>
                <ClubRow>
                  <Text>고유ID</Text>
                  <Admin
                    value={changedClub.clubId ? changedClub.clubId : ""}
                    type="text"
                    onChange={handleAdminChange}
                  />
                </ClubRow>
                <ClubRow>
                  <Text>신청일</Text>
                  <Date
                    value={
                      changedClub.clubCreated ? changedClub.clubCreated : ""
                    }
                    type="text"
                    readOnly
                  />
                </ClubRow>
              </ClubCol>
              <ClubRow2>
                <Text2>동아리명</Text2>
                <ClubName
                  value={changedClub.clubName ? changedClub.clubName : ""}
                  type="text"
                  onChange={handleNameChange}
                />
              </ClubRow2>
              <ClubCol>
                <ClubRow2>
                  <Text2>소속</Text2>
                  <Value
                    value={changedClub.college ? changedClub.college : ""}
                    type="text"
                    onChange={handleCollegeChange}
                  />
                </ClubRow2>
                <ClubRow2>
                  <Text2>분과</Text2>
                  <Value
                    value={changedClub.division ? changedClub.division : ""}
                    type="text"
                    onChange={handleDepartChange}
                  />
                </ClubRow2>
              </ClubCol>

              <ClubRow>
                <Text>모집여부</Text>
                <CheckBox
                  type="checkbox"
                  name="recruit"
                  checked={changedClub.recruitment}
                  onChange={handleRecruitChange}
                />
              </ClubRow>
              <ClubRow>
                <Text>모집기간</Text>
                <RecruitDate
                  disabled={changedClub.recruitment === false}
                  value={changedClub.recruitmentPeriod ? recruitDates[0] : ""}
                  onChange={handleRecruitStartChange}
                />
                <Text>~</Text>
                <RecruitDate
                  disabled={changedClub.recruitment === false}
                  value={changedClub.recruitmentPeriod ? recruitDates[1] : ""}
                  onChange={handleRecruitEndChange}
                />
              </ClubRow>
              <ClubRow2>
                <Text2>본문</Text2>
                <Introduction
                  value={changedClub.content ? changedClub.content : ""}
                  onChange={handleIntroChange}
                />
              </ClubRow2>
              <PendingButtons>
                <CompleteButtons>
                  <Cancle onClick={handleClubReject}>거절</Cancle>
                  <Save onClick={handleClubApprove}>승인</Save>
                </CompleteButtons>
              </PendingButtons>
            </Body>
          </ClubContainer>
        </ClubTab>
      ) : (
        <ClubTab>
          <AdminClubHeader
            isClubInfo={isClubInfo}
            setIsClubInfo={setIsClubInfo}
          />
          <ClubContainer>
            <PrintImage />
            <Body>
              <ClubCol>
                <ClubRow>
                  <Text>고유ID</Text>
                  <Admin
                    value={changedClub.clubId ? changedClub.clubId : ""}
                    type="text"
                    onChange={handleAdminChange}
                  />
                </ClubRow>
                <ClubRow>
                  <Text>신청일</Text>
                  <Date
                    value={
                      changedClub.clubCreated ? changedClub.clubCreated : ""
                    }
                    type="text"
                    readOnly
                  />
                </ClubRow>
              </ClubCol>
              <ClubRow2>
                <Text2>동아리명</Text2>
                <ClubName
                  value={changedClub.clubName ? changedClub.clubName : ""}
                  type="text"
                  onChange={handleNameChange}
                />
              </ClubRow2>
              <ClubCol>
                <ClubRow2>
                  <Text2>소속</Text2>
                  <Value
                    value={changedClub.college ? changedClub.college : ""}
                    type="text"
                    onChange={handleCollegeChange}
                  />
                </ClubRow2>
                <ClubRow2>
                  <Text2>분과</Text2>
                  <Value
                    value={changedClub.division ? changedClub.division : ""}
                    type="text"
                    onChange={handleDepartChange}
                  />
                </ClubRow2>
              </ClubCol>

              <ClubRow>
                <Text>모집여부</Text>
                <CheckBox
                  type="checkbox"
                  name="recruit"
                  checked={changedClub.recruitment}
                  onChange={handleRecruitChange}
                />
              </ClubRow>
              <ClubRow>
                <Text>모집기간</Text>
                <RecruitDate
                  disabled={changedClub.recruitment === false}
                  value={changedClub.recruitmentPeriod ? recruitDates[0] : ""}
                  onChange={handleRecruitStartChange}
                />
                <Text>~</Text>
                <RecruitDate
                  disabled={changedClub?.recruitment === false}
                  value={changedClub.recruitmentPeriod ? recruitDates[1] : ""}
                  onChange={handleRecruitEndChange}
                />
              </ClubRow>
              <ClubRow2>
                <Text2>본문</Text2>
                <Introduction
                  value={changedClub.content ? changedClub.content : ""}
                  onChange={handleIntroChange}
                />
              </ClubRow2>
              <Buttons>
                <Delete>삭제</Delete>
                <CompleteButtons>
                  <Cancle onClick={handelCancleClick}>취소</Cancle>
                  <Save onClick={handleSaveClick}>저장</Save>
                </CompleteButtons>
              </Buttons>
            </Body>
          </ClubContainer>
        </ClubTab>
      )
    ) : (
      <ClubTab>
        <AdminClubHeader
          isClubInfo={isClubInfo}
          setIsClubInfo={setIsClubInfo}
        />
        <AdminClubMemberManageTable ParentClickedId={ClickedId} />
      </ClubTab>
    )
  ) : isClubInfo ? (
    <ClubTab>
      <AdminClubHeader isClubInfo={isClubInfo} setIsClubInfo={setIsClubInfo} />
      <ClubContainer>
        <PrintImage />
        <Body>
          <ClubCol>
            <ClubRow>
              <Text>고유ID</Text>
              <Admin
                value={"로딩 중..."}
                type="text"
                onChange={handleAdminChange}
              />
            </ClubRow>
            <ClubRow>
              <Text>신청일</Text>
              <Date value={"로딩 중..."} type="text" readOnly />
            </ClubRow>
          </ClubCol>
          <ClubRow2>
            <Text2>동아리명</Text2>
            <ClubName
              value={"로딩 중..."}
              type="text"
              onChange={handleNameChange}
            />
          </ClubRow2>
          <ClubCol>
            <ClubRow2>
              <Text2>소속</Text2>
              <Value
                value={"로딩 중..."}
                type="text"
                onChange={handleCollegeChange}
              />
            </ClubRow2>
            <ClubRow2>
              <Text2>분과</Text2>
              <Value
                value={"로딩 중..."}
                type="text"
                onChange={handleDepartChange}
              />
            </ClubRow2>
          </ClubCol>

          <ClubRow>
            <Text>모집여부</Text>
            <CheckBox
              type="checkbox"
              name="recruit"
              checked={false}
              onChange={handleRecruitChange}
            />
          </ClubRow>
          <ClubRow>
            <Text>모집기간</Text>
            <RecruitDate
              disabled={true}
              value={"로딩 중..."}
              onChange={handleRecruitStartChange}
            />
            <Text>~</Text>
            <RecruitDate
              disabled={true}
              value={"로딩 중..."}
              onChange={handleRecruitEndChange}
            />
          </ClubRow>
          <ClubRow2>
            <Text2>본문</Text2>
            <Introduction value={"로딩 중..."} onChange={handleIntroChange} />
          </ClubRow2>
          <Buttons>
            <Delete>삭제</Delete>
            <CompleteButtons>
              <Cancle onClick={handelCancleClick}>취소</Cancle>
              <Save onClick={handleSaveClick}>저장</Save>
            </CompleteButtons>
          </Buttons>
        </Body>
      </ClubContainer>
    </ClubTab>
  ) : (
    <ClubTab>
      <AdminClubHeader isClubInfo={isClubInfo} setIsClubInfo={setIsClubInfo} />
      <AdminClubMemberManageTable ParentClickedId={ClickedId} />
    </ClubTab>
  );
};
