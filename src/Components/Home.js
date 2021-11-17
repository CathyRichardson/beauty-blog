import './Home.scss';
import makeupSquare from '../images/makeup.jpg'

function Home() {

  return (
    <div className="home">
      <main>
        <h1>Best in Beauty</h1>
        <p>Find the top skincare curated to your personal taste!</p>
        <button>Start Now</button>
      </main>
      <h2>Read reviews before you buy</h2>
      <section className="three-links">
        <img className="homepage-square"
          src={makeupSquare}
          alt="makeup items flatlay" />
        <h4>Skincare</h4>
        <img className="homepage-square"
          src={makeupSquare}
          alt="makeup items flatlay" />
        <h4>Makeup</h4>
        <img className="homepage-square"
          src={makeupSquare}
          alt="makeup items flatlay" />
        <h4>Haircare</h4>
      </section>
    </div>
  );
}

export default Home;
