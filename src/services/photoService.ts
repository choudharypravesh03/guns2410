
import api from '../api/ApiClient'

export type PhotosType = {
    id: string,
    description: string,
    url: string,
    link: string,
    topics: string[],
    user: string
  }

export const getPhotos = async (): Promise<PhotosType[]> => api.get(`/photos`)