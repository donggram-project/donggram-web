//필터링된 동아리 목록 표시
import { customAxios } from "@/Utils/customAxios";
import { Club } from "../Club/Club";
import { useCallback, useEffect, useMemo, useState } from "react";
import crying from "@public/crying.svg";
import {
  DisabledShiftButton,
  ShiftButton,
  ActiveNumberButton,
  NumberButton,
} from "@components/UserManageTable/UserManageTable.styled";
import {
  ClubTable,
  NoData,
  NoDataBox,
  NoDataText,
  PageTab,
} from "./Clubs.styled";

interface ParentProps {
  ids: number[];
  divisions: number[];
  allIds: number[];
  allDivisions: number[];
  recruit: boolean;
}
interface clubinfo {
  clubId: number;
  clubName: string;
  college: string;
  division: string;
  recruitment: boolean;
}

export const Clubs = ({
  ids,
  divisions,
  recruit,
  allIds,
  allDivisions,
}: ParentProps) => {
  const [clubData, setClubData] = useState<clubinfo[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<clubinfo[]>([]);
  //페이지
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = useMemo(() => {
    const slicedData = selectedClubs.slice(indexOfFirstItem, indexOfLastItem);
    const shortage = itemsPerPage - slicedData.length;

    // 부족한 수만큼의 데이터를 이전 페이지에서 가져옴.
    if (shortage > 0 && indexOfFirstItem > 0) {
      const additionalData = selectedClubs.slice(
        indexOfFirstItem - shortage,
        indexOfFirstItem
      );
      return additionalData.concat(slicedData);
    }

    return slicedData;
  }, [selectedClubs, indexOfFirstItem, indexOfLastItem, itemsPerPage]);
  const totalPages = Math.ceil(selectedClubs.length / itemsPerPage);
  const handlePageClick = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleNextClick = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }, [currentPage, totalPages]);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);
  const renderPagination = useCallback(() => {
    let pageNumbers = [];
    let startPage, endPage;

    if (totalPages <= 9) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 5) {
        startPage = 1;
        endPage = 9;
      } else if (currentPage > totalPages - 5) {
        startPage = totalPages - 8;
        endPage = totalPages;
      } else {
        startPage = currentPage - 4;
        endPage = currentPage + 4;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return (
      <PageTab>
        {currentPage === 1 ? (
          <DisabledShiftButton onClick={handlePrevClick}>
            &lt;&nbsp; Previous
          </DisabledShiftButton>
        ) : (
          <ShiftButton onClick={handlePrevClick}>
            &lt;&nbsp; Previous
          </ShiftButton>
        )}
        {pageNumbers.map((num) =>
          num === currentPage ? (
            <ActiveNumberButton key={num} onClick={() => handlePageClick(num)}>
              {num}
            </ActiveNumberButton>
          ) : (
            <NumberButton key={num} onClick={() => handlePageClick(num)}>
              {num}
            </NumberButton>
          )
        )}
        {currentPage >= totalPages || totalPages === 0 ? (
          <DisabledShiftButton onClick={handleNextClick}>
            Next &nbsp;&gt;
          </DisabledShiftButton>
        ) : (
          <ShiftButton onClick={handleNextClick}>Next &nbsp;&gt;</ShiftButton>
        )}
      </PageTab>
    );
  }, [
    currentPage,
    totalPages,
    handleNextClick,
    handlePageClick,
    handlePrevClick,
  ]);
  //여기까지
  const [collegeIds, setCollegeIds] = useState("");
  const [divisionIds, setDivisionIds] = useState("");

  useEffect(() => {
    if (ids.length > 0) {
      setCollegeIds(ids.join(","));
    } else {
      setCollegeIds(allIds.join(","));
    }
    if (divisions.length > 0) {
      setDivisionIds(divisions.join(","));
    } else {
      setDivisionIds(allDivisions.join(","));
    }
  }, [ids, divisions, allIds, allDivisions]);

  useEffect(() => {
    customAxios
      .get(`clubs?collegeIds=${collegeIds}&divisionIds=${divisionIds}`)
      .then((response) => {
        setClubData(response.data.data);
      })
      .catch((error) => {
        console.error("에러: ", error);
      });
  }, [collegeIds, divisionIds]);

  useEffect(() => {
    let filteredClubs = [...clubData];

    if (recruit) {
      filteredClubs = filteredClubs.filter((club) => club.recruitment === true);
    }

    setSelectedClubs(filteredClubs);
    setCurrentPage(1);
  }, [clubData, recruit]);

  const printClub = useCallback(() => {
    if (currentData.length > 0) {
      return currentData.map((club, i) => {
        let recruit = "";
        if (club.recruitment === true) {
          recruit = "모집 중";
        } else {
          recruit = "모집 X";
        }
        let department = club.division.replace("분과", "");
        return (
          <Club
            recruit={recruit}
            college={club.college}
            department={department}
            name={club.clubName}
            id={club.clubId.toString()}
            key={i}
          />
        );
      });
    } else {
      return (
        <NoDataBox>
          <NoData src={crying} alt="Have No Data" />
          <NoDataText>조건을 만족하는 동아리가 존재하지 않습니다.</NoDataText>
        </NoDataBox>
      );
    }
  }, [currentData]);
  return (
    <>
      <ClubTable>{printClub()}</ClubTable>
      {renderPagination()}
    </>
  );
};
