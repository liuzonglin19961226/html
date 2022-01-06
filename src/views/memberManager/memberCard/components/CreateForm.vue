<template>
  <a-modal
    title="新建会员卡"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-if="model && model.memberCardNo > 0" label="会员卡号">
          <a-input v-decorator="['memberCardNo']" disabled />
        </a-form-item>
        <a-form-item v-else label="会员卡号">
          <a-input v-decorator="['memberCardNo', {rules: [{required: true, message: '请输入会员卡号！'}]}]"  />
        </a-form-item>
        <a-form-item label="会员姓名">
          <a-input v-decorator="['memberName', {rules: [{required: true, message: '请输入会员姓名！'}]}]" />
        </a-form-item>
        <a-form-item label="会员联系方式">
          <a-input v-decorator="['memberPhone', {rules: [{required: true, min: 6, message: '请输入会员联系方式！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['memberName', 'memberCardNo', 'memberPhone']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
