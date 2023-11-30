const UserAccount = () => {

  //DEV Mocked data

  const firstName = "Tony"
  const lastName = "Jarvis"
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

  return (

    <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName} {lastName}!
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {arrayOfAccounts.map((account, index) => {
          return (
            <>
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
            </>
          )
        })}
    </main>
  )
}

export default UserAccount