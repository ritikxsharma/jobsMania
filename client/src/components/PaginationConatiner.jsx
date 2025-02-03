import React from "react";
import { useAllJobsContext } from "../pages/AllJobs";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrapper } from "../assets/wrappers/PaginationContainer";

const PaginationConatiner = () => {
  const {
    data: { totalPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: totalPages }, (x, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handlePrevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 1) prevPage = 1;
    console.log(prevPage);

    handlePageChange(prevPage);
  };

  const handleNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > totalPages) nextPage = totalPages;
    console.log(nextPage);

    handlePageChange(nextPage);
  };

  const addPagesButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${pageNumber === currentPage && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageBtns = [];

    //first page
    pageBtns.push(
      addPagesButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    //dots
    if(currentPage > 3){
      pageBtns.push(<span className="page-btn dots" key='dots-1'>...</span>)
    }

    // one before current page
    if(currentPage !== 1 && currentPage !== 2){
      pageBtns.push(
        addPagesButton({ pageNumber: currentPage - 1, activeClass: true })
      );
    }

    //current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageBtns.push(
        addPagesButton({ pageNumber: currentPage, activeClass: true })
      );
    }

    //one after current page
    if(currentPage !== totalPages && currentPage !== totalPages - 1){
      pageBtns.push(
        addPagesButton({ pageNumber: currentPage + 1, activeClass: true })
      );
    }

    if(currentPage < totalPages - 2){
      pageBtns.push(<span className="page-btn dots" key='dots+1'>...</span>)
    }

    //last page
    pageBtns.push(
      addPagesButton({
        pageNumber: totalPages,
        activeClass: currentPage === totalPages,
      })
    );
    return pageBtns;
  };

  return (
    <Wrapper>
      <button className="btn prev-btn" onClick={handlePrevPage}>
        <HiChevronLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button className="btn next-btn" onClick={handleNextPage}>
        <HiChevronRight />
        next
      </button>
    </Wrapper>
  );
};

export default PaginationConatiner;
