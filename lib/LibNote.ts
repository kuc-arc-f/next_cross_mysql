import LibContent from './LibContent';
//
const LibNote = {
  get_category_item : function(id , categories){
    try{
      let ret = {}
      categories.forEach(function (category){
        if( id === category._id ){
          ret = category
        }
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_category_item');
    } 
  },
  getTagItems: function(items, note_id){
    try{
      const ret = [];
      const tags = items.filter(item => (item.values.note_id === note_id));
//console.log(tags);
      tags.forEach(function(item, index){
        ret.push(item.values.name);
      }); 
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , getTagItems');
    } 
  },
  /* noteTags delete */
  deleteManyTags:async function(items, note_id){
    try{
      const tags = items.filter(item => (item.values.note_id === note_id));
//console.log(tags);
      for (let tag of tags) {
        const result = await LibContent.delete_item(tag.id)
      }
    } catch (e) {
      console.error(e);
      throw new Error('Error , deleteManyTags');
    }
  },  
}
export default LibNote;
