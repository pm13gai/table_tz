import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

export default class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sort: {
        field: '',
        direct: true,
      },
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',

      add_form: false,
      new_str_ready: null,
      id_select: '',
      search_text:'',
    }
    this.table = React.createRef();
    this.button = React.createRef();
  }


  componentDidMount(){
    const {  loadData, url } = this.props   
    loadData(url);

  }
  
  tableSearch(text) {
    let table=this.table.current;
    let regPhrase = new RegExp(text, 'i');
    let flag = false;
    for (let i = 1; i < table.rows.length; i++) {
        flag = false;
        for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }

    }
  }
  sort_data(data){
    const { field, direct } = this.state.sort;
    let new_d = direct ? data.sort((a,b)=>{
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    }) : data.sort((b,a)=>{
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
    return new_d;

  }

  handleSubmit=(e)=>{
    e.preventDefault();
    const {  id, firstName,lastName,email,phone } = this.state
    this.setState({
      new_str_ready: {
        id: parseInt(id),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      },
    });
  }

  handleClick = (e) =>{
    if(e.target.tagName==="TH"){
      let field = e.target.id;
      if(field===this.state.sort.field) this.setState(prev => ({
        ...prev,
        sort:{field: field, direct: !prev.sort.direct},
      }))
      else this.setState({sort:{field: field, direct: true}})
    }

    if(e.target.tagName==="TD"){
      let tr = e.target.closest('tr');
      if(tr.id===this.state.id_select) this.setState({id_select: ''});
      else this.setState({id_select: tr.id});      
    }
  }

  handleChange=(e)=>{
    const { id, firstName, lastName, email, phone } = this.state
    const { name, value } = e.currentTarget;
    this.setState({[name]: value});
    if(name==="search_text") this.tableSearch(value);
    if(id&&firstName&&lastName&&email&&phone) this.button.current.disabled=false;
    
  }

  renderAddForm = () =>{
    const { id,firstName,lastName,email,phone } = this.state
    return (
    <form onSubmit={this.handleSubmit}>
      <div className="new_str">
        <p>id</p>
        <p>firstName</p>
        <p>lastName</p>
        <p>email</p>
        <p>phone</p>
      </div>
      <div className="new_str">
        <input  type="text" name="id" value={id} onChange={this.handleChange} />
        <input  type="text" name="firstName" value={firstName} onChange={this.handleChange} />
        <input  type="text" name="lastName" value={lastName} onChange={this.handleChange} />
        <input  type="text" name="email" value={email} onChange={this.handleChange} />
        <input  type="text" name="phone" value={phone} onChange={this.handleChange} />
      </div>
      
      
      <button type="submit" ref = {this.button} disabled>Добавить</button>
      
    </form>
    
    )
    
  }
  renderTemplate = () => {
    const {  data, error, isFetching } = this.props
    const { field, direct } = this.state.sort
    const { id_select, new_str_ready } = this.state

    if (error) {
      return <p>Во время запроса произошла ошибка {error}</p>
    }

    if (isFetching) {
      return <p>Загрузка...</p>
    }
    
    if (data) {
      let number = parseInt(this.props.match.params.number);
      let q = Math.round(data.length/50);
      let data_page = data.slice((number-1)*50,(number-1)*50+50);
      field && (data_page = this.sort_data(data_page));
      if(new_str_ready) data_page.unshift(new_str_ready);
      let user = null;
      return (
      <div>
        <table className="my_table" onClick={this.handleClick} ref = {this.table}>
          <tbody>
            <tr>
              <th id="id">id  {(field==='id') && (direct ? '↑' : '↓')}</th>
              <th id="firstName">firstName {(field==='firstName') && (direct ? '↑' : '↓')}</th>
              <th id="lastName">lastName{(field==='lastName') && (direct ? '↑' : '↓')}</th>
              <th id="email">email {(field==='email') && (direct ? '↑' : '↓')}</th>
              <th id="phone">phone {(field==='phone') && (direct ? '↑' : '↓')}</th>
            </tr>
            {data_page.map((item,index)=>{
              if(item.id===parseInt(id_select)) user=item;
              return (
                <tr className={(item.id===parseInt(id_select)) ? "red" : ""} id={item.id} key={index}>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
            )})}
          </tbody>
        </table>

        <div className="nav_page">
          {(number!==1) && <Link to={`/table/${number-1}`}>Previous Page</Link>}
          {(number!==q) && <Link to={`/table/${number+1}`}>Next Page</Link>}
        </div>

        {user && (<div>
          Выбран пользователь <b>{user.firstName}</b><br />
          Описание: <textarea value={user.description} readOnly></textarea><br />
          Адрес проживания: <b>{user.address.streetAddress}</b><br />
          Город: <b>{user.address.city}</b><br />
          Провинция/штат: <b>{user.address.state}</b><br />
          Индекс: <b>{user.address.zip}</b>
        </div>)}              
      </div>
        )
    }
  }

  render() {
    return (
      <div>       
        <button onClick={()=>{this.setState({add_form: !this.state.add_form})}}>Добавить строку</button>
        {this.state.add_form && this.renderAddForm()}
        <div>Фильтрация</div>
        <input  type="text" name="search_text" value={this.state.search_text} onChange={this.handleChange} />
        <h1>Таблица</h1>
        {this.renderTemplate()}
      </div>
    )
  }
}
Table.propTypes = {
  error: PropTypes.string,
  url: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
}

