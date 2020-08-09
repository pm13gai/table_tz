import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import  HomeContainer  from '../containers/HomeContainer'
import  TableContainer  from '../containers/TableContainer'
import  NotFound  from '../components/NotFound'


class App extends React.Component {
  render() {
    return (
      <div className="app">
        
        <div className="nav">
          <Link to='/table'>На главную</Link>
        </div>


        <Switch>

          <Route  exact path='/table' component={HomeContainer} />
          <Route  path='/table/:number' render={(props) => this.props.isUrl ? <TableContainer {...props}/> : <Redirect  to='/table' />} />
          
          <Redirect exact from= '/' to='/table' />
                   
          <Route  component={NotFound} />
        </Switch>

        
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    isUrl: store.home.isUrl,
  }
}



export default connect(
  mapStateToProps
)(App)


App.propTypes = {
  isUrl: PropTypes.bool.isRequired,
}