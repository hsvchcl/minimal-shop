import { Modal } from '@geist-ui/core'
import { userActions } from '../../../redux/userSlice'
import { modalActions } from '../../../redux/modalsReducer'
import { store } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'

export const LogoutModal = (props: any) => {
  const navigate = useNavigate()
  const closeHandler = () => {
    store.dispatch(modalActions.openCloseUserInfoModal(false))
  }

  const handlerEditProduct = () => {
    store.dispatch(userActions.resetState())
    navigate('/')
  }

  return (
    <Modal
      visible={props.modalOpen}
      disableBackdropClick
      backdropClassName="blur-bg"
      onClose={() => closeHandler}
    >
      <Modal.Title>Logout</Modal.Title>
      <Modal.Subtitle>Close Session</Modal.Subtitle>
      <Modal.Content></Modal.Content>
      <Modal.Action passive onClick={() => props.setModalOpen(false)}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={() => handlerEditProduct()}>
        <strong>Logout</strong>
      </Modal.Action>
    </Modal>
  )
}
