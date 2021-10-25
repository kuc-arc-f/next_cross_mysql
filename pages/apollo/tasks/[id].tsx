import React  from 'react';
import LibContent from '../../../lib/LibContent';
import Layout from '../../../components/layout'
//
function Page(props) {
  const item = props.item
console.log(item )
  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>Content:<br />
        {item.content}
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
  const id = Number(ctx.query.id);
  const row:any = await LibContent.get_item(id)
//console.log(row)
  const item = {
    id: row.id,
    title: row.values.title ,content: row.values.content
  }
  return {
    props: { item: item } 
  }
}
export default Page