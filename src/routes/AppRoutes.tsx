
import Login from '@/pages/public/Login'
import Register from '@/pages/public/Register'
import { Route, Routes } from 'react-router'

const AppRoutes = () => {
  return (
      <Routes>
          <Route path="/">
              <Route path='login' element={ <Login />} />
              <Route path='register' element={<Register /> } />
              
          </Route>
      
    </Routes>
  )
}

export default AppRoutes
