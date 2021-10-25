//
const LibCms = {
  get_const: function(){
      return {
          aa: "aaa",
      }
  },
  get_show_item: function(items, id){
    let ret = null;
    items.forEach(function(item){
//console.log(item.show_id );
        if(item.show_id === String(id) ){
            ret = item
        }
    });
    return ret
  }, 
  get_page_item: function(items, id){
    let ret = null;
    items.forEach(function(item){
//console.log(item.show_id );
        if(item.save_id === String(id) ){
            ret = item
        }
    });
    return ret
  },        
  get_category_item: function(items, id){
    let ret = {
        id: 0,
        name: "",
        save_id: "id0",
    };
    items.forEach(function(item){
//console.log(item.show_id );
      if(item.save_id === String(id) ){
          ret = item
      }
    });
    return ret
  },    
  get_category_data: function(items, id){
    const ret = [];
    items.forEach(function(item){
//console.log(item.category.save_id );
        if(item.category.save_id === String(id) ){
            ret.push(item)
        }
    });
    return ret
  },
  get_post_items : function(posts , categories){
    try{
      const ret = []
      posts.forEach(function (item) {
        item.category = { name: ""}
          categories.forEach(function (category){
            if( item.category_id === category._id ){
              //console.log( category )
              item.category = category ;
            }
          });
          ret.push(item)
      });
      return ret;  
    } catch (e) {
      console.log(e);
      throw new Error('Error , get_post_items');
    } 
  },

}
export default LibCms;
