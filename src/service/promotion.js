import { Get, Post, Put, Delete } from '@util/request'
import { API } from '@util/const'

export const queryConfig = () => Get(`${ API }/oper/read/count`)

export const updateConfig = params => Put(`${ API }/oper/read/count`, params)

export const queryChannelList = params => Get(`${ API }/oper/list`, params)

export const queryChannelDetail = params => Get(`${ API }/oper/${ params.id }`)

export const createChannel = params => Post(`${ API }/oper/insert`, params)

export const updateChannel = params => Put(`${ API }/oper/${ params.id }`, params)

export const deleteChannel = params => Delete(`${ API }/oper/${ params.id }`)