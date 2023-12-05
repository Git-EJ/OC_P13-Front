import { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import useUserProfile from "../api/Profile"
import UserEditName from "./UserEditName"

const title = "Argent Bank"

const arrayOfAccounts = [
  {
    type: "Checking",
    number: "(x8349)",
    amount: "$2,082.79",
    amountDescription: "Available Balance",
    button: "View transactions"
  },
  {
    type: "Savings",
    number: "(x6712)",
    amount: "$10,928.42",
    amountDescription: "Available Balance",
    button: "View transactions"
  },
  {
    type: "Credit Card",
    number: "(x8349)",
    amount: "$184.30",
    amountDescription: "Current Balance",
    button: "View transactions"
  }
]

const UserAccount = () => {

  const { user } = useContext(UserContext)
  const { profile } = useUserProfile()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  console.log('USER USER ', user)
  console.log('USER USER F&L: ',firstName, lastName)


  useEffect(() => {
    const fetchUserData = async() => {
      if (user && user.firstName && user.lastName) {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setIsLoading(false)
      } else {
        setIsLoading(true)
        await profile()
      }
    }

    fetchUserData()
  }, [user, profile])


  const handleEditName = () => {
    setIsEditing(true)
  }
  

  return (

    <main className="main bg-dark">
        <div className="header">
          {!isEditing ? (
            <>
              <h1>Welcome back
                <br />
                {isLoading ? "Loading..." : `${firstName} ${lastName}!`}
              </h1>
              <button className="edit-button" onClick={handleEditName}>Edit Name</button>
            </>
          ) : (
            <h1>Welcome back
              <br />
              <UserEditName setIsEditing={setIsEditing} />
            </h1>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        {arrayOfAccounts.map((account, index) => {
          return (
            <section className="account" key={`account${index}`}>
              <div className="account-content-wrapper">
                <h3 className="account-title">{title} {account.type} {account.number}</h3>
                <p className="account-amount">{account.amount}</p>
                <p className="account-amount-description">{account.amountDescription}</p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">{account.button}</button>
              </div>
            </section>
          )
        })}
    </main>
  )
}

export default UserAccount