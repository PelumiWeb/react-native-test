import axios from "../../axios"

const DeleteNews = async(id:string) => {
const result = await axios.delete(`/news/${id}`).then(result => result.data).catch(error =>  error.response)
return result
}

export default DeleteNews;