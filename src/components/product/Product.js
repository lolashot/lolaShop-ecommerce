import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farFaStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasFaStar } from '@fortawesome/free-solid-svg-icons'





const Product = ({ product, col }) => {
  // console.log('numOfReviews', product.numOfReviews);
  const totalStars = 5;
  const activeStars = product.ratings;

  return (

    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`} >
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product.images[0].url} alt=""
        />
        {/* <FontAwesomeIcon icon={faStar}>({product.ratings} Reviews)</FontAwesomeIcon> */}



        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div> {[...new Array(totalStars)].map((arr, index) => {
            return index < activeStars ? <FontAwesomeIcon icon={fasFaStar} style={{ color: '#febd69' }} />
              : <FontAwesomeIcon icon={farFaStar} />;
          })}
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>

          {/* <div className="ratings mt-auto">
            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div> */}
          <p className="card-text">${product.price}</p>
          <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
        </div>
      </div>
    </div>

  )
}

export default Product