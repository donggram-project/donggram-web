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
`;
const BodyText = styled.div`
  color: var(--cool-gray-100, #121619);
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  width: 15rem;
`;

const ClubTable = ({ clubList }) => {
  return (
    <TableContainer>
      <TableHeader>
        <HeaderText>동아리 이름</HeaderText>
      </TableHeader>

      {clubList &&
        Object.entries(clubList).map(([clubName]) => (
          <TableRow key={clubName}>
            <BodyText>{clubName}</BodyText>
          </TableRow>
        ))}
    </TableContainer>
  );
};

export default ClubTable;
