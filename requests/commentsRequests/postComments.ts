import axios from "../../axios"
interface Comments {
    newsId: number, 
    name: string,
     avatar: string, 
     comment: string
}
//I think there is a problem with the comments endpoint.
const PostComments = async(body: Comments,) => {
const result = await axios.post(`/news/${body.newsId}/comments`, body).then(result => result.data).catch(error =>  error.response)
return result
}

export default PostComments;