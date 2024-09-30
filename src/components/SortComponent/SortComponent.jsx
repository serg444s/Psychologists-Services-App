import css from './SortComponent.module.css';

const SortComponent = ({ onFilterChange }) => {
  const handleFilterChange = event => {
    onFilterChange(event.target.value);
  };

  return (
    <div className={css.container}>
      <label htmlFor="sort" className={css.title}>
        Filters
      </label>
      <select id="sort" onChange={handleFilterChange} className={css.select}>
        <option value="A to Z" className={css.option}>
          A to Z
        </option>
        <option value="Z to A" className={css.option}>
          Z to A
        </option>
        <option value="Low to High" className={css.option}>
          Less than 10$
        </option>
        <option value="High to Low" className={css.option}>
          Greater than 10$
        </option>
        <option value="Low Rating" className={css.option}>
          Popular
        </option>
        <option value="High Rating" className={css.option}>
          Not popular
        </option>
        <option value="Show all" className={css.option}>
          Show all
        </option>
      </select>
    </div>
  );
};

export default SortComponent;
