
//
const LibBook = {
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
  get_tag_items : function(ids , tags){
    try{
      const ret = []
      ids.forEach(function (item){
        tags.forEach(function (tag){
          if( item === tag.id ){
            ret.push(tag)
          }
        });
//console.log(item)
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_tag_items');
    } 
  }
}
export default LibBook;
