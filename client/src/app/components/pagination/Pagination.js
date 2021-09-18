import MaterialPagination from '@material-ui/lab/Pagination';
import styles from './Pagination.module.scss'; 

const Pagination = ({setPageNumber, nPages = 20 }) => {

  const handleOnPageChange = (pageNumber) => {
    setPageNumber(pageNumber);
    window.scroll(0, 0);
  }

  return (
    <div className={styles.pagination}>

      <MaterialPagination 
      count={nPages}
      hideNextButton
      hidePrevButton
      color="primary"
      onChange={(e) => handleOnPageChange(e.target.textContent)}/>

    </div>
  )
}

export default Pagination
