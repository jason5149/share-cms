import { Get, Post, Delete } from '@util/request'
import { API } from '@util/const'

export const queryBrandList = params => Get(`${ API }/brand/list`, params)
export const createBrand = params => Post(`${ API }/brand/insert`, params)
// export const updateBrand = params => Put(`${ API }/brand/${ params.id }`)
export const deleteBrand = params => Delete(`${ API }/brand/${ params.id }`)