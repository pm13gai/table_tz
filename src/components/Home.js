import React from 'react'
import { Redirect } from "react-router-dom"
import PropTypes from 'prop-types'
import {
  URL_FOR_BIG_DATA,
  URL_FOR_SMALL_DATA,
} from '../actions/TableActions'

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url:'',
    }
  }
  set_url(url){
    this.props.setUrl(url);
    this.setState({url: url});
  }
  render() {
    if(this.state.url) return (<Redirect to='/table/1' />)
    return (
      <div>       
        <h1>Главная</h1>
        <button onClick={()=>this.set_url(URL_FOR_SMALL_DATA)}>Загрузить мало данных</button>
        <button onClick={()=>this.set_url(URL_FOR_BIG_DATA)}>Загрузить много данных</button>
        
      </div>
    )
  }
}

Home.propTypes = {
  setUrl: PropTypes.func.isRequired,
}