export const Modal = ({ src, alt, closeModal }) => {
  return (
    <>
      <div className="overlay" onClick={closeModal}>
        <div className="modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    </>
  );
};

export default Modal;
