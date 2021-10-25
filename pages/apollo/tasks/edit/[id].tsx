import React  from 'react';
//import LibFlash from '../../lib/LibFlash';

import LibContent from '../../../../lib/LibContent';
import Layout from '../../../../components/layout'
//
interface IState {
  id: number,
  title: string,
  content: string,
}
interface IProps {
  history: string[],
  item: any,
  id: number,
}
class TaskEdit extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
    const id = ctx.query.id;
    const row = await LibContent.get_item(id)
    return {
      id: id,
      item: row,
    };
  }  
  constructor(props: any) {
    super(props);
console.log(props);
    this.state = {
      id: props.id,
      title: props.item.values.title,
      content: props.item.values.content
    };
  }
  async componentDidMount(){
//console.log(this.state)   
  }
  async clickHandler(){
    try {
      const title = document.querySelector<HTMLInputElement>('#title');
      const content = document.querySelector<HTMLInputElement>('#content');
      const values = {
        title: title.value,
        content: content.value,
      }
      const result =await LibContent.update_item(this.state.id, "tasks", values)
console.log(result)      
      alert("Complete, update");
      location.href = '/apollo/tasks';
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
      location.href = '/apollo/tasks';
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }
  }
  render() {
    return (
    <Layout>
      <div className="container py-2">
        <h3>Todos - Edit</h3>
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
