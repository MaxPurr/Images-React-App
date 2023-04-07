import PropTypes from 'prop-types';
import css from '../css/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.Searchbar}>
      <form onSubmit={onSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button}>Search</span>
        </button>
        <input
          name="search"
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
