import { Get, Post } from '@util/request'
import { API } from '@util/const'

export const queryPrizeList = params => Get(`${ API }/prize/list`, params)
export const createPrize = params => Post(`${ API }/prize/insert`, params)