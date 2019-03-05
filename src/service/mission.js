import { Get, Post, Put, Delete } from '@util/request'
import { API } from '@util/const'

export const queryMissionList = params => Get(`${ API }/news/job/list`, params)
export const queryExchangeList = params => Get(`${ API }/prize/user/list`, params)
export const queryExchangeDetail = params => Get(`${ API }/prize/exchange/${ params.id }`)
export const deliveryShip = params => Post(`${ API }/prize/shipment`, params)
export const queryExpressList = params => Get(`${ API }/express/list`, params)
export const queryExpressDetail = params => Get(`${ API }/express/${ params.id }`)
export const createExpress = params => Post(`${ API }/express/insert`, params)
export const updateExpress = params => Put(`${ API }/express/${ params.id }`, params)
export const deleteExpress = params => Delete(`${ API }/express/${ params.id }`)