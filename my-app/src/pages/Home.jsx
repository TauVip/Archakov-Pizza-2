import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'
import { setCategoryId } from '../redux/slices/filterSlice'

const Home = () => {
  const { categoryId, sort } = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const { searchValue } = useContext(SearchContext)

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const onChangeCategory = id => dispatch(setCategoryId(id))

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `https://63db9da5a3ac95cec5a618b3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, currentPage, searchValue, sort.sortProperty])

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...Array(6)].map((_, i) => <Skeleton key={i} />)

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={i => setCurrentPage(i)} />
    </div>
  )
}
export default Home
