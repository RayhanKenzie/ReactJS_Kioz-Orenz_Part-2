import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import KiosList from './pages/KiosList'
import WaitingList from './pages/WaitingList'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kios" element={<KiosList />} />
        <Route path="/waiting-list" element={<WaitingList />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  )
}

export default App