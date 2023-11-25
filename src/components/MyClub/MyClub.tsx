import { Club } from "@components/Club/Club";
import left from "@public/left_fill.svg";
import disabled_left from "@public/left.svg";
import right from "@public/right_fill.svg";
import disabled_right from "@public/right.svg";
import crying from "@public/crying.svg";
import {
  PageContainer,
  RecruitClubText,
  ClubContainer,
  Table,
  Button,
  Clubs,
  NoDataBox,
  NoData,
  NoDataText,
} from "./MyClub.styled";
import { useCallback, useEffect, useState } from "react";
import { customAxios } from "@/Utils/customAxios";

interface ClubData {
  clubId: string;
  college: string;
  division: string;
  clubName: string;
  recruitment: boolean;
  clubImage: string;
}

interface ParentProps {
  displayNum: number;
}

export function MyClub({ displayNum }: ParentProps) {
  const [data, setData] = useState<ClubData[]>([]);
  const [filteredData, setFilteredData] = useState<ClubData[]>([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    customAxios
      .get("/member/clubs")
      .then((res) => {
        const data = res.data.data;
        setData(data);
        setLastPage(Math.ceil(data.length / displayNum) - 1);
      })
      .catch((error) => {
        console.error("에러: ", error);
      });
  }, [displayNum]);
  useEffect(() => {
    let dataSet;
    if (page === lastPage) {
      const startIndex = Math.max(
        lastPage * displayNum - (displayNum - (data.length % displayNum)),
        0
      );
      dataSet = data.slice(
        startIndex,
        lastPage * displayNum + (data.length % displayNum)
      );
    } else {
      dataSet = data.slice(page * displayNum, (page + 1) * displayNum);
    }

    setFilteredData(dataSet);
  }, [data, page, lastPage, displayNum]);
  const onLeftClick = useCallback(() => {
    if (page >= 1) setPage(page - 1);
  }, [page]);
  const onRightClick = useCallback(() => {
    if (page < lastPage) setPage(page + 1);
  }, [lastPage, page]);
  const printClubs = useCallback(() => {
    if (filteredData.length > 0) {
      return filteredData.map((data, idx) => {
        return (
          <ClubContainer key={idx}>
            <Club
              recruit={data.recruitment ? "모집 중" : "모집 X"}
              college={data.college}
              department={data.division.replace("분과", "")}
              name={data.clubName}
              id={data.clubId}
              image={data.clubImage}
            />
          </ClubContainer>
        );
      });
    } else {
      return (
        <NoDataBox>
          <NoData src={crying} alt="Have No Data" />
          <NoDataText>가입된 동아리가 없습니다.</NoDataText>
        </NoDataBox>
      );
    }
  }, [filteredData]);
  return page === 0 ? (
    <PageContainer>
      <RecruitClubText>내 동아리</RecruitClubText>
      <Table>
        <Clubs>{printClubs()}</Clubs>
      </Table>
    </PageContainer>
  ) : (
    <PageContainer>
      <RecruitClubText>내 동아리</RecruitClubText>
      <Table>
        <Button
          src={page === 0 ? disabled_left : left}
          alt="left_button"
          onClick={onLeftClick}
          style={{ cursor: page === 0 ? "default" : "pointer" }}
        />
        <Clubs>{printClubs()}</Clubs>
        <Button
          src={page === lastPage ? disabled_right : right}
          alt="right_button"
          onClick={onRightClick}
          style={{ cursor: page === lastPage ? "default" : "pointer" }}
        />
      </Table>
    </PageContainer>
  );
}
