import { createContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Cart from './pages/Cart'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { decrement, increment } from './redux/slices/filterSlice'
import './scss/app.scss'

export const SearchContext = createContext()

function App() {
  const count = useSelector(state => state.counter.count)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='wrapper'>
      <button
        aria-label='Increment value'
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label='Decrement value'
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}
export default App
