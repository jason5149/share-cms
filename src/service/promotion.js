import { Get, Post, Delete } from '@util/request'
import { API } from '@util/const'

export const queryChannelList = params => Get(`${ API }/oper/list`, params)

export const createChannel = params => Post(`${ API }/oper`, params)

export const deleteChannel = params => Delete(`${ API }/oper/${ params.id }`)