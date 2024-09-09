import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth'
import { login, logout } from './redux-data/authStore'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'


function App() {


  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        console.log(dispatch(login({userData})))
        dispatch(login({userData}))
      }

      else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  
  
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      
      <div className='w-full block'>
        <Header />
        <main>
          TODO:
          
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
