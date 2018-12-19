import { Get } from '@util/request'
import { API } from '@util/const'

export const queryMemberList = params => Get(`${ API }/user/list`, params)
export const queryMemberDetail = params => Get(`${ API }/user/getUserById`, { userId: params.id })