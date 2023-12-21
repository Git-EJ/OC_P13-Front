import TopBar from "../organisms/TopBar";
import UserButtons from "../molecules/UserButtons";
import Footer from "../atoms/Footer";
import UserAccount from "../molecules/UserAccount";

const User = () => {
  return (
    <>
      <TopBar>
        <UserButtons />
      </TopBar>

      <UserAccount />

      <Footer />
    </>
  );
};

export default User;
