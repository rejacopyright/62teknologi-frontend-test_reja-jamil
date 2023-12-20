import ax from 'axios'
import qs from 'qs'

const axios = ax.create({
  baseURL: `https://api.yelp.com/v3/businesses`,
  // baseURL: `http://localhost:3001`, // My custom Node & Express to avoid Cors Origin from api.yelp.com
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    // 'Access-Control-Max-Age': 0,
    // 'Cache-Control': 'no-cache',
  },
})

const token: string =
  'Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.interceptors.request.use(
  (req: any) => {
    if (req?.method === 'get' && req?.params) {
      req.paramsSerializer = () =>
        qs.stringify(req?.params, {
          encode: false,
          arrayFormat: 'brackets',
          indices: false,
          strictNullHandling: true,
          skipNulls: true,
        })
    }
    return req
  },
  (error: any) => Promise.reject(error)
)
axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => Promise.reject(error)
)

export default axios
