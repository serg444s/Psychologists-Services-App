import CamperItem from '../CamperItem/CamperItem';
import css from './CamperList.module.css';

const CamperList = ({ items }) => {
  return (
    <ul className={css.list}>
      {items.map(item => {
        return (
          <li key={item._id}>
            <CamperItem item={item} />
          </li>
        );
      })}
    </ul>
  );
};

export default CamperList;
