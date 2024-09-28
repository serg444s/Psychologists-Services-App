import PsychologistList from "../../components/PsychologistList/PsychologistList";

const Favorites = ({ favorites }) => {
  return (
    <div>
      <PsychologistList items={favorites} />
    </div>
  );
};

export default Favorites;
