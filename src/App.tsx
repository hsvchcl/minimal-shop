import { Page } from '@geist-ui/core'
import { redirect } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { store } from './redux/store'

export const loader = async () => {
  const userInfo = store.getState().userReducer
  if (!userInfo.uid) {
    return redirect('/')
  }
}

function App() {
  return (
    <Page>
      <Home />
    </Page>
  )
}

export default App
