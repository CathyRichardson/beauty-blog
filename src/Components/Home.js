import './Home.scss';
import makeupSquare from '../images/makeupR.jpg'
import skincareSquare from '../images/manSinkSquareR.jpg'
import hairSquare from '../images/hairSquareR.jpg'
import beautyProduct from '../images/bottleAndRoseR.jpg'
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className="home">
      <main>
        <h1>Best in Beauty</h1>
        <p>Find the top skincare curated to your personal taste!</p>
        <Link to='/beauty/skincare'><button>Start Now</button></Link>
      </main>
      <h2>Share Your Experience </h2>
      <section className="three-links">
        <Link to='/beauty/skincare' className="home-link">
          <img className="homepage-square"
            src={skincareSquare}
            alt="man washing his face" />
          <h4>Skincare</h4>
        </Link>
        <Link to='/beauty/makeup' className="home-link">
          <img className="homepage-square"
            src={makeupSquare}
            alt="makeup items flatlay" />
          <h4>Makeup</h4>
        </Link>
        <Link to='/beauty/haircare' className="home-link">
          <img className="homepage-square"
            src={hairSquare}
            alt="girl with long curly hair" />
          <h4>Haircare</h4>
        </Link>
      </section>
      <section className="overlay">
        <h2>Read reviews before you buy</h2>
      </section>
      <section className="one-pic">
        <h2>Find the best products for all your beauty needs</h2>
        <img className="homepage-one-pic"
          src={beautyProduct}
          alt="pump bottle displayed with roses and a rolled up towel to the side" />
      </section>
      <section className="no-pic">
        <h2>Make your beauty routine better today!</h2>
        <Link to='/beauty/skincare'><button className="home-button">Get Started</button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
