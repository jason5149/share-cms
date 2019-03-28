export const BASE_PATH = process.env.NODE_ENV === 'development' ? '' : '/backend'
export const API = '/share-cms'
export const UPLOAD_FIELD = 'image'
export const UPLOAD_URL = `${ API }/common/upload`
export const MAX_UPLOAD_SIZE = 2 * 1024 * 1024
export const CHANNEL_LINK = process.env.NODE_ENV === 'development' ? 'http://dev.tangjc.com/client/follow' : 'http://dev.tangjc.com/client/follow'

export const ADVERTISING_OPTIONS = [
  { name: '是', value: 1 }, 
  { name: '否', value: 0 }, 
]

export const ADVERTISING_DESC = {
  1: '是',
  0: '否',
}

export const PRIZE_TYPE_OPTIONS = [
  { name: '实物类', value: 1 },
  { name: '现金类', value: 2 },
  { name: '卡券类', value: 3 },
]

export const PRIZE_TYPE_DESC = {
  1: '实物类',
  2: '现金类',
  3: '卡券类',
}

export const ADVERTISING_INSERT_OPTIONS = [
  { name: '第一张图后面，若整篇新闻无图片，插入新闻最后', value: 1 },
  { name: '第二张图后面，若无第二张图片，默认插入第一张后面，若整篇新闻无图片，插入新闻最后', value: 2 },
  { name: '第三张图后面，若无第三张图片，默认插入第二张后面，若整篇新闻无图片，插入新闻最后', value: 3 },
  { name: '第四张图后面，若无第四张图片，默认插入第三张后面，若整篇新闻无图片，插入新闻最后', value: 4 },
  { name: '第五张图后面，若无第五张图片，默认插入第四张后面，若整篇新闻无图片，插入新闻最后', value: 5 },
  { name: '插入新闻最后', value: 99 },
]

export const BANNER_TYPE_OPTIONS = [
  { name: '外部', value: 1 },
  { name: '内部', value: 2 },
]

export const BANNER_TYPE_DESC = {
  1: '外部',
  2: '内部',
}

export const STATUS_DESC = {
  0: '关闭',
  1: '正常',
}

export const SHIPMENT_TYPE_DESC = {
  1: '未寄出',
  2: '已寄出',
  3: '已签收',
}

export const EXCHANGE_STATUS_DESC = {
  1: '平台',
  2: '品牌商',
}

export const PARTNER_TYPE_DESC = {
  1: '自己关注',
  2: '老带新',
  3: '渠道推广',
}