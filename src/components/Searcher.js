import React, { Fragment, useState, useEffect } from 'react'
import { getProducts } from '../actions/productActions';
import MetaData from './layout/MetaData'
import Product from './product/Product';
import{ useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Slider from'rc-slider';
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range)
const Search = ({ keyword}) => {

    

  // let params = useParams
  const [currentPage, setcurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const alert = useAlert();
  // const params = useLocation();
 const dispatch = useDispatch();
 const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)
    // let { id } = useParams(); 
const navigate = useNavigate()
//  const keyword = params.keyword
 useEffect(() => {
 
  if (error) {

    return alert.error(error)
  }
  
  // if(keyword.trim()) {
  //   // console.log(`/something/${keyword}`);

  //    navigate(`/`, {keyword:keyword })
  // } else {
  //     navigate('/')
  // }
  dispatch(getProducts( keyword, currentPage, price));

}
 ,[dispatch, alert, error, keyword, currentPage, price])

 function setCurrentPageNo(pageNumber){
  setcurrentPage(pageNumber)
 }
  
  return (
        <Fragment>
          {loading ? <Loader/> : (
            <Fragment>
              <div className='container container-fluid'>

<MetaData title={'Buy Best Products Online'} />
<h1 id="products_heading">Latest Products</h1>
<section id="products" className="container mt-5">
<div className="row">
{products && products.map(product => (

<Product key={product._id} product={product} />

))}



</div>
</section>

{resPerPage <= productsCount && (
  <div className='d-flex justify-content-center mt-5'>
  <Pagination
  activePage={currentPage}
  itemsCountPerPage={resPerPage}
  totalItemsCount = {productsCount}
  onChange={setCurrentPageNo}
  nextPageText ={'Next'}
  prevPageText ={'Prev'}
  firstPageText ={'First'}
  lastPageText ={'Last'}
   itemClass="page-item"
   linkClass='page-link'
  />
</div>

)}

</div>
            </Fragment>
          )}
          
        </Fragment>
    )
}

export default Search;