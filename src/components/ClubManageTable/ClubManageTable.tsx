//어드민 페이지의 동아리 관리 테이블
import { useCallback, useEffect, useState, useMemo } from "react";
import { AdminSearchBox } from "../AdminSearchBox/AdminSearchBox";
import { AdminClubSelector } from "../AdminClubSelector/AdminClubSelector";
import {
  PageTab,
  DisabledShiftButton,
  ShiftButton,
  ActiveNumberButton,
  NumberButton,
  Table,
  TableTitle,
  TitleRow,
  TableContent,
  TableRow,
  TableText,
  SearchLine,
  Container,
  Header,
  Status,
  StatusText,
  StatusLabel,
} from "./ClubManageTable.styled";
import { customAxios } from "@/Utils/customAxios";

interface DataRow {
  id: string;
  club_name: string;
  student_name: string;
  major: string;
  apply_date: string;
  status: string;
}

interface ParentProps {
  ParentClickedId: (id: string) => void;
  HandleStatus: (status: string) => void;
  ClickedStatus: string;
}

export const ClubManageTable = ({
  ParentClickedId,
  HandleStatus,
  ClickedStatus,
}: ParentProps) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [originData, setOriginData] = useState<DataRow[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("ID");
  const [searchStatus, setSearchStatus] = useState("approve");
  const [clickedId, setClickedId] = useState<string>();

  const handleClicked = useCallback(
    (id: string) => {
      setClickedId(id);
      ParentClickedId(id);
    },
    [ParentClickedId]
  );
  const handleSearchClick = useCallback(() => {
    setSearchText(inputText);
    setCurrentPage(1);
  }, [inputText]);
  const handleOptionChange = useCallback((Option: string) => {
    setSearchOption(Option);
    setSearchText("");
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (!searchText) return true;

      let valueToSearch = "";
      switch (searchOption) {
        case "ID":
          valueToSearch = item.id;
          break;
        case "소속":
          valueToSearch = item.major;
          break;
        case "상태":
          valueToSearch = item.status;
          break;
        case "이름":
          valueToSearch = item.club_name;
          break;
        default:
          break;
      }

      return valueToSearch
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
  }, [data, searchText, searchOption]);

  //table 페이지
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = useMemo(() => {
    const slicedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const shortage = itemsPerPage - slicedData.length;

    // 부족한 수만큼의 데이터를 이전 페이지에서 가져옴.
    if (shortage > 0 && indexOfFirstItem > 0) {
      const additionalData = filteredData.slice(
        indexOfFirstItem - shortage,
        indexOfFirstItem
      );
      return additionalData.concat(slicedData);
    }

    return slicedData;
  }, [filteredData, indexOfFirstItem, indexOfLastItem, itemsPerPage]);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
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
        {currentPage >= totalPages ? (
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

  useEffect(() => {
    customAxios
      .get("admin/clubs/all")
      .then((response) => {
        setOriginData(response.data.data);
      })
      .catch((error) => console.error("에러:", error));
  }, [handleClicked, ClickedStatus]);

  useEffect(() => {
    const filteredData = originData.filter((item) => {
      return item.status === searchStatus;
    });
    setData(filteredData);
  }, [searchStatus, originData]);

  return (
    <Container>
      <Header>
        <SearchLine>
          <AdminClubSelector onOptionChange={handleOptionChange} />
          <AdminSearchBox
            onSearchChange={setInputText}
            onSearchClick={handleSearchClick}
          />
        </SearchLine>
        <Status>
          <StatusLabel>
            <input
              type="radio"
              name="status"
              value="approve"
              onChange={(e) => setSearchStatus(e.target.value)}
              checked={searchStatus === "approve"}
            />
            <StatusText>승인</StatusText>
          </StatusLabel>
          <StatusLabel>
            <input
              type="radio"
              name="status"
              value="rejected"
              onChange={(e) => setSearchStatus(e.target.value)}
              checked={searchStatus === "rejected"}
            />
            <StatusText>거절</StatusText>
          </StatusLabel>
          <StatusLabel>
            <input
              type="radio"
              name="status"
              value="pending"
              onChange={(e) => setSearchStatus(e.target.value)}
              checked={searchStatus === "pending"}
            />
            <StatusText>대기</StatusText>
          </StatusLabel>
        </Status>
      </Header>
      <Table>
        <TableTitle>
          <TitleRow isId>고유ID</TitleRow>
          <TitleRow>동아리 이름</TitleRow>
          <TitleRow>소속</TitleRow>
          <TitleRow>신청일</TitleRow>
          <TitleRow>상태</TitleRow>
        </TableTitle>
        <TableContent>
          {currentData.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={() => {
                handleClicked(item.id), HandleStatus(item.status);
              }}
              clicked={item.id === clickedId}
            >
              {Object.values(item).map((value, colIndex) => {
                if (colIndex != 2 && colIndex != 6) {
                  return (
                    <TableText key={colIndex} isId={colIndex === 0}>
                      {value}
                    </TableText>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableContent>
        {renderPagination()}
      </Table>
    </Container>
  );
};
