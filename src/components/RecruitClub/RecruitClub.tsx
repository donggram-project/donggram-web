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
  NoData,
  NoDataBox,
  NoDataText,
} from "./RecruitClub.styled";
import { useCallback, useEffect, useState } from "react";
import { customAxios } from "@/Utils/customAxios";

interface ClubData {
  clubId: string;
  college: string;
  division: string;
  clubName: string;
  recruitment: boolean;
}

interface ParentProps {
  displayNum: number;
}

export function RecruitClub({ displayNum }: ParentProps) {
  const [data, setData] = useState<ClubData[]>([]);
  const [filteredData, setFilteredData] = useState<ClubData[]>([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    customAxios
      .get("/clubs/all")
      .then((res) => {
        const filteredData = res.data.data.filter((orgData: ClubData) => {
          return orgData.recruitment === true; // return을 추가
        });
        setData(filteredData);
        setLastPage(Math.ceil(filteredData.length / displayNum) - 1);
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
              recruit="모집 중"
              college={data.college}
              department={data.division.replace("분과", "")}
              name={data.clubName}
              id={data.clubId}
            />
          </ClubContainer>
        );
      });
    } else {
      return (
        <NoDataBox>
          <NoData src={crying} alt="Have No Data" />
          <NoDataText>현재 모집 중인 동아리가 없습니다.</NoDataText>
        </NoDataBox>
      );
    }
  }, [filteredData]);
  return lastPage <= 0 ? (
    <PageContainer>
      <RecruitClubText>모집 중인 동아리</RecruitClubText>
      <Table>
        <Clubs>{printClubs()}</Clubs>
      </Table>
    </PageContainer>
  ) : (
    <PageContainer>
      <RecruitClubText>모집 중인 동아리</RecruitClubText>
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
