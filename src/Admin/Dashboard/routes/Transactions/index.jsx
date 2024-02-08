import { useState } from "react";
import s from "./index.module.scss";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { GoKebabHorizontal } from "react-icons/go";
const Transactions = () => {
  const transactions = [
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
    {
      id: "4567890311",
      description: "Deposited into wallet",
      amount: "50,000",
      date: Date.now(),
    },
  ];
  const [search, setSearch] = useState("");
  const handleSearch = () => {};
  const showOptions = () => {};
  return (
    <div className={s.Transactions}>
      <div className={s.Header}>
        <div className={s.searchBar}>
          <input
            className={s.searchInput}
            type="search"
            placeholder={"Search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch onClick={handleSearch} />
        </div>
        <CiMenuKebab title={"More"} onClick={showOptions} />
      </div>
      <div>
        <div className={s.Title}>
          <h2>Recent Transactions</h2>
          <MdOutlineSettingsInputComponent />
        </div>
        <div className={s.TableWrapper}>
          <table className={s.Table}>
            <thead>
              <th>ID</th>
              <th>Description</th>
              <th>
                Amount <small>(NGN)</small>
              </th>
              <th>Date</th>
              <th ></th>
            </thead>
            <tbody>
              {transactions.map((transaction, i) => (
                <tr className={s.TableRow} key={i}>
                  <td>{transaction.id}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.date}</td>
                  <td width={2}><GoKebabHorizontal /></td>
                  {/* <td>
                    <span>{transaction.date}</span>
                  <GoKebabHorizontal />
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
