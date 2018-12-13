import { Get, Post } from '@util/request'
import { API } from '@util/const'

export const queryPrizeList = params => Get(`${ API }/prize/list`, params)
export const queryPrizeDetail = params => Get(`${ API }/prize/${ params.id }`)
export const createPrize = params => Post(`${ API }/prize/insert`, params)
export const updatePrize = params => Post(`${ API }/prize/update`, params)