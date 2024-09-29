import { useEffect, useState } from 'react';
import PsychologistList from '../../components/PsychologistList/PsychologistList';
import { firstPageQuery, nextPageQuery } from '../../firebase-db';
import { get } from 'firebase/database';
import toast from 'react-hot-toast';

const Psychologists = ({ addToFaforites, authUser }) => {
  const [items, setItems] = useState([]);
  const [lastLoadedItem, setLastLoadedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    getFirstPage();
  }, []);

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
        setLastLoadedItem(psychologistsArray[psychologistsArray.length - 1]);
      } else {
        toast.error('No contetnt');
      }
    } catch (error) {
      toast.error('Some went wrong');
    }
    setLoading(false);
  };

  const onLoadMore = async () => {
    if (!lastLoadedItem || loading) return;

    setLoading(true);
    const nextQuery = nextPageQuery(lastLoadedItem.price_per_hour);
    try {
      const snapshot = await get(nextQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const psychologistsArray = Array.isArray(data)
          ? data
          : Object.values(data);

        setItems(prevItems => {
          const newItems = psychologistsArray.filter(
            item =>
              !prevItems.some(
                prevItem => prevItem.price_per_hour === item.price_per_hour
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
    }
    setLoading(false);
  };

  return (
    <div>
      <PsychologistList
        authUser={authUser}
        items={items}
        loadMore={onLoadMore}
        loading={loading}
        visible={visible}
        addToFaforites={addToFaforites}
      />
    </div>
  );
};

export default Psychologists;
