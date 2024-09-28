import { useSelector } from "react-redux";
import CamperList from "../../components/CamperList/CamperList";
import { selectFilteredFavorites } from "../../redux/selectors";
import css from "./Favorites.module.css"
import FilterForm from "../../components/FilterForm/FilterForm";


const Favorites = () => { 

    const items = useSelector(selectFilteredFavorites);
const visible = items.length > 0;
const text = "There are no campers in this list..."
    
    return <div className={css.container}>
            <FilterForm/>

            {visible > 0 ? <CamperList items={items} /> : <p className={css.text}>{text}</p>}

    </div>
}
export default Favorites;