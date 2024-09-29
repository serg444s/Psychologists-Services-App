import PsychologistList from '../../components/PsychologistList/PsychologistList';

const Favorites = ({ favorites, addToFaforites, authUser }) => {
  return (
    <div>
      <PsychologistList
        items={favorites}
        addToFaforites={addToFaforites}
        authUser={authUser}
      />
    </div>
  );
};

export default Favorites;
