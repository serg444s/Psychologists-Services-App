import PsychologistList from '../../components/PsychologistList/PsychologistList';

const Favorites = ({ favorites, addToFaforites, authUser }) => {
  return (
    <div>
      {favorites.length > 0 ? (
        <PsychologistList
          items={favorites}
          addToFaforites={addToFaforites}
          authUser={authUser}
        />
      ) : (
        <p>You haven't added to favorites yet...</p>
      )}
    </div>
  );
};

export default Favorites;
