const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();
import LibContent from '../../../lib/LibContent';
//
export default async function authCheck (req, res) {
  try{
    if (req.method === "POST") {
      const retArr: any = {ret: 0, user_id:0}
      const data = req.body
//console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      } 
      const users = await LibContent.get_items("users");
//console.log(users);  
      let userOne: any = users.filter(item => (item.values.mail === data.mail));
      if(typeof userOne[0] === 'undefined'){
        throw new Error('Nothing db, user');
      }
      userOne = userOne[0];
//console.log(userOne);  
      if (bcrypt.compareSync(data.password,  userOne.values.password )){
        retArr.ret = 1
        retArr.user = userOne
        return res.json(retArr);
      }else{
        return res.json(retArr);
      } 
    }else{
      return res.status(404).send("");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
