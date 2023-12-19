import axios from './axios'

export const getBusiness = (params: any) => {
  return axios({
    method: 'get',
    url: `search`,
    params: params,
  })
}

export const getBusinessDetail = (business_id: string) => {
  return axios({
    method: 'get',
    url: `${business_id}`,
  })
}

export const getBusinessReviews = (business_id: string) => {
  return axios({
    method: 'get',
    url: `${business_id}/reviews`,
  })
}
