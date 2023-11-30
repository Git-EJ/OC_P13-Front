import TopBar from "../organisms/TopBar";
import UserConnectedButton from "../molecules/UserConnectedButton";
import Footer from "../atoms/Footer";
import UserAccount from "../atoms/UserAccount";


const User = () => {
  return (
    <>
      <TopBar>
        <UserConnectedButton />
      </TopBar>

      <UserAccount />

      <Footer />
    </>
  );
};

export default User;
