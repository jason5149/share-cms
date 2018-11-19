import { Get } from '@util/request'
import { API } from '@util/const'

export const queryBrandList = params => Get(`${ API }/brand/list`, params)