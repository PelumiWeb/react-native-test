import axios from "../../axios"
const fetchPaginatedNews =async (page: number) => {
    const response  = await axios.get(`/news?page=${page}&limit=10`).then(response =>  response.data).catch(error => {
        console.log(error.response)
      })
      return response
}

export default fetchPaginatedNews