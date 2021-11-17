import './Home.scss';
import makeupSquare from '../images/makeup.jpg'
import skincareSquare from '../images/manSinkSquare.jpg'
import hairSquare from '../images/hairSquare.jpg'
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div className="home">
      <main>
        <h1>Best in Beauty</h1>
        <p>Find the top skincare curated to your personal taste!</p>
        <Link to='/beauty/skincare'><button>Start Now</button></Link>
      </main>
      <h2>Read reviews before you buy</h2>
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
    </div>
  );
}

export default Home;
