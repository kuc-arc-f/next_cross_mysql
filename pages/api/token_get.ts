//
import LibCsrf from "../../lib/LibCsrf"
//
export default async  function token_get(req, res) {
  try{
//    var data = req.body
//    console.log(data)
    const csrf = await LibCsrf.get_token(process.env.CSRF_SECRET)
    const retArr= {
      ret:1, user_id:0, csrf: csrf
    }
    return res.json(retArr);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
