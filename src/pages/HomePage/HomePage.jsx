import { Link } from "react-router-dom";
import css from "./HomePage.module.css"
import url from "../../assets/img/camper.jpg"


const HomePage = () => {


    return <>

<h1 className={css.title}>Discover the Freedom of the Open Road with Our Camper Rentals</h1>
<div className={css.wrapper}>
    <img src={url} alt="rent camper"/>
</div>
 <Link to="/catalog" className={css.link}>
        Select now
      </Link>
<p className={css.text}>Welcome to our camper rental service, where your adventure begins! Whether you are planning a weekend getaway or an extended road trip, we offer a wide range of well-maintained campers to suit your needs. Our fleet includes everything from compact vans to spacious motorhomes, all equipped with modern amenities to ensure your comfort. Explore breathtaking landscapes, enjoy the convenience of a home on wheels, and create unforgettable memories. Book your perfect camper today and embark on the journey of a lifetime!</p>
    </>
}


export default HomePage;
