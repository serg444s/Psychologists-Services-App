import { useDispatch, useSelector } from 'react-redux';
import CamperList from '../../components/CamperList/CamperList';
import css from './Catalog.module.css';
import {
  getCampersError,
  getCampersStatus,
  selectFilteredCampers,
  selectPage,
  selectLastPage,
} from '../../redux/selectors';
import { useEffect } from 'react';
import { getStartCampers } from '../../redux/operations';
import { LoadMoreBtn } from '../../components/LoadMoreBtn/LoadMoreBtn';
import FilterForm from '../../components/FilterForm/FilterForm';
import { incrementPage } from '../../redux/campersSlice';
import { changeFilter } from '../../redux/filtersSlice';

const Catalog = () => {
  const loading = useSelector(getCampersStatus);
  const error = useSelector(getCampersError);
  const items = useSelector(selectFilteredCampers);
  const visible = items.length > 0;
  const lastPage = useSelector(selectLastPage);
  const dispatch = useDispatch();
  const page = useSelector(selectPage);

  useEffect(() => {
    if (page === 1) {
      dispatch(getStartCampers());
      dispatch(
        changeFilter({
          location: '',
          airConditioner: false,
          automatic: false,
          kitchen: false,
          TV: false,
          shower: false,
          type: '',
        })
      );
    }
  }, [dispatch, page]);

  const initialFilterValues = {
    location: '',
    airConditioner: false,
    automatic: false,
    kitchen: false,
    TV: false,
    shower: false,
    type: '',
  };

  const onLoadMore = () => {
    dispatch(incrementPage());
    dispatch(changeFilter(initialFilterValues));
  };

  return (
    <>
      {error && <p className={css.text}>Sorry. Some went wrong...</p>}
      <div className={css.container}>
        <FilterForm />
        <div className={css.list}>
          {visible && !loading ? (
            <CamperList items={items} />
          ) : (
            <p className={css.text}>There are no campers in this list...</p>
          )}
          {!loading && !lastPage && <LoadMoreBtn onLoadMore={onLoadMore} />}
        </div>
      </div>
    </>
  );
};
export default Catalog;
