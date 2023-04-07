import { Audio } from 'react-loader-spinner';
import css from '../css/Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader_container}>
      <Audio
        height="100"
        width="100"
        radius="9"
        color="#3f51b5"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};
