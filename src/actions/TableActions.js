export const DATA_REQUEST = 'DATA_REQUEST'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAIL = 'GET_DATA_FAIL'

export const URL_FOR_BIG_DATA = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
export const URL_FOR_SMALL_DATA = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

export function loadData(url) {
  return function(dispatch) {
    dispatch({
      type: DATA_REQUEST,
    })

    let $ = require('jquery')

    $.ajax({
      url:	url,
      method:	"GET",											
      success:	function	(data)	{
              dispatch({
                type: GET_DATA_SUCCESS,
                payload: data,
              })
      },
      error: function (err){
        dispatch({
          type: GET_DATA_FAIL,
          error: true,
          payload: new Error('Ошибка получения даенных'),
        })
      }
    });


  }
}

