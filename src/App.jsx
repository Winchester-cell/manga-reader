import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Search from './pages/Search'
import Manga from './pages/Manga'
import Chapter from './pages/Chapter'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/manga/:mangaID' element={<Manga/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/search/:searchedWord' element={<Search/>} />
        <Route path='/chapter/:chapterID' element={<Chapter/>} />
      </Routes>
    </>
  )
}

export default App
