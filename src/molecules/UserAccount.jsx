import { useEffect, useState } from "react";
import UserEditName from "../atoms/UserEditName";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditingUserName } from "../rtk/slices/authSlice";


const title = "Argent Bank";


const arrayOfAccounts = [
  {
    type: "Checking",
    number: "(x8349)",
    amount: "$2,082.79",
    amountDescription: "Available Balance",
  },
  {
    type: "Savings",
    number: "(x6712)",
    amount: "$10,928.42",
    amountDescription: "Available Balance",
  },
  {
    type: "Credit Card",
    number: "(x8349)",
    amount: "$184.30",
    amountDescription: "Current Balance",
  },
];


const UserAccount = () => {
  const firstName = useSelector((state) => state.auth.userFirstName) || localStorage.getItem("userFirstName");
  const lastName = useSelector((state) => state.auth.userLastName) || localStorage.getItem("userLastName");
  const [isLoading, setIsLoading] = useState(true);
  const isEditingUserName = useSelector((state) => state.auth.isEditingUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    firstName && lastName ? setIsLoading(false) : setIsLoading(true);
    console.log('iseEditingUserName', isEditingUserName)
  }, [firstName, lastName, setIsLoading, isEditingUserName]);


  const handleEditName = () => {
    dispatch(setIsEditingUserName(true));
  };


  const handleClickTransactions = () => {
    navigate("/user/transactions");
  };

  
  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditingUserName ? (
          <>
            <h1 className="welcome_text">
              Welcome back
              <br />
              {isLoading ? "Loading..." : `${firstName} ${lastName}!`}
            </h1>
            <button className="edit-button" onClick={handleEditName}>
              Edit Name
            </button>
          </>
        ) : (
          <h1 className="welcome_text">
            Welcome back
            <br />
            <UserEditName />
          </h1>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {arrayOfAccounts.map((account, index) => {
        return (
          <section className="account" key={`account${index}`}>
            <div className="account-content-wrapper">
              <h3 className="account-title">
                {title} {account.type} {account.number}
              </h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">
                {account.amountDescription}
              </p>
            </div>
            <div className="account-content-wrapper cta">
              <button
                className="transaction-button"
                onClick={handleClickTransactions}
              >
                View transactions
              </button>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default UserAccount;
