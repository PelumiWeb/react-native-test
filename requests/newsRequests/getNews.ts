import axios from "../../axios"

const GetNews = async(id: string) => {
const result = await axios.get(`/news/${id}`).then(result => result.data).catch(error =>  error.response)
return result
}

export default GetNews;