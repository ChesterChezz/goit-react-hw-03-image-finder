export const Button = ({ onClick }) => {
  return (
    <>
      <div className="load-more-div">
        <button type="button" onClick={onClick}>
          Load More
        </button>
      </div>
    </>
  );
};
export default Button;
