import React  from 'react';
import Link from 'next/link';
import { gql } from "@apollo/client";
import Layout from '../../../components/layout'
import client from '../../../apollo-client'
import LibCookie from '../../../lib/LibCookie'
import LibContent from '../../../lib/LibContent';
import LibApiFind from '../../../lib/LibApiFind';
import LibAuth from '../../../lib/LibAuth';
import IndexRow from './IndexRow';

interface IProps {
  items: Array<object>,
  history:string[],
}
interface IState {
    items: any[],
    user_id: number,
  }
interface IObject {
  id: number,
  title: string
}
//
class TasksIndex extends React.Component<IProps, IState> {
  static async getInitialProps(ctx) {
//console.log(data.data);  
    return {
      items: [],
    }
  }
  constructor(props){
    super(props)
    this.state = { items: [], user_id: 0 };
//console.log(props);   
  }       
  async componentDidMount(){
    const key = process.env.COOKIE_KEY_USER_ID;
    const valid = LibAuth.valid_login();
console.log(valid);
    let uid = 0;
    if(valid){
      uid = LibAuth.get_uid()
console.log("uid=", uid);
      this.setState({user_id: Number(uid) })

    }
/*
    if(LibCookie.get_cookie(key) === null){
      location.href = '/login';
    } 
*/
    const items = await LibContent.get_items_uid("tasks", uid);
console.log(items);
    this.setState({items: items }) 
  }
  render() {
    const data = this.state.items;
//console.log(data);
    return (
    <Layout>
    <div className="container py-4">
      <h3>Tasks - index</h3>
      <Link href="/apollo/tasks/Create">
        <a className="btn btn-primary mt-2">New</a>
      </Link>
      <hr />
      {data.map((item: any ,index: number) => {
//console.log(item.values.title);
        return (
          <IndexRow key={index} id={item.id} title={item.values.title} />
        )
      })}      
    </div>
    </Layout>
    );
  }
}
export default TasksIndex;
