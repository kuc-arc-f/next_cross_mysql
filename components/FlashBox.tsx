import Link from 'next/link';
import Head from 'next/head';
import flash from 'next-flash';
import React from 'react'

interface IProps {
  messages_success: string,
}
//
export default class Page extends React.Component<IProps> {
  static async getInitialProps (ctx) {
//    return flash.get(ctx).messages_success || ''
    return {
      messagess: flash.get(ctx).messages_success || ''
    }
  }  
  componentDidMount(){
    console.log(this.props)

  }
  render(){
    return (
    <div>FLASH:
      { this.props.messages_success ? <div>FLASH MESSAGE {this.props.messages_success}</div> : <div /> }
    </div>
    );
  }
}
