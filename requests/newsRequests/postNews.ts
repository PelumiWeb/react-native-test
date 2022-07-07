import axios from "../../axios"

const PostNews = async(body: {author: string, title: string}) => {
const result = await axios.post(`/news/`, body).then(result => result.data).catch(error =>  error.response)
return result
}

export default PostNews;