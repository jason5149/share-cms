import { observable, action } from 'mobx'
import { message } from 'antd'
import { queryConfig, updateConfig } from '@service/follow'

class FollowModel {
  @observable
  configFormItems = [
    { label: '标题栏文案', field: 'context', type: 'input', subType: 'string', placeholder: '请输入标题栏文案', value: null, required: true, validateMessage: '请输入标题栏文案' },
    { label: 'H5背景图', field: 'backImage', type: 'upload', subType: 'single', preview: [], required: true, validateMessage: '请输入H5背景图' },
  ]


  @action
  queryConfig = async () => {
    const result = await queryConfig()

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return this.fillConfigForm(result.body)
  }

  @action
  updateConfig = async params => {
    const result = await updateConfig(params)

    if (result.code !== '10000') {
      message.error(result.message)
      return
    }

    return true
  }

  @action
  setPreviewImg = (label, file) => {
    this.configFormItems.map(value => {
      if (value.label === label) {
        value.preview.splice(0, 1, file)
      }

      return value
    })
  }

  @action
  fillConfigForm = item => {
    if (!item) return true

    this.configFormItems.map(config => {
      if (config.field in item) {
        if (['input'].indexOf(config.type) !== -1) {
          config.value = item[config.field]
        } else if (config.type === 'upload') {
          config.preview = [{
            uid:    '-1',
            name:   `${ config.field }.png`,
            status: 'done',
            url:    item[config.field],
          }]
        }
      }

      return config
    })

    return true
  }
}

export default new FollowModel()
