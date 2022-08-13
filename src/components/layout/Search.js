import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
// import { useNavigation } from "@react-navigation/core";

const Search = () => {
    let navigate = useNavigate()
    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()) {
           navigate(`/search/${keyword}`, {
            state:{
              keyword
            },
          })
        } else {
            navigate('/')
        }
    }

  return (
    <div>
        <form onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
             onChange={(e) => setKeyword(e.target.value)} 
            //  onPress={(e) => {
            //   navigation.navigate(
            //       'keyword', {
            //           keyword: e.target.value
            //       });
            //   }}
      // >
             
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        </form>
    </div>
  )
}

export default Search