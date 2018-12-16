import { Get } from '@util/request'
import { API } from '@util/const'

export const queryMissionList = params => Get(`${ API }/news/job/list`, params)
export const queryExchangeList = params => Get(`${ API }/prize/user/list`, params)