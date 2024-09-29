import { useEffect, useState } from 'react';
import PsychologistList from '../../components/PsychologistList/PsychologistList';
import { firstPageQuery, nextPageQuery } from '../../firebase-db';
import { get } from 'firebase/database';
import toast from 'react-hot-toast';
import FilterComponent from '../../components/FilterComponent/FilterComponent';

const Psychologists = ({ addToFaforites, authUser }) => {
  const [items, setItems] = useState([]);
  const [lastLoadedItem, setLastLoadedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const getFirstPage = async () => {
    setLoading(true);
    try {
      const snapshot = await get(firstPageQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('data', data);
        const psychologistsArray = Array.isArray(data)
          ? data
          : Object.values(data);

        console.log('psychologistsArray', psychologistsArray);

        setItems(psychologistsArray);

        const lastItem = psychologistsArray[psychologistsArray.length - 1];

        console.log('lastItem', lastItem.psychologId);

        setLastLoadedItem(lastItem);
      } else {
        toast.error('No data');
      }
    } catch (error) {
      toast.error('Some went wrong');
      console.log(error);
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
        console.log('next data', data);
        console.log('nex array', Array.isArray(data));

        const psychologistsArray = Array.isArray(data)
          ? data
          : Object.values(data);

        console.log('current array', Object.values(data));

        // setItems(prevItems => [...prevItems, ...psychologistsArray]);

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

  // const onLoadMore = async () => {
  //   if (!lastLoadedItem || loading) return;
  //   setLoading(true);
  //   const nextQuery = nextPageQuery(lastLoadedItem.name);
  //   try {
  //     const snapshot = await get(nextQuery);
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       console.log('next data', data);

  //       setItems(prevItems => [...prevItems, ...data]);

  //       const psychologistsArray = Array.isArray(data)
  //         ? data
  //         : Object.values(data);

  //       setItems(prevItems => {
  //         const newItems = psychologistsArray.filter(
  //           item =>
  //             !prevItems.some(
  //               prevItem => prevItem.price_per_hour === item.price_per_hour
  //             )
  //         );
  //         return [...prevItems, ...newItems];
  //       });

  //       setLastLoadedItem(data[data.length - 1]);
  //     } else {
  //       setVisible(false);
  //       toast.error('No data');
  //     }
  //   } catch (error) {
  //     toast.error('Some went wrong');
  //   }
  //   setLoading(false);
  // };

  return (
    <>
      <FilterComponent />
      <PsychologistList
        authUser={authUser}
        items={items}
        loadMore={onLoadMore}
        loading={loading}
        visible={visible}
        addToFaforites={addToFaforites}
      />
    </>
  );
};

export default Psychologists;
