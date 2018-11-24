import { Get, Post } from '@util/request'
import { API } from '@util/const'

export const queryBannerList = params => Get(`${ API }/common/bannerList`, params)

export const createBanner = params => Post(`${ API }/common/insertBanner`, params)

// export const deleteBanner = params => Post(`${ API }/common/insertBanner`, params)