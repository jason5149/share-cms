import { observable, action } from 'mobx'
import React from 'react'
import moment from 'moment'
import { Badge, message } from 'antd'
import { queryBannerList } from '@service/article'

class ArticleModel {
  @observable
  bannerList = [] 

  @observable
  bannerListTotal = 0

  @observable
  bannerListColumn = []

  @observable
  bannerListPageNum = 1

  @action
  queryBannerList = async params => {
    const result = await queryBannerList(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    this.bannerListPageNum = params.currentPage

    if (result.body) {
      this.bannerList = result.body.list
      this.bannerListTotal = result.body.page.totalNum
    }
  }
}

export default new ArticleModel()