import './Header.css'
import { Image, Description, Note } from '@geist-ui/core'
import logo from '../../assets/logo.svg'
import { LogoutModal } from '../modals/logOut/LogOut'
import { useEffect, useState } from 'react'
import { getUserLoggedInfo } from '../../utils/userInfo'

const getUserInfo = () => {
  return getUserLoggedInfo()
}

const HeaderLogo = () => {
  return (
    <div className='header-logo'>
      <Image width='auto' height='60px' src={logo} />
    </div>
  )
}

const UserDescription = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const userInfo = getUserInfo()

  const handlerOpenModal = () => {
    setModalOpen(true)
  }

  useEffect(() => {
    const a = document.getElementById('image-avatar')?.getAttribute('src')
    console.log(a)
  }, [])

  return (
    <>
      <div className='user-description-container' onClick={() => handlerOpenModal()}>
        <Image
          id='image-avatar'
          width='auto'
          height='40px'
          src={userInfo.photoURL || './assets/default.png'}
        />
        <Description title={userInfo.displayName} content={userInfo.email} />
      </div>
      <LogoutModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

const ShopUrl = () => {
  const [shopUrl, setShopUrl] = useState<string | null>(null)
  const pathURL = window.location.host

  useEffect(() => {
    setShopUrl(`${pathURL}/shop/${getUserInfo().shopUID}`)
  }, [])

  const handlerShopRedirect = () => {
    window.open(`http://${shopUrl}`, '_blank', 'noopener, noreferrer')
  }

  return (
    <Note className='note' onClick={() => handlerShopRedirect()} label='My Wall'>
      {shopUrl}
    </Note>
  )
}

export const Header = () => {
  return (
    <div className='header-container'>
      <HeaderLogo />
      <ShopUrl />
      <UserDescription />
    </div>
  )
}
