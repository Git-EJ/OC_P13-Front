import Footer from "../atoms/Footer";
import HomeFeatures from "../atoms/HomeFeatures";
import NotConnectedButton from "../molecules/UserNotConnectedButton";
import TopBar from "../organisms/TopBar";


const Home = () => {
  return (
    <>
      <TopBar>
        <NotConnectedButton />
      </TopBar>

      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <HomeFeatures />
      </main>

      <Footer />
    </>
  );
};

export default Home;
