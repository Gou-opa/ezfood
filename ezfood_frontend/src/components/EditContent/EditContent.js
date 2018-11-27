import React, { Component } from 'react';

class EditContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: '',
            dishName: '',
            disPrice: 0,
            isAdded: false,
            typeDish: '1'
        };
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
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
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">Vui lòng chọn hình ảnh minh họa cho món ăn</div>);
        }
    
        return (
          <div className="editMenuAdd">
            <div className="leftContentEdit">
                <form onSubmit={(e)=>this._handleSubmit(e)}>
                <input className="fileInput" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
                    <input className="nameDishAdd"
                    name="dishName"
                    type="text"
                    placeholder="Tên món ăn"
                    onChange={this.onHandleChange.bind(this)}
                    />
                    <input className="priceDishAdd"
                    name="dishPrice"
                    type="number"
                    placeholder="Giá tiền"
                    onChange={this.onHandleChange.bind(this)}
                    />
                    <div class="typeDishRadio">
                      <div className="radioInput">
                        <input type="radio" name="typeDish" value="1" />Khai vị
                      </div>
                      <div className="radioInput">
                        <input type="radio" name="typeDish" value="2" />Món chính
                      </div>
                      <div className="radioInput">
                        <input type="radio" name="typeDish" value="3" />Tráng Miệng
                      </div>
                      <div className="radioInput">
                        <input type="radio" name="typeDish" value="4" />Đồ Uống
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