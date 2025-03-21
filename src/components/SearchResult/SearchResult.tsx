import { Club } from "@components/Club/Club";
import left from "@public/left_fill.svg";
import disabled_left from "@public/left.svg";
import right from "@public/right_fill.svg";
import disabled_right from "@public/right.svg";
import {
  PageContainer,
  RecruitClubText,
  ClubContainer,
  Table,
  Button,
  Clubs,
  NoDataText,
  NoData,
  NoDataBox,
} from "./SearchResult.styled";
import { useCallback, useEffect, useState } from "react";
import crying from "@public/crying.svg";

interface ClubData {
  clubId: string;
  college: string;
  division: string;
  clubName: string;
  clubImage: string;
  recruitment: boolean;
}

interface ParentProps {
  displayNum: number;
  ResultClubs: ClubData[];
}

export function SearchResult({ displayNum, ResultClubs }: ParentProps) {
  const [data, setData] = useState<ClubData[]>([]);
  const [filteredData, setFilteredData] = useState<ClubData[]>([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  useEffect(() => {
    const filteredData = ResultClubs;
    setData(filteredData);
    setLastPage(Math.ceil(filteredData.length / displayNum) - 1);
  }, [displayNum, ResultClubs]);
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
    return filteredData.map((data, idx) => {
      return (
        <ClubContainer key={idx}>
          <Club
            recruit={data.recruitment === true ? "모집 중" : "모집 X"}
            college={data.college}
            department={data.division.replace("분과", "")}
            name={data.clubName}
            id={data.clubId}
            image={data.clubImage}
          />
        </ClubContainer>
      );
    });
  }, [filteredData]);
  return lastPage < 0 ? (
    <NoDataBox>
      <NoData src={crying} alt="Have No Data" />
      <NoDataText>검색 결과가 존재하지 않습니다.</NoDataText>
    </NoDataBox>
  ) : (
    <PageContainer>
      <RecruitClubText>검색된 동아리 목록</RecruitClubText>
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
