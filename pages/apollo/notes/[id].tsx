import React  from 'react';
import Layout from '../../../components/layout'
import LibContent from '../../../lib/LibContent';
import LibNote from '../../../lib/LibNote';
//
function Page(props) {
  const item = props.item
console.log(item);
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>{item.content}
      </div>      
      <hr />
      <div>category: {item.category}
      </div>
      <hr />
      <div>radio_1: {item.radio_1}
      </div>
      <hr />
      <div>pub_date: {item.pub_date}
      </div>
      <hr />      
      <div>Tags:<br />
      {item.tags.map((item: any, index: number) => {
        return (<span className="mx-2" key={index}>{item}</span>)
      })
      }
      </div>      
      <hr />
      <div>ID : {item.id}
      </div>
      <hr />     
    </div>
  </Layout>
  )
}
/* getServerSideProps */
export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const row:any = await LibContent.get_item(id)
console.log(row);
  const noteTags = await LibContent.get_items("noteTags");
  const tags = LibNote.getTagItems(noteTags, row.id);
  let pub_date = "";
//console.log(typeof row.values.pub_date);
  if(typeof row.values.pub_date !== 'undefined'){
    pub_date = row.values.pub_date;
  }
  const item = {
    id: row.id,
    title: row.values.title, content: row.values.content, category: row.values.category,
    tags: tags, radio_1: row.values.radio_1, pub_date: pub_date,
  }
  return {
    props: { item: item } 
  }
}
export default Page