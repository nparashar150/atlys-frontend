import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Feed from '@/pages/Feed'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
