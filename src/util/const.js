export const BASE_PATH = ''
export const API = '/share-cms'
export const UPLOAD_FIELD = 'image'
export const UPLOAD_URL = `${ API }/common/upload`
export const MAX_UPLOAD_SIZE = 2 * 1024 * 1024

export const ADVERTISING_OPTIONS = [
  { name: '是', value: 1 }, 
  { name: '否', value: 0 }, 
]

export const PRIZE_TYPE_OPTIONS = [
  { name: '实物类', value: 1 },
  { name: '现金类', value: 2 },
  { name: '卡券类', value: 3 },
]