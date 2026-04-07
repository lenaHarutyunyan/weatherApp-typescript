import Button from "../ui/Button";
import Modal from "../ui/Modal";

interface DelConfirmModalProps {
  removeCityID: number,
  deleteCity: (id: number) => void,
  closeDeleteModal: () => void
};

function DelConfirmModal(
  { removeCityID, deleteCity, closeDeleteModal }: DelConfirmModalProps
) {
  return (
    <Modal title="Are you sure you want to delete this city from your favorite list?" onClose={closeDeleteModal}>
      <div className="flex gap-3 mt-3">
        <Button
          onClick={() => deleteCity(removeCityID)}
          type="danger"
        >
          Yes, delete
        </Button>
      </div>
    </Modal>
  );
};

export default DelConfirmModal;
