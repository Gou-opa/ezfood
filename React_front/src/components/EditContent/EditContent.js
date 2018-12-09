import React, { Component } from 'react';
import axios from 'axios';
import callApi from '../../service/APIservice';
//import { Redirect ,Link} from 'react-router-dom';

class EditContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          form: null,
            filename: "",
            file: "",
            url: '',
            name: '',
            price: 0,
            isAdded: false,
            type: 1,
            unit:'',
            loaded: 0
        };
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        var{type,name,price,filename,unit} =this.state;
        var url = '/images/dish/'+ this.state.filename;
        console.log(this.state);
        console.log(url);
        if(this.checkInfo() === true ){
          callApi(`manager/dish`, 'POST', {
            type : type,
            name : name,
            price : price,
            unit: unit,
            filename: filename, 
            url: url          
          }).then(res => {
              console.log(res);
          })
          const formData = new FormData()
          formData.append('foodimage', this.state.file, this.state.file.name)
          // formData.name = this.state.name
          // formData.price = this.state.price
          // formData.unit = this.state.unit
          // formData.type = this.state.type
          // formData.filename = this.state.filename
          // formData.append('price', this.state.price)
          // formData.append('unit', this.state.unit)
          // formData.append('type', this.state.type)
          callApi('upload','POST', formData)
            .then(res => {
              if(res.status === 200){
                console.log(res);
                alert('Đã thêm món');
              }
          //     console.log(res);
          //     console.log(formData.get('name'));
          //     console.log(formData.get('foodimage'));
          //     console.log(formData.get('unit'));
          //     console.log(formData.get('type'));
          //     console.log(formData.get('price'));
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
                      {/* <input type="radio" name="typeDish" value="2" />Món chính
                      <input type="radio" name="typeDish" value="3" />Tráng Miệng
                      <input type="radio" name="typeDish" value="4" />Đồ Uống */}
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