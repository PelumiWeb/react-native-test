import axios from "../../axios"

const GetComments = async (id: string) => {
const result = await axios.get(`/news/${id}/comments`).then(result => result.data).catch(error =>  error.response.data)
return result
}

export default GetComments;