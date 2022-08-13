import React, { Fragment, useState, useEffect } from 'react'
import { getProducts } from '../actions/productActions';
import MetaData from './layout/MetaData'
import Product from './product/Product';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {

  const [currentPage, setcurrentPage] = useState(1)
  const [category, setCategory] = useState('')
  const [keyword, setKeyword] = useState('')
  const [price, setPrice] = useState([1, 1000])
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products)
  const location = useLocation();
  const [rating, setRating] = useState(0)
  const totalStars = 5;
  const activeStars = 0;


  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ]


  if (location.state !== null && location.pathname === `/search/${location.state.keyword}`) {
    location.state.keyword = setKeyword(location.state.keyword)
  }
  console.log('dloca', location);


  if (location.state == null) {
    location.state = {
      ...location.state,
      keyword: ''
    }
    location.state.keyword = setKeyword(location.state.keyword)
  }

  useEffect(() => {

    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));

  }
    , [dispatch, alert, error, keyword, currentPage, price, category, rating])

  function setCurrentPageNo(pageNumber) {
    setcurrentPage(pageNumber)
  }

  // let count = productsCount;
  //  if (keyword) {
  //   count = filteredProductsCount
  //  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <div className='container container-fluid'>

            <MetaData title={'Buy Best Products Online'} />
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">

                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `$1`,
                            1000: `$1000`
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={value => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true
                          }}
                          value={price}
                          onChange={price => setPrice(price)}
                        />

                        <hr className="my-5" />

                        <div className="mt-5">
                          <h4 className="mb-3">
                            Categories
                          </h4>
                          <ul className="pl-0">
                            {categories.map(category => (
                              <li
                                style={{
                                  cursor: 'pointer',
                                  listStyleType: 'none'
                                }}
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <hr className="my-3" />

                        <div className="mt-5">
                          <h4 className="mb-3">
                            Ratings
                          </h4>
                          <ul className="pl-0">
                            {[...new Array(totalStars)].map((star, i) => (
                              <li
                                style={{
                                  cursor: 'pointer',
                                  listStyleType: 'none'
                                }}
                                key={star}
                              >
                                <div> {[...new Array(totalStars)].map((arr, index) => {
                                  return index > i ? <FontAwesomeIcon icon={farFaStar}
                                    key={arr}
                                    onClick={() => setRating(index + 1)} />
                                    : <FontAwesomeIcon icon={fasFaStar} style={{ color: '#febd69' }}
                                      key={star}
                                      onClick={() => setRating(index + 1)} />
                                })}
                                </div>
                              </li>
                            ))}

                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                            >
                              {/* <FontAwesomeIcon icon={fasFaStar} style={{ color: '#febd69' }} />
                              <FontAwesomeIcon icon={fasFaStar} style={{ color: '#febd69' }} />
                              <FontAwesomeIcon icon={fasFaStar} style={{ color: '#febd69' }} />
                              <FontAwesomeIcon icon={fasFaStar} style={{ color: '#febd69' }} />
                              <FontAwesomeIcon icon={farFaStar} />; */}

                            </li>
                          </ul>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map(star => (
                              <li
                                style={{
                                  cursor: 'pointer',
                                  listStyleType: 'none'
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`
                                    }}
                                  >

                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>


                      </div>
                    </div>

                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map(product => (

                          <Product key={product._id} product={product} col={4} />

                        ))}
                      </div>
                    </div>
                  </Fragment>
                ) : (

                  products.map(product => (

                    <Product key={product._id} product={product} col={3} />

                  ))
                )}



              </div>
            </section>

            {resPerPage <= productsCount && (
              <div className='d-flex justify-content-center mt-5'>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
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
export default Home