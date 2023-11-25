import styled from "@emotion/styled";
import Image from "next/image";

export const NoDataBox = styled.div`
  display: flex;
  align-items: center;
`;

export const NoData = styled(Image)`
  width: 30rem;
  height: 30rem;
`;

export const NoDataText = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: grey;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -3rem;
  margin-top: 3rem;
  margin-bottom: -1rem;
`;
export const RecruitClubText = styled.div`
  margin-left: -80rem;
  margin-bottom: 1.7rem;
  font-size: 2.4rem;
  font-weight: 400;
`;

export const Button = styled(Image)`
  width: 3rem;
  height: 3rem;
  margin-bottom: 3rem;
`;
export const Clubs = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100rem;
  margin-left: 4.5rem;
`;
export const ClubContainer = styled.div`
  margin-left: 1.3rem;
`;
export const Table = styled.div`
  display: flex;
  align-items: center;
`;
