import axios from 'axios'
import qs from 'qs'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Sort, { sortList } from '../components/Sort'
import {
  setCategoryId,
  setCurrentPage,
  setFilters
} from '../redux/slices/filterSlice'

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const { searchValue } = useContext(SearchContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = id => dispatch(setCategoryId(id))

  const onChangePage = number => dispatch(setCurrentPage(number))

  const fetchPizzas = useCallback(() => {
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
  }, [categoryId, currentPage, searchValue, sort.sortProperty])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, currentPage, navigate, sort.sortProperty])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(
        obj => obj.sortProperty === params.sortProperty
      )

      dispatch(setFilters({ ...params, sort }))

      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) fetchPizzas()

    isSearch.current = false
  }, [fetchPizzas])

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
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  )
}
export default Home
