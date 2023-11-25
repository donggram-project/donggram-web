//관리자 페이지 동아리 탭의 회원 관리 테이블
import { useCallback, useEffect, useState, useMemo, use } from "react";
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
  Container,
  ClubName,
  CompleteButtons,
  Cancle,
  Save,
} from "./AdminClubMemberManageTable.styled";
import { customAxios } from "@/Utils/customAxios";

//동아리 데이터 형식
interface DataRow {
  id: string;
  division: string;
  join_dated: string;
  name: string;
  status: string;
}
//선택된 동아리 정보
interface ParentProps {
  ParentClickedId: string;
  Club: string;
}

export const AdminClubMemberManageTable = ({
  ParentClickedId,
  Club,
}: ParentProps) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [click, setClick] = useState(true);

  //table 페이지
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = useMemo(() => {
    const slicedData = data.slice(indexOfFirstItem, indexOfLastItem);
    const shortage = itemsPerPage - slicedData.length;

    // 부족한 수만큼의 데이터를 이전 페이지에서 가져옴.
    if (shortage > 0 && indexOfFirstItem > 0) {
      const additionalData = data.slice(
        indexOfFirstItem - shortage,
        indexOfFirstItem
      );
      return additionalData.concat(slicedData);
    }

    return slicedData;
  }, [data, indexOfFirstItem, indexOfLastItem, itemsPerPage]);
  const totalPages = Math.ceil(data.length / itemsPerPage);
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
  //여기까지 페이지 관리

  //클릭된 동아리 정보 get
  useEffect(() => {
    customAxios
      .get(`admin/clubs/${ParentClickedId}/members`)
      .then((response) => {
        const filteredData = response.data.data.filter(
          (item: any) => item.status !== "rejected"
        );
        setData(filteredData);
      })
      .catch((error) => {});
  }, [ParentClickedId, click]);

  useEffect(() => {
    setClick(true);
  }, [click]);

  const handleReject = useCallback(
    (userId: string) => () => {
      customAxios
        .put(
          `/admin/clubs/members/reject?memberId=${userId}&clubId=${ParentClickedId}`
        )
        .then((res) => {
          setClick(false);
        })
        .catch(() => alert("거절에 실패하였습니다."));
    },
    [ParentClickedId]
  );
  const handleApprove = useCallback(
    (userId: string) => () => {
      customAxios
        .put(
          `/admin/clubs/members/approve?memberId=${userId}&clubId=${ParentClickedId}`
        )
        .then((res) => {
          setClick(false);
        })
        .catch(() => alert("승인에 실패하였습니다."));
    },
    [ParentClickedId]
  );
  return (
    <Container>
      <ClubName>{Club}</ClubName>
      <Table>
        <TableTitle>
          <TitleRow>ID</TitleRow>
          <TitleRow>이름</TitleRow>
          <TitleRow>학과</TitleRow>
          <TitleRow>신청일</TitleRow>
          <TitleRow>상태</TitleRow>
        </TableTitle>
        <TableContent>
          {currentData.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.values(item).map((value, colIndex) => {
                if (item.status != "rejected") {
                  if (colIndex < 4) {
                    return (
                      <TableText key={colIndex} isId={colIndex === 0}>
                        {value}
                      </TableText>
                    );
                  }
                  if (colIndex === 4) {
                    if (value === "approve") {
                      return <TableText key={colIndex}>{value}</TableText>;
                    } else {
                      return (
                        <CompleteButtons key={colIndex}>
                          <Cancle onClick={handleReject(item.id)}>거절</Cancle>
                          <Save onClick={handleApprove(item.id)}>승인</Save>
                        </CompleteButtons>
                      );
                    }
                  }
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
