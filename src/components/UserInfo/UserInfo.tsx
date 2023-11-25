import { AuthoritySelector } from "../AuthoritySelector/AuthoritySelector";
import { AdminMajorSelector } from "../AdminMajorSelector/AdminMajorSelector";
import placeholder from "@public/placeholder.png";
import React, {
  Dispatch,
  EventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  UserContainer,
  UserImage,
  Body,
  Text,
  Value,
  Clubs,
  ClubBox,
  Buttons,
  Delete,
  CompleteButtons,
  Cancle,
  Save,
  Majors,
  Placeholder,
} from "./UserInfo.styled";
import { customAxios } from "@/Utils/customAxios";
import { useRouter } from "next/router";

interface DataRow {
  memberId: string;
  studentId: string;
  memberName: string;
  major1: string;
  college1: string;
  college2: string | null;
  role: string;
  major2: string;
  clubList: Club[];
  profileImage: string;
}

interface Club {
  clubKey: string;
  clubValue: string;
}

interface ParentProps {
  ClickedId: string;
}

export const UserInfo = ({ ClickedId }: ParentProps) => {
  const router = useRouter();
  const [user, setUser] = useState<DataRow>();
  const [changedUser, setChangedUser] = useState<DataRow>();

  useEffect(() => {
    customAxios
      .get(`/admin/members/${ClickedId}`)
      .then((response) => {
        setUser(response.data.data), setChangedUser(response.data.data);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  }, [ClickedId]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedName = e.target.value;
      if (changedUser) {
        setChangedUser({ ...changedUser, memberName: changedName });
      }
    },
    [changedUser]
  );
  const handleStudentIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const changedStuendId = e.target.value;
      if (changedUser) {
        setChangedUser({ ...changedUser, studentId: changedStuendId });
      }
    },
    [changedUser]
  );
  const handleMajorChange = useCallback(
    (changedMajor: string) => {
      if (changedUser) {
        setChangedUser({ ...changedUser, major1: changedMajor });
      }
    },
    [changedUser]
  );
  const handleMajor2Change = useCallback(
    (changedMajor2: string) => {
      if (changedUser) {
        setChangedUser({ ...changedUser, major2: changedMajor2 });
      }
    },
    [changedUser]
  );
  const handleClubsChange = (changedClub: Club) => {
    if (changedUser) {
      const updatedclubList = [...changedUser.clubList, changedClub];
      setUser({ ...changedUser, clubList: updatedclubList });
    }
  };
  const handleAuthorityChange = useCallback(
    (changedAuthority: string) => {
      if (changedUser) {
        setChangedUser({ ...changedUser, role: changedAuthority });
      }
    },
    [changedUser]
  );
  const handelDeleteClick = useCallback(() => {
    customAxios
      .delete(`admin/members/${ClickedId}`)
      .then(() => router.reload())
      .catch((error) => console.error("에러: ", error));
  }, [router, ClickedId]);
  const handelCancleClick = useCallback(() => {
    setChangedUser(user);
  }, [user]);
  const handleSaveClick = useCallback(() => {
    setUser(changedUser);
    customAxios
      .put(`admin/members/${ClickedId}`, {
        studentId: changedUser?.studentId,
        memberName: changedUser?.memberName,
        college1: changedUser?.college1,
        college2: changedUser?.college2,
        major1: changedUser?.major1,
        major2: changedUser?.major2,
        role: changedUser?.role,
        profile: changedUser?.profileImage,
      })
      .then(() => router.reload())
      .catch((error) => console.error("에러: ", error));
  }, [router, changedUser, ClickedId]);
  const PrintImage = useCallback(() => {
    if (changedUser) {
      if (changedUser.profileImage) {
        return <UserImage src={changedUser.profileImage} alt="userImage" />;
      }
    }
    return <Placeholder src={placeholder} alt="userImage" priority />;
  }, [changedUser]);

  return changedUser ? (
    <UserContainer>
      <PrintImage />
      <Body>
        <Text>이름</Text>
        <Value
          value={changedUser.memberName ? changedUser.memberName : ""}
          type="text"
          onChange={handleNameChange}
        />
        <Text>학번</Text>
        <Value
          value={changedUser.studentId ? changedUser.studentId : ""}
          type="text"
          onChange={handleStudentIdChange}
        />
        <Text>학과</Text>
        <Majors>
          <AdminMajorSelector
            major={changedUser.major1 ? changedUser.major1 : ""}
            major2={changedUser.major2 ? changedUser.major2 : ""}
            onMajorChange={handleMajorChange}
            onMajor2Change={handleMajor2Change}
          />
        </Majors>
        <Text>소속 동아리</Text>
        <Clubs>
          {changedUser && changedUser.clubList
            ? Object.entries(changedUser.clubList)
                .filter(([clubKey, club]) => club.clubValue === "approved")
                .map(([clubKey], index) => (
                  <ClubBox key={index}>{clubKey}</ClubBox>
                ))
            : ""}
        </Clubs>
        <Text>권한</Text>
        <AuthoritySelector
          authority={changedUser.role ? changedUser.role : ""}
          onAuthorityChange={handleAuthorityChange}
        />
        <Buttons>
          <Delete onClick={handelDeleteClick}>회원삭제</Delete>
          <CompleteButtons>
            <Cancle onClick={handelCancleClick}>취소</Cancle>
            <Save onClick={handleSaveClick}>저장</Save>
          </CompleteButtons>
        </Buttons>
      </Body>
    </UserContainer>
  ) : (
    <UserContainer>
      <PrintImage />
      <Body>
        <Text>이름</Text>
        <Value value={""} type="text" onChange={handleNameChange} />
        <Text>학번</Text>
        <Value value={""} type="text" onChange={handleStudentIdChange} />
        <Text>학과</Text>
        <Majors>
          <AdminMajorSelector
            major={""}
            major2={""}
            onMajorChange={handleMajorChange}
            onMajor2Change={handleMajor2Change}
          />
        </Majors>
        <Text>소속 동아리</Text>
        <Clubs>{""}</Clubs>
        <Text>권한</Text>
        <AuthoritySelector
          authority={""}
          onAuthorityChange={handleAuthorityChange}
        />
        <Buttons>
          <Delete onClick={handelDeleteClick}>회원삭제</Delete>
          <CompleteButtons>
            <Cancle onClick={handelCancleClick}>취소</Cancle>
            <Save onClick={handleSaveClick}>저장</Save>
          </CompleteButtons>
        </Buttons>
      </Body>
    </UserContainer>
  );
};
