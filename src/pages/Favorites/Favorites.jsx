import PsychologistList from '../../components/PsychologistList/PsychologistList';

const Favorites = ({ favorites, addToFaforites }) => {
  return (
    <div>
      <PsychologistList items={favorites} addToFaforites={addToFaforites} />
    </div>
  );
};

export default Favorites;
