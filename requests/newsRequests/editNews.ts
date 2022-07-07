import axios from "../../axios"
interface editInterface {
    author: string, title: string, body: string
}
const EditNews = async(body: editInterface, id: string) => {
    let EditBody: any = {}
   if (body.author !== "" ) {
    EditBody["author"] = body.author
   }
   if (body.title !== "" ) {
    EditBody["title"] = body.title
   }
   if (body.body !== "" ) {
    EditBody["body"] = body.body
   }

const result = await axios.put(`/news/${id}`, EditBody).then(result => result).catch(error =>  error.response.data)
return result
}

export default EditNews;