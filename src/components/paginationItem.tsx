const PaginationItem = ({ handleClick, ele, currentPage }: any) => {
  return (
    <li
      className={`${ele === currentPage ? "active-pagi" : ""}`}
      onClick={() => handleClick(ele)}
    >
      {ele}
    </li>
  );
};

export default PaginationItem;
