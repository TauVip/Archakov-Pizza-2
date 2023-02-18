import ReactPaginate from 'react-paginate'
import styles from './index.module.scss'

const Pagination = props => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={e => props.onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={props.currentPage - 1}
      renderOnZeroPageCount={null}
    />
  )
}
export default Pagination
