import React, { Component } from 'react';
import Link from 'next/link';

//
const IndexRow = props => (
  <li>
    ID: {props.id} , 
    <Link href={`/apollo/tasks/${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <Link href={`/apollo/tasks/edit/${props.id}`}>
      <a>[ edit ]</a>
    </Link>    
  </li>
);
export default IndexRow;