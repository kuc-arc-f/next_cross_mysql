import React  from 'react';
//import LibFlash from '../../lib/LibFlash';
import Layout from '../../../../components/layout'

import LibContent from '../../../../lib/LibContent';
import LibNote from '../../../../lib/LibNote';
//
interface IState {
  id: number,
  title: string,
  content: string,
  categoryItems: Array<any>,
  tagItems: Array<any>,
  radioItems: Array<any>,
  radio_1: string,
  pub_date: string,  
}
interface IProps {
  history: string[],
  item: any,
  id: number,
  tags: Array<any>,
  noteTags: Array<any>,
}
class TaskEdit extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
    const id = ctx.query.id;
    const row:any = await LibContent.get_item(id);
    const noteTags = await LibContent.get_items("noteTags");
    const tags = LibNote.getTagItems(noteTags, row.id);
    return {
      id: id,
      item: row,
      tags: tags,
      noteTags: noteTags,
    };
  }  
  constructor(props: any) {
    super(props);
console.log(props);
    this.state = {
      id: props.id,
      title: props.item.values.title,
      content: props.item.values.content,
      radio_1: props.item.values.radio_1,
      pub_date: props.item.values.pub_date,
      categoryItems: [], tagItems: [],
      radioItems: [],
    };
  }
  async componentDidMount(){
    const categoryItems = await LibContent.get_items("categoryItems");
    const tagItems = await LibContent.get_items("tagItems");
    const radioItems = await LibContent.get_items("radioItems");
//console.log(radioItems);    
console.log(this.props.item.values)
    this.setState({
      categoryItems: categoryItems, tagItems: tagItems, radioItems: radioItems 
    });
    const category = document.querySelector<HTMLInputElement>('#category');
    category.value = this.props.item.values.category;
    const pub_date = document.querySelector<HTMLInputElement>('#pub_date');
    pub_date.value= this.props.item.values.pub_date;    
  }
  async clickHandler(){
    try {
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const category = document.querySelector<HTMLInputElement>('#category');
      const pub_date = document.querySelector<HTMLInputElement>('#pub_date');
      const arrChecked = [] 
      const check_items = this.state.tagItems;  
      check_items.forEach(function(item, index){
console.log(item.values.name) 
        let checkedName = "check_" + index;
        let elemChecked = document.querySelector<HTMLInputElement>('#'+ checkedName);
        if(elemChecked.checked){
          arrChecked.push(item.values.name)
        }
      });      
//console.log(arrChecked)      
      const values = {
        title: title.value,
        content: content.value,
        category: category.value,
        radio_1: this.state.radio_1,
        pub_date: pub_date.value,
      }
      const result =await LibContent.update_item(this.state.id, "notes", values)
console.log(result.data.updateContent.id);
      if(result.data.updateContent.id !== 'undefined'){
        //deleteTag
        await LibNote.deleteManyTags(this.props.noteTags, this.state.id); 
        for (let item of arrChecked) {
//console.log(item);
          let row:any = {note_id: this.state.id, name: item}
          await LibContent.add_item("noteTags", row, "")
        }
        alert("Complete, update");
      }else{
        throw new Error('nothing, noteId update');
      } 
      location.href = '/apollo/notes';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  }
  async deleteHandler(){
    try {
      const result = await LibContent.delete_item(this.state.id)
console.log(result)
      alert("Complete, delete");
      location.href = '/apollo/notes';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }
  }
  valid_check(items , value){
    let valid = false
    const rows = items.filter(item => (item === value));
    if( rows.length > 0){ valid=true }
    return valid
  }  
  checkRow(){
//console.log(this.props.tags)
    const check_items = this.state.tagItems;
    return check_items.map((item: any, index: number) => {
//console.log(item.values.name );
      const valid = this.valid_check(this.props.tags , item.values.name)
      let name = "check_" + index;
      return(
        <label key={index}>
          <input type="checkbox" name={name} id={name} defaultChecked={valid} />
          <span className="px-2">{item.values.name}</span>
        </label>           
      )      
    })
  }
  handleChangeRadio(e){
    this.setState({radio_1: e.target.value})
  }    
  render() {
//console.log(this.state.tagItems);
    return (
    <Layout>
      <div className="container py-2">
        <h3>Notes - Edit</h3>
        ID : {this.state.id} 
        <hr />   
        <label>Title:</label>
        <input type="text" name="title" id="title"
          defaultValue={this.state.title} />
        <hr />
        <label>Content:</label>
        <input type="text" name="content" id="content" 
        defaultValue={this.state.content} />
        <hr />
        <div className="col-md-6 form-group">
          <label>Category:</label>
          <select className="form-select" name="category" id="category">
          {this.state.categoryItems.map((item ,index) => (
            <option key={index} value={item.values.name}>{item.values.name}</option>
          ))
          }
        </select>
        <hr />
        <div className="form-group">
          <label>Date:</label>
          <div className="col-sm-6">
            <input type="date" name="pub_date" id="pub_date" className="form-control" 
            />
          </div>
        </div>        
        <hr />
        <label>RadioType:</label><br />
        {this.state.radioItems.map((item ,index) => {
//console.log(item);
          return (
            <span key={index}>
              <input type="radio" name="radio_1" id="radio_1" value={item.values.name}
              defaultChecked={this.state.radio_1 === item.values.name}
              onChange={this.handleChangeRadio.bind(this)} />
                {item.values.name}<br />
            </span>
          );
        })
        }
        <hr />
        Tags:<br />
        {this.checkRow()}
        </div>
        <hr />      
        <button onClick={() => {this.clickHandler()}}>Save
        </button>   
        <hr />
        <button onClick={() => {this.deleteHandler()}}>Delete
        </button>
      </div>
    </Layout>
    );
  }
}
export default TaskEdit;
