const bcrypt = require('bcrypt');
const csrf = require('csrf');
const tokens = new csrf();
import LibContent from '../../../lib/LibContent';
//
export default async function newUser (req, res){
  try{
    const data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }   
    const item = {
      mail: data.mail,
      password: hashed_password,
      name: data.name,
//      created_at: new Date(),
    }    
console.log(item);
    const api_key = data.apikey
    const result = await LibContent.add_item("users", item, 0)
    res.json(data)
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
}
