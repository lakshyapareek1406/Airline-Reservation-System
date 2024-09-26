import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const CountrySelector = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = selectedOption => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <Select className=" border-gray-400 " options={options} value={selectedOption} onChange={changeHandler} />
    </div>
  );
};

export default CountrySelector;
