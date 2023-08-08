import { useEffect, useState } from "react";
import { AdminSearchBox } from "../AdminSearchBox/AdminSearchBox";
import { AdminSelector } from "../AdminSelector/AdminSelector";
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
} from "./UserManageTable.styled";

interface DataRow {
  id: string;
  name: string;
  studentId: string;
  major: string;
  authority: string;
}

export const UserManageTable = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchOption, setSearchOption] = useState("ID");

  const handleSearchClick = () => {
    setSearchText(inputText);
  };
  const handleOptionChange = (Option: string) => {
    setSearchOption(Option);
    setSearchText("");
  };

  const filteredData = data.filter((item) => {
    if (!searchText) return true;

    let valueToSearch = "";
    switch (searchOption) {
      case "ID":
        valueToSearch = item.id;
        break;
      case "이름":
        valueToSearch = item.name;
        break;
      case "학번":
        valueToSearch = item.studentId;
        break;
      case "학과":
        valueToSearch = item.major;
        break;
      case "권한":
        valueToSearch = item.authority;
        break;
      default:
        break;
    }

    return valueToSearch.toLowerCase().includes(searchText.toLowerCase());
  });

  //table 페이지
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (() => {
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
  })();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const renderPagination = () => {
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
        {currentPage === totalPages ? (
          <DisabledShiftButton onClick={handleNextClick}>
            Next &nbsp;&gt;
          </DisabledShiftButton>
        ) : (
          <ShiftButton onClick={handleNextClick}>Next &nbsp;&gt;</ShiftButton>
        )}
      </PageTab>
    );
  };
  //여기까지

  useEffect(() => {
    import(`../../data/userManageData.json`)
      .then((data) => setData(data.default))
      .catch((error) => console.error("에러 발생:", error));
  }, []);

  return (
    <Container>
      <SearchLine>
        <AdminSelector onOptionChange={handleOptionChange} />
        <AdminSearchBox
          onSearchChange={setInputText}
          onSearchClick={handleSearchClick}
        />
      </SearchLine>
      <Table>
        <TableTitle>
          <TitleRow isId>고유ID</TitleRow>
          <TitleRow>이름</TitleRow>
          <TitleRow>학번</TitleRow>
          <TitleRow>학과</TitleRow>
          <TitleRow>권한</TitleRow>
        </TableTitle>
        <TableContent>
          {currentData.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(item).map((value, colIndex) => (
                <TableText key={colIndex} isId={colIndex === 0}>
                  {value}
                </TableText>
              ))}
            </TableRow>
          ))}
        </TableContent>
        {renderPagination()}
      </Table>
    </Container>
  );
};
