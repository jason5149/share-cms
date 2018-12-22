import { Get, Post, Put } from '@util/request'
import { API } from '@util/const'

export const queryNewsList = params => Get(`${ API }/news/list`, params)

export const queryNewsTemplate = params => Get(`${ API }/common/selectGuideById`, params)

export const updateNewsTemplate = params => Post(`${ API }/common/updateGuide`, params)

export const queryBannerList = params => Get(`${ API }/common/bannerList`, params)

export const queryBannerDetail = params => Get(`${ API }/common/banner/${ params.id }`)

export const createBanner = params => Post(`${ API }/common/insertBanner`, params)

export const updateBanner = params => Put(`${ API }/common/updateBanner`, params)

// export const deleteBanner = params => Post(`${ API }/common/insertBanner`, params)