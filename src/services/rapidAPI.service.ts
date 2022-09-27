import axios from 'axios'

export const searchImage = async (productName: string) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://google-image-search1.p.rapidapi.com/v2/',
      params: { q: productName, hl: 'es' },
      headers: {
        'X-RapidAPI-Key': '3511a42f9cmsh6311d24c8062e6dp1a3975jsn9ff294a436bd',
        'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com',
      },
    }

    return await axios.request(options).then(function (response) {
      return response.data.response.images
    })
  } catch (error) {
    console.error(error)
  }
}
