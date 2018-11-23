import { Get } from '@util/request'
import { API } from '@util/const'

export const queryBannerList = params => Get(`${ API }/common/bannerList`, params)