import React, { Component } from 'react';
import callApi from '../../service/APIservice';
//import { Redirect ,Link} from 'react-router-dom';
import {uid} from '../../service/auth'
class EditContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fooddata: [],
          data2:[],
          form: null,
          filename: "",
          file: "",
          url: '',
          name: '',
          price: 0,
          isAdded: false,
          type: 1,
          unit:'',
          loaded: 0,
          typeDish: "",
          nameDish: "",
          quality: 0,
          foodType:1,
          ingredientsInType: {
            expire:"",
            name:"",
            price:0,
            quantity:0,
            received_date:"",
            type:0,
            __v:"",
            _id:""

          }
        };
        this.changeFood = this.changeFood.bind(this);
        this.changeFood2 = this.changeFood2.bind(this)
      }
      componentWillMount() {
        callApi(`storage/all_type/${uid}`, 'GET', null).then(res => {
          // console.log(res.data)
          this.setState({
              fooddata: res.data.food,
          })
          console.log(this.state.fooddata)
      })
    //   callApi(`storage/ingredientsInType/${uid}`, 'GET',null).then(res => {
    //     console.log(res.data)
    //     this.setState({
    //         data2: res.data.ingredientInType ,
    //     })
    // })
    }
    changeFood(e) {
      e.preventDefault();
      // console.log(e.target.value );
      callApi(`storage/ingredientsInTypeName/${uid}`, 'GET',{display:e.target.value}).then(res => {
        // console.log(res.data)
        this.setState({
          data2: res.data.ingredientInType ,
      })
    })
    }
    changeFood2(e) {
      
      this.state.data2.map((item, index) => {
       if(e.target.value === item.name){
        this.setState({
          ingredientsInType:{
            expire: item.expire,
            name: item.name,
            price: item.price,
            quantity:item.quantity,
            received_date: item.received_date,
            type: item.type,
            __v: item.__v,
            _id: item._id
          }
          
        })
        console.log(this.state.ingredientsInType)
       }
      })
      console.log(this.state.ingredientsInType)
    }
      _handleSubmit(e) {
        e.preventDefault();
        var{type,name,price,filename,unit,ingredientInType} =this.state;
        var url = '/images/dish/'+ this.state.filename;
        console.log(this.state);
        console.log(url);
        if(this.checkInfo() === true ){
          callApi(`manager/dish/${uid}`, 'POST', {
            type : type,
            name : name,
            price : price,
            unit: unit,
            filename: filename,  
            url: url,
            ingredientInType: ingredientInType          
          }).then(res => {
              console.log(res);
              
          })
          const formData = new FormData()
          console.log(formData.getAll)
          formData.append('foodimage', this.state.file, this.state.file.name)
          console.log(formData.get('foodimage'))
          callApi(`upload`, 'POST', formData).then(res => {
            if(res.status === 200){
              console.log(res);
              alert('Đã thêm món');
            }
              
          })         
        }
        else{
          alert("Vui lòng nhập đầy đủ thông tin món ăn!");
        }
        
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            filename: file.name,
            file: file,
            url: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
      checkInfo = () =>{
        if(this.state.price === '' || this.state.name === '' ||  this.state.type ==='' || this.state.unit ===''){
          return false;
        }
        else{
          
          return true;
        }
      } 
      onHandleChange(event) {
            var target = event.target;
            var name = target.name;
            var value = target.value;
            this.setState({
                [name]: value
            });
        }
        showSelect1(colections) {
          var result = null;
          if (colections.length > 0) {
              result = colections.map((food, index) => {
                  return (<option key={index} type={food.type} onSelect ={() => {alert("1")}}>{food.display} </option>)
              })
          }
          return result;
      }
      showSelect2(colections) {
        var result = null;
        // console.log(colections);
        if (colections.length > 0) {
            result = colections.map((item, index) => {
              return (<option key={index} type={item.type} >{item.name}</option>)
            })
        }
        return result;
    }
      render() {
        let {url} = this.state;
        let $imagePreview = null;
        if (url) {
          $imagePreview = (<img src={url} alt="preview"/>);
        } else {
          $imagePreview = (<div className="previewText">Vui lòng chọn hình ảnh minh họa cho món ăn</div>);
        }
    
        return (
          <div className="editMenuAdd tab_right">
            <div className="leftContentEdit">
              <form onSubmit={(e)=>this._handleSubmit(e)}>
                <input className="fileInput" 
                    type="file" 
                    name="foodimage"
                    onChange={(e)=>this._handleImageChange(e)} />
                    <input className="nameDishAdd"
                    name="name"
                    type="text"
                    placeholder="Tên món ăn"
                    onChange={this.onHandleChange.bind(this)}
                    />
                    <input className="nameDishAdd"
                    name="unit"
                    type="text"
                    placeholder="Đơn vị"
                    onChange={this.onHandleChange.bind(this)}
                    />
                    <input className="priceDishAdd"
                    name="price"
                    type="number"
                    placeholder="Giá tiền"
                    onChange={this.onHandleChange.bind(this)}
                    />
                    <div className="typeDishRadio">
                      <div className="radioInput">
                        <input type="radio" name="type" value="1" 
                        onChange={this.onHandleChange.bind(this)}/>Khai vị
                      </div>
                      <div className="radioInput">
                        <input type="radio" name="type" value="2" 
                        onChange={this.onHandleChange.bind(this)}/>Món chính
                      </div>
                      <div className="radioInput">
                        <input type="radio" name="type" value="3" 
                        onChange={this.onHandleChange.bind(this)}/>Tráng Miệng
                      </div>
                      <div className="radioInput">
                        <input type="radio" name="type" value="4"
                        onChange={this.onHandleChange.bind(this)}/>Đồ Uống
                      </div>
                    </div>
                      <select className="priceDishAdd" name="typeDish" onChange={this.changeFood}>                        
                        <option>Loại nguyên liệu</option>
                      {this.showSelect1(this.state.fooddata)}
                      </select>
                      <select className="priceDishAdd" name="nameDish" onChange={this.changeFood2}>
                      <option>Tên nguyên liệu</option>
                      {this.showSelect2(this.state.data2)}
                      </select>
                      <input className="priceDishAdd" type="number" name="quality" placeholder="0" onChange={(e) => {this.setState({ingredientsInType: {quality: e.target.value}})}}></input>
                <button className="submitButton" 
                    type="submit" 
                    onClick={(e)=>this._handleSubmit(e)}>Thêm món</button>
                </form>
            </div>
            <div className="imgPreview rightContentEdit">
              {$imagePreview}
            </div>
          </div>
        )
      }
}

export default EditContent;