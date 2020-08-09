import { connect } from 'react-redux'
import  Home  from '../components/Home'
import { setUrl } from '../actions/HomeActions'



const mapStateToProps = store => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUrl: (url) => dispatch(setUrl(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
