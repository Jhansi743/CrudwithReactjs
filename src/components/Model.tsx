import NewAddress from "./NewAddress";

const Modal = ({ showModal, handleClose, setSingleData, singleData, setData, isEditing }: any) => {
  return (
    <div
      className={`modal modal-lg fade ${showModal ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditing ? "Update contact" : "Add new contact"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <NewAddress
              handleClose={handleClose}
              setData={setData}
              singleData={singleData}
              isEditing={isEditing}
              setSingleData={setSingleData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
