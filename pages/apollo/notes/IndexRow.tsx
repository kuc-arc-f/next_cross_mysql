import React, { Component } from 'react';
import Link from 'next/link';

//
const IndexRow = props => (
  <li>
    ID: {props.id} , 
    <Link href={`/apollo/notes/${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <Link href={`/apollo/notes/edit/${props.id}`}>
      <a className="mx-2">[ Edit ]</a>
    </Link>    
  </li>
);
export default IndexRow;