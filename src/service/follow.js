import { Get, Put } from '@util/request'
import { API } from '@util/const'

export const queryConfig = () => Get(`${ API }/weixin/follow/context`)

export const updateConfig = params => Put(`${ API }/weixin/follow/context`, params)
