import { useState } from 'react'
import './Login.css'
import { Button, Page, Image } from '@geist-ui/core'
import { signInWithGoogle } from './login.service'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { userActions } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '@geist-ui/icons'
import logo from '../../assets/logo.svg'


const Child = () => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handlerRedirection = () => {
    setloading(true)
    signInWithGoogle().then((userInfo: any) => {
      const { displayName, email, photoURL, uid, shopUID } = userInfo
      

      dispatch(
        userActions.addUser({ displayName, email, photoURL, uid, shopUID }),
      )
      setloading(false)
      navigate('/home')
    })
  }
  return (
    <div className="login-container">
      <div className="login-content-container">
        <div>
          <Image width="auto" height="260px" src={logo} />
        </div>
        <div>
          <h1>Wall.</h1>
          <p>
            Welcome to the platform that allows you to manage your store quickly
            and efficiently
          </p>
          <Button
            loading={loading}
            icon={<ArrowRight />}
            auto
            onClick={() => handlerRedirection()}
          >
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Login = () => {
  return (
    <>
      <Page>
        <Child />
      </Page>
    </>
  )
}
