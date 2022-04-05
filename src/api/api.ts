import axios from 'axios'

const preUrl = "http://localhost:4000/"

const apiGet = async (url: string, urlParams: any) => {
    
    let config = {
       params: urlParams,
    }
 
    try {
       const response = await axios.get(`${preUrl}${url}`, config)
       if (response.status === 400 || response.status === 500)
          throw response.data
    
       return response.data
    } catch (err) {
       throwError(err)
    }
 }

 function throwError(err: any) {
    console.log(`${err.config.url} ${err.message}`)
    alert(`${err.config.url} ${err.message}`)
    throw err[1]
 }

 export {
    apiGet,
 }