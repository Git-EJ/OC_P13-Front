import { useEffect, useState } from "react"
import TopBar from "./TopBar"
import UserConnectedButton from "../molecules/UserConnectedButton"
import Footer from "../atoms/Footer"

const arrayOfAccountsTransactions = [
  {
    accountNumber: "x1234",

    arrayOfTransactions: [
      {
        date: '2020-01-01', 
        type: 'Deposit',
        amount: 100, 
        description: 'OC Salary',

        additionalDetails:{
          transactionType: "bank transfer",
          category: "salary",
          notes:"",
        }
      },
      {
        date: '2021-01-03',
        type: 'Withdrawal',
        amount: 50.23,
        description: 'Groceries Open till late',

        additionalDetails:{
          transactionType: "Credit card purchase",
          category: "food and drink",
          notes:"",
        }
      },
      {
        date: '2020-01-02',
        type: 'Deposit',
        amount: 500,
        description: 'Cash deposit',

        additionalDetails:{
          transactionType: "Customer cash deposit",
          category: "cash deposit",
          notes:"",
        }
      },
      {
        date: '2022-10-01',
        type: 'Withdrawal',
        amount: 1000.99,
        description: 'OMG Computer',

        additionalDetails:{
          transactionType: "Credit card purchase",
          category: "electronics",
          notes:"",
        }
      },
      {
        date: '2021-06-03',
        type: 'Deposit',
        amount: 300,
        description: 'Refund from Amazon for order 1234567890',

        additionalDetails:{
          transactionType: "bank transfer",
          category: "refund",
          notes:"",
        }
      },
      {
        date: '2022-07-25',
        type: 'Withdrawal',
        amount: 800,
        description: 'Holiday to Avignon',
        additionalDetails:{
          transactionType: "bank transfer",
          category: "travel",
          notes:"",
        }
      },
    ]
  }
]



const UserTransactions = () => {
  
  let oldBalanceAmount = 0

  const sortedTransactionsByDate = () => {
    const allTransactions = arrayOfAccountsTransactions.flatMap((account) => account.arrayOfTransactions)
    return allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  
  const arrayOfSortedTransactions = sortedTransactionsByDate()
  
  const formatDate = (date) => {
    const format = { year: 'numeric', month: 'long', day: '2-digit' }
    return new Date(date).toLocaleDateString('en-US', format)
  }
  
  //TODO : need it or last transaction balance?????
  const accountBalance = arrayOfSortedTransactions.reduce((acc, transaction) => {
    if (transaction.type === "Deposit") {
      return acc + transaction.amount
    } else {
      return acc - transaction.amount
    }
  }, oldBalanceAmount)



  //TODO : better way to dit than .unshift ????
  const calculateAfterTransactionBalance = () => {

    const balances = []
    for (let i = arrayOfSortedTransactions.length - 1; i >= 0; i--) {
      const transaction = arrayOfSortedTransactions[i]
      transaction.type === "Deposit" ? (oldBalanceAmount += transaction.amount) : (oldBalanceAmount -= transaction.amount)
      balances.unshift(oldBalanceAmount)
    }
    return balances
  }

  const transactionBalance = calculateAfterTransactionBalance()


  console.log('accountBalance', accountBalance)

  return (
    <>
      <TopBar >
        <UserConnectedButton />
      </TopBar>

      {arrayOfAccountsTransactions.map((account, index) => (
        <main key={`account${index}`} className="account_wrapper">
          <div key= {`accountHeader${index}`} className="account_header_balance_container">
            <div className="account_header_balance_title">Argent Bank Transactions {`(${account.accountNumber})`}</div>
            <div className="account_header_balance_amount">$ {accountBalance.toFixed(2)}</div>
            <div className="account_header_balance_available"> Available Balance</div>
          </div>

          <div className="account_transactions_wrapper">
            {arrayOfSortedTransactions.map((transaction, index) => (
                <div key={`accountTransaction${index}`}className="account_transaction_container">
                  <div className="account_transaction_date">{formatDate(transaction.date)}</div>
                  <div className="account_transaction_description">{transaction.description}</div>
                  <div className="account_transaction_amount">
                    {transaction.type === 'Withdrawal' ? `- $${transaction.amount.toFixed(2)}` : `+ $${transaction.amount.toFixed(2)}`}
                  </div>
                  <div className="account_transaction_balance">${transactionBalance[index].toFixed(2)}</div> 
                </div>
            ))}
          </div>
        </main>
      ))}
      
      <Footer />
    </>
  )
}

export default UserTransactions