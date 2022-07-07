import { useEffect, useState } from "react";
import PaginationItem from "../../components/paginationItem";
import UserDetail from "../../components/userDetail";
import { IUser, products } from "../../services/userService";
import queryString from "query-string";
import "./user.scss";

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(10);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [userInPage, setUserInPage] = useState<IUser[]>([]);
  const pageNumbers = [];
  const [isUp, setIsUp] = useState(true);
  const [isUpUN, setIsUpUN] = useState(true);
  const [search, setSearch] = useState(
    queryString.parse(window.location.search)
  );
  let paginationList: any[] = [];

  useEffect(() => {
    const getUser = async () => {
      const res = await products({ results: 100 });
      setUsers(res);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (search.result) setCurrentPage(Number(search.result));

    if (users) {
      setUserInPage(
        users
          .slice(0, 10)
          .sort((a, b) => a.firstName!.localeCompare(b.firstName!))
      );
      setTotalItem(Math.round(users.length / pages));
    }
  }, [users]);

  if (totalItem) {
    for (let i = 0; i <= totalItem; i++) {
      pageNumbers.push(i);
    }
  }

  const lengPageNumbers = pageNumbers.length - 1;
  if (totalItem > 7) {
    if (currentPage < 5)
      paginationList = [
        ...pageNumbers.slice(1, 6),
        "...",
        pageNumbers[lengPageNumbers],
      ];
    else if (currentPage + 5 > pageNumbers[lengPageNumbers])
      paginationList = [
        1,
        "...",
        ...pageNumbers.slice(
          pageNumbers[lengPageNumbers] - 4,
          pageNumbers[lengPageNumbers + 1]
        ),
      ];
    else if (currentPage >= 5 && currentPage + 2 < pageNumbers[lengPageNumbers])
      paginationList = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        pageNumbers[lengPageNumbers],
      ];
  } else {
    paginationList = [...pageNumbers.slice(1)];
  }

  const handleClick = (cPage: number) => {
    setCurrentPage(cPage);
    setSearch({ result: `${cPage}` });
    setUserInPage(users.slice((cPage - 1) * 10, cPage * 10));
    window.history.replaceState(null, "New Page Title", "/?result=" + cPage);
  };

  const sortUsers = (nameSort: string) => {
    if (isUp === true && nameSort === "FN") {
      setIsUp(!isUp);
      setUserInPage([
        ...userInPage.sort((a, b): any => {
          if (a.firstName! < b.firstName!) return -1;
          if (a.firstName! > b.firstName!) return 1;
          return 0;
        }),
      ]);
    } else if (isUpUN === true && nameSort === "UN") {
      setIsUpUN(!isUpUN);
      setUserInPage([
        ...userInPage.sort((a, b): any => {
          if (a.userName! < b.userName!) return -1;
          if (a.userName! > b.userName!) return 1;
          return 0;
        }),
      ]);
    } else {
      nameSort === "FN" ? setIsUp(!isUp) : setIsUpUN(!isUpUN);
      setUserInPage([...userInPage.reverse()]);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr className="table-header">
            <th>STT</th>
            <th>
              <div className="sort-by" onClick={() => sortUsers("FN")}>
                Full Name{" "}
                <img
                  className="arrow-icon"
                  src={`./image/icon/${
                    isUp ? "up-arrow.png" : "down-arrow.png"
                  }`}
                  alt=""
                />
              </div>
            </th>
            <th>
              <div className="sort-by" onClick={() => sortUsers("UN")}>
                Username{" "}
                <img
                  className="arrow-icon"
                  src={`./image/icon/${
                    isUpUN ? "up-arrow.png" : "down-arrow.png"
                  }`}
                  alt=""
                />
              </div>
            </th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          <>
            {userInPage &&
              userInPage.map((ele, idx) => {
                return (
                  <UserDetail
                    key={idx}
                    {...{
                      idx,
                      title: ele.title,
                      firstName: ele.firstName,
                      lastName: ele.lastName,
                      userName: ele.userName,
                      thumbnail: ele.thumbnail,
                    }}
                  />
                );
              })}
          </>
        </tbody>
      </table>
      <ul className="pagination">
        <li
          onClick={() => {
            currentPage > 1 && handleClick(currentPage - 1);
          }}
        >
          &lt;
        </li>
        {paginationList &&
          paginationList.map((ele, idx) => {
            return (
              <PaginationItem
                key={idx}
                {...{ handleClick, ele, currentPage }}
              />
            );
          })}
        <li
          onClick={() => {
            currentPage < totalItem && handleClick(currentPage + 1);
          }}
        >
          &gt;
        </li>
      </ul>
    </>
  );
};

export default User;
