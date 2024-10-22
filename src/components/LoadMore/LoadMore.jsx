import css from './LoadMore.module.css';

const LoadMore = ({ onClick }) => {
  return (
    <div>
      <button className={css.btn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMore;
