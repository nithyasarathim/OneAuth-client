import { Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/auth/register/register.page.tsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<RegisterPage/>} />
    </Routes>
  )
}

export default App
