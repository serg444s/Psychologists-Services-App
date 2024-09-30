import { useEffect, useState } from 'react';
import PsychologistList from '../../components/PsychologistList/PsychologistList';
import { firstPageQuery, nextPageQuery } from '../../firebase-db';
import { get } from 'firebase/database';
import toast from 'react-hot-toast';
import SortComponent from 'components/SortComponent/SortComponent';
import css from './Psychologists.module.css';

const Psychologists = ({ addToFaforites, authUser }) => {
  const [items, setItems] = useState([]);
  const [lastLoadedItem, setLastLoadedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [filter, setFilter] = useState('');

  function onFilterChange(value) {
    setFilter(value);
  }

  function toSortItems(items, filter) {
    if (filter === 'A to Z') {
      return items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'Z to A') {
      return items.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === 'Low to High') {
      return items.sort((a, b) => a.price_per_hour - b.price_per_hour);
    } else if (filter === 'High to Low') {
      return items.sort((a, b) => b.price_per_hour - a.price_per_hour);
    } else if (filter === 'Low Rating') {
      return items.sort((a, b) => a.rating - b.rating);
    } else if (filter === 'High Rating') {
      return items.sort((a, b) => b.rating - a.rating);
    } else {
      return items;
    }
  }

  const sortedItems = toSortItems(items, filter);

  const getFirstPage = async () => {
    setLoading(true);
    try {
      const snapshot = await get(firstPageQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const psychologistsArray = Array.isArray(data)
          ? data
          : Object.values(data);
        setItems(psychologistsArray);

        const lastItem = psychologistsArray[psychologistsArray.length - 1];

        setLastLoadedItem(lastItem);
      } else {
        toast.error('No data');
      }
    } catch (error) {
      toast.error('Some went wrong');
    }
    setLoading(false);
  };

  useEffect(() => {
    getFirstPage();
  }, []);

  const onLoadMore = async () => {
    if (!lastLoadedItem || loading) return;
    setLoading(true);
    const nextQuery = nextPageQuery(lastLoadedItem.psychologId);
    try {
      const snapshot = await get(nextQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();

        const psychologistsArray = Array.isArray(data)
          ? data
          : Object.values(data);

        console.log('current array', Object.values(data));

        setItems(prevItems => {
          const newItems = psychologistsArray.filter(
            item =>
              !prevItems.some(
                prevItem => prevItem.psychologId === item.psychologId
              )
          );
          return [...prevItems, ...newItems];
        });

        setLastLoadedItem(psychologistsArray[psychologistsArray.length - 1]);
      } else {
        setVisible(false);
        toast.error('No data');
      }
    } catch (error) {
      toast.error('Some went wrong');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={css.page}>
      <SortComponent onFilterChange={onFilterChange} />
      <PsychologistList
        authUser={authUser}
        items={sortedItems}
        loadMore={onLoadMore}
        loading={loading}
        visible={visible}
        addToFaforites={addToFaforites}
      />
    </div>
  );
};

export default Psychologists;
