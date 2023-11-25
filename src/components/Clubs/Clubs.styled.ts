import Image from "next/image";
import styled from "styled-components";

export const PageTab = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 86rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-weight: 500;
  font-size: 1.6rem;
`;
export const ClubTable = styled.div`
  margin-top: 4rem;
  margin-left: 3.3rem;
  display: flex;
  flex-wrap: wrap;
  width: 95rem;
`;

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
