import { Modal } from "@geist-ui/core";

export const ProductEdit = (props:any) => {
  const closeHandler = () => {
    props.setOpenModal(false);
    console.log("closed");
  };

  return (
    <Modal visible={props.openModal} disableBackdropClick backdropClassName="blur-bg" onClose={() => closeHandler}>
      <Modal.Title>Edit Product</Modal.Title>
      <Modal.Subtitle>{props.product?.productName}</Modal.Subtitle>
      <Modal.Content>
        <p>Some content contained within the modal.</p>
      </Modal.Content>
      <Modal.Action passive onClick={() => props.setOpenModal(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action>Save Changes</Modal.Action>
    </Modal>
  );
};
