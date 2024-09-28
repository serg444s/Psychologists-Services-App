import css from "./VehicleDetails.module.css"

const VehicleDetails = ({item}) => { 
    return <div className={css.container}>
    <h3 className={css.title}>Vehicle details</h3>
    <div className={css.line}></div>
    <ul className={css.list}>
        <li>
            <p>Form</p>
            <p>{item.form}</p>
        </li>
        <li>
            <p>Length</p>
            <p>{item.length}</p>
        </li>
        <li>
            <p>Width</p>
            <p>{item.width}</p>
        </li>
        <li>
            <p>Height</p>
            <p>{item.height}</p>
        </li>
        <li>
            <p>Tank</p>
            <p>{item.tank}</p>
        </li>
        <li>
            <p>Consumption</p>
            <p>{item.consumption}</p>
        </li>
    </ul>
            </div>
}
export default VehicleDetails;