export const BASE_PATH = process.env.NODE_ENV === 'development' ? '' : '/backend'
export const API = '/share-cms'
export const UPLOAD_FIELD = 'image'
export const UPLOAD_URL = `${ API }/common/upload`
export const MAX_UPLOAD_SIZE = 2 * 1024 * 1024

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