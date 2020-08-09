import { connect } from 'react-redux'
import  Table  from '../components/Table'
import { loadData } from '../actions/TableActions'


const mapStateToProps = store => {
  return {
    data: store.table.data,
    error: store.table.error,
    isFetching: store.table.isFetching,
    url: store.home.url,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: (url) => dispatch(loadData(url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
