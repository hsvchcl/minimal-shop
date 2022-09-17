import './Header.css'
import { Text, Image, Description } from '@geist-ui/core'
import { useSelector } from 'react-redux'
import { IUser } from '../../interface/Product.interface'
import { RootState } from '../../redux/store'
import logo from '../../assets/logo.svg'
import { LogoutModal } from '../modals/logOut/LogOut'
import { useState } from 'react'

const HeaderLogo = () => {
  return (
    <div className="header-logo">
      <Image width="auto" height="60px" src={logo} />
      <Text h2>MiShop</Text>
    </div>
  )
}

const UserDescription = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const userInfo = useSelector((state: RootState): IUser => state.userReducer)

  const handlerOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      <div
        className="user-description-container"
        onClick={() => handlerOpenModal()}
      >
        <Image width="auto" height="40px" src={userInfo.photoURL!} />
        <Description title={userInfo.displayName} content={userInfo.email} />
      </div>
      <LogoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

export const Header = () => {
  return (
    <div className="header-container">
      <HeaderLogo />
      <UserDescription />
    </div>
  )
}
