import Loader from '../Loader/Loader';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import PsychologistItem from '../PsychologistItem/PsychologistItem';
import css from './PsychologistList.module.css';

const PsychologistList = ({
  items,
  loadMore,
  loading,
  visible,
  addToFaforites,
  authUser,
}) => {
  return (
    <>
      <ul className={css.list}>
        {items.map(item => {
          if (item.psychologId) {
          }
          return (
            <li key={item.psychologId}>
              <PsychologistItem
                item={item}
                addToFaforites={addToFaforites}
                authUser={authUser}
              />
            </li>
          );
        })}
      </ul>

      {loading && <Loader />}
      {!loading && visible && <LoadMoreBtn onLoadMore={loadMore} />}
    </>
  );
};

export default PsychologistList;
