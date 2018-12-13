import { Base64 } from 'js-base64'

export const base64encode = item => {
  if (typeof item === 'string') {
    return Base64.encode(item)
  } else if (typeof item === 'object') {
    return encodeURIComponent(Base64.encode(JSON.stringify(item)))
  }
}

export const base64decode = (item, type = 'json') => {
  const itemDecode = decodeURIComponent(item)
  if (type === 'json') {
    return JSON.parse(Base64.decode(itemDecode))
  } else if (type === 'string') {
    return Base64.decode(item)
  }
}

export const handleImageObj = file => {
  if (file && file.url) {
    return file.url
  } else if (file.response) {
    return file.response.body
  } else {
    return ''
  }
}
