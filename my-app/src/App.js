import Categories from './components/Categories'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Sort from './components/Sort'
import './scss/app.scss'
import { useEffect, useState } from 'react'
import Skeleton from './components/PizzaBlock/Skeleton'

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://63db9da5a3ac95cec5a618b3.mockapi.io/items')
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {isLoading
              ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
              : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default App
