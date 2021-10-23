import { useState } from "react";
import PropTypes from "prop-types";
import { ImSearch } from "react-icons/im";

export default function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = (e) => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Not so fast");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <ImSearch style={{ marginRight: 8 }} />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
