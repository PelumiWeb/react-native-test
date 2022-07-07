import axios from "../../axios"
const fetchImageData = async (id:number) => {
    const response = await axios
      .get(`/news/${id}/images`)
      .then((res) => res.data)
      .catch((err) => err.response).finally(() => {
      })
      return response
  };
 export default fetchImageData