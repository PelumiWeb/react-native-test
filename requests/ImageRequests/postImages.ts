import axios from "../../axios"

const PostImage = async(body: {newsId: number, image: string},) => {
const result = await axios.post(`/news/${body.newsId}/images`, body).then(result => result.data).catch(error =>  error.response)
return result
}

export default PostImage;