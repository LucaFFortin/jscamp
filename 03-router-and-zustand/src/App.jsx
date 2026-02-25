import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'

const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import("./pages/Search.jsx"))
const Contact = lazy(() => import("./pages/Contact.jsx"))
const Detail = lazy(() => import('./pages/Detail.jsx'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>loading ...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path='/job/:jobId' element={<Detail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='*' element={<NotFoundPage />} /> {/* para rutas que no estan definidas o errores */}
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
