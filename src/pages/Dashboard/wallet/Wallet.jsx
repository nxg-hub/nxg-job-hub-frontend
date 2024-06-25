import React, { useState, useMemo, useEffect, useContext } from 'react';
import './wallet.scss';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { useTable } from 'react-table';
import BalanceChart from './BalanceChart';
import WalletFilter from './WalletFilter';
import Arrow1Image from '../../../static/icons/Arrow 1.svg?react';
import Arrow9Image from '../../../static/icons/Arrow 9.svg?react';
import { UserContext } from '..';
import PaymentCard from './walletCard/PaymentCard';

function Wallet() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]); // State to hold the transaction data
  const baseUrl = 'http://localhost:8000/transactions';
  const user = useContext(UserContext);

  useEffect(() => {
    // Fetch transaction data when the component mounts
    axios.get(baseUrl)
      .then(response => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [baseUrl]);

  const columns = useMemo(() => [
    {
      Header: "Transaction Details",
      accessor: "name",
      Cell: ({ row }) => (
        <div className='table-details'>
          <div className="amount-detail">
            <div className="table-name-detail">
              <h3 className='table-name'>{row.original.name}</h3>
              <p className='table-description'>{row.original.description}</p>
            </div>
            <img src={row.original.img === "icons/Arrow 1.svg" ? Arrow1Image : Arrow9Image} alt="Arrow Icon" style={{width:'1.8rem', height:'auto', marginRight:'1rem'}} />
          </div>
        </div>
      ),
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: ({ row }) => (
        <div className='table-details'>
          <h3 className='table-amount'>{row.original.amount}</h3>
          <p className={row.original.transactionType === 'Credit' ? 'credit' : 'debit' }>{row.original.transactionType}</p>
        </div>
      ),
    },
    {
      Header: "Date",
      accessor: "transactionDate",
      Cell: ({ row }) => (
        <div className='table-details'>
          <h3>{row.original.transactionDate}</h3>
        </div>
      ),
    },
    {
      Header: "Time",
      accessor: "transactionTime",
      Cell: ({ row }) => (
        <div className='table-details'>
          <h3>{row.original.transactionTime}</h3>
        </div>
      ),
    }
  ], []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data })

  const handleSearch = (e) => {
    setSearch(e.target.value)
  };

  return (
    <div style={{background:'rgba(37, 150, 190, 0.13)', padding:' 30px'}}>
      <div className="wallet-container">
            <div className="wallet-main">
              <div className="wallet-profile">
                <h2>Wallet ID X123456789</h2>
                <div className="wallet-profile-pics">
                  <div className="wallet-profile-img">
                    {/* <img src={User} alt="User's identity" /> */}
                    {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="user" />
                ) : (
                  <CiUser className="user" />
                )}
                  </div>
                  <h3>{user.firstName} {user.lastName}</h3>
                </div>
              </div>
              <section className="wallet-cards">
                <div className="available-balance-card">
                  <BalanceChart/>
                </div>
                <div className="wallet-btns-card-details">
                  <div className="wallet-btns">
                    <button className='top-up'>Top-Up</button>
                    <button>Send</button>
                  </div>
                  <div className="card-details">
                    <h4>Update Card Details</h4>
                  </div>
                </div>
                <div className="virtual-card">
                  <PaymentCard />
                </div>
              </section>
              <section className="transact-search">
                <div className="transact-history">
                  <h4>Transaction History</h4>
                  <div className="search">
                   <div className="wallet-search">
                    <input 
                        type="search" 
                        placeholder='Search' 
                        className='dash-search-input'
                        onChange={handleSearch}
                        value={search}
                      />
                      <WalletFilter/>
                   </div>
                  </div>
                </div>
                <div className="transaction-table">
                  <table {...getTableProps()}>
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column) => (
                            <th {... column.getHeaderProps()}>
                                {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className='table-body'>
                      {rows.map((row) => {
                        prepareRow(row)
                        return (
                          <tr {...row.getRowProps()} className='table-row'>
                            {row.cells.map((cell) => (
                              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
      </div>
    </div>
  )
}

export default Wallet