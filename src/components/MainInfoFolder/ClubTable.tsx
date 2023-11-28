import React from "react";
import clubTableData from "../../data/clubTableData.json";
import styled from "@emotion/styled";
//테이블로 갈기

const TableContainer = styled.div`
  margin-top: 2rem;
  border-collapse: collapse;
  width: 30rem;
`;
const TableHeader = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.1rem solid #c1c7cd;
  padding: 1.6rem 1.2rem;
  gap: 0.8rem;
  align-self: stretch;
  background-color: #f2f4f8;
  text-align: left;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 0.1rem solid #c1c7cd;
  padding: 1.2rem;
  gap: -0.5rem;
  align-self: stretch;
  text-align: left;
`;
const HeaderText = styled.div`
  color: var(--cool-gray-100, #121619);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  width: 20rem;
  margin-left: 1rem;
`;
const BodyText = styled.div`
  color: var(--cool-gray-100, #121619);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  width: 15rem;
  margin-left: 1rem;
`;

const ClubTable = ({ clubList }: any) => {
  const sortedClubList = (Object.entries(clubList) as [string, string][]).sort(
    ([, status1], [, status2]) => {
      // 'approve'이면 앞으로, 'pending'이면 뒤로 정렬
      if (status1 === "approve") return -1;
      if (status2 === "approve") return 1;
      return 0; // 두 상태가 같으면 순서 변경 없음
    }
  );

  return (
    <TableContainer>
      <TableHeader>
        <HeaderText>동아리 이름</HeaderText>
        <HeaderText>상태</HeaderText>
      </TableHeader>

      {sortedClubList.map(([clubName, status]) => (
        <TableRow key={clubName}>
          <BodyText>{clubName}</BodyText>
          <BodyText>{status}</BodyText>
        </TableRow>
      ))}
    </TableContainer>
  );
};

export default ClubTable;
