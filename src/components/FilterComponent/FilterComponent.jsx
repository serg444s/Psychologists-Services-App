import React, { useState } from 'react';
import css from './FilterComponent.module.css';

const FilterComponent = () => {
  const [selectedFilter, setSelectedFilter] = useState('A to Z');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  return (
    <div className={css.filtercontainer}>
      <button className={css.filterbutton} onClick={toggleDropdown}>
        {selectedFilter}
      </button>
      <div className={isOpen ? css.active : css.filteroptions}>
        {[
          'A to Z',
          'Z to A',
          'Less than 10$',
          'Greater than 10$',
          'Popular',
          'Not popular',
          'Show all',
        ].map(filter => (
          <div
            key={filter}
            className={filter === selectedFilter ? 'active' : ''}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
