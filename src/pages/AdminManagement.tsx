import { AdminHeader } from "@/components/AdminHeader/AdminHeader";
import { UserManageTable } from "@/components/UserManageTable/UserManageTable";
import { UserInfo } from "@components/UserInfo/UserInfo";
import { ClubManageTable } from "@/components/ClubManageTable/ClubManageTable";
import { ClubInfo } from "@/components/ClubInfo/ClubInfo";

import styled from "@emotion/styled";
import { useState, useCallback, useEffect } from "react";
import { customAxios } from "@/Utils/customAxios";
import { useRouter } from "next/router";

const Tab = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 10rem;
`;
const Admin = styled.div`
  margin-bottom: 8rem;
`;

export default function AdminPage() {
  const router = useRouter();
  const [ClickedId, setClickedId] = useState("");
  const [ClickedStatus, setClickedStatus] = useState("");
  const HandleClicked = useCallback((id: string) => {
    setClickedId(id);
  }, []);
  const HandleStatus = useCallback((status: string) => {
    setClickedStatus(status);
  }, []);
  useEffect(() => {
    customAxios
      .get("/admin/members/all")
      .then(() => setIsAdmin(true))
      .catch(() => setIsAdmin(false));
  }, []);
  const [isAdmin, setIsAdmin] = useState<null | Boolean>(null);
  const [isUserPage, setIsUserPage] = useState(true);
  const [isClubInfo, setIsClubInfo] = useState(true);
  useEffect(() => {
    if (isAdmin === false) {
      router.push("/"); // 루트 페이지로 이동
      alert("관리자 권한이 없습니다.");
    }
  }, [isAdmin, router]);
  const handleTab = useCallback(() => {
    return isUserPage ? (
      <Tab>
        <UserManageTable ParentClickedId={HandleClicked} />
        <UserInfo ClickedId={ClickedId} />
      </Tab>
    ) : (
      <Tab>
        <ClubManageTable
          ParentClickedId={HandleClicked}
          HandleStatus={HandleStatus}
          ClickedStatus={ClickedStatus}
        />
        <ClubInfo
          ClickedId={ClickedId}
          ClickedStatus={ClickedStatus}
          isClubInfo={isClubInfo}
          setIsClubInfo={setIsClubInfo}
          handleStatus={HandleStatus}
        />
      </Tab>
    );
  }, [
    ClickedId,
    HandleClicked,
    isUserPage,
    isClubInfo,
    ClickedStatus,
    HandleStatus,
  ]);
  return isAdmin ? (
    <Admin>
      <AdminHeader isUserPage={isUserPage} setIsUserPage={setIsUserPage} />
      {handleTab()}
    </Admin>
  ) : null;
}
