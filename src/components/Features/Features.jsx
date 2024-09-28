import FeaturesList from "../FeaturesList/FeaturesList";
import VehicleDetails from "../VehicleDetails/VehicleDetails";
import css from "./Features.module.css"    

const Features = ({item}) => { 
    return <div className={css.container}>
<FeaturesList obj={item}/>
    <VehicleDetails item={item}/>
            </div>
}
export default Features;