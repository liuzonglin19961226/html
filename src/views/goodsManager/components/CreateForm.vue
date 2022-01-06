<template>
  <a-modal
    title="商品管理"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.goodsID > 0" label="主键ID">
          <a-input v-decorator="['goodsID']" disabled />
        </a-form-item>
        <a-form-item label="商品名称">
          <a-input v-decorator="['goodsName', {rules: [{required: true, message: '请输入商品名称！'}]}]" />
        </a-form-item>
        <a-form-item label="商品单价">
          <a-input-number :min="0" v-decorator="['goodsPrice', {rules: [{required: true,  message: '请输入单价！'}],initialValue: 0}]" />
        </a-form-item>
        <a-form-item label="商品数量">
          <a-input-number :min="0" v-decorator="['goodsNumber', {rules: [{required: true,  message: '请输入数量！'}],initialValue: 0}]" />
        </a-form-item>
        <a-form-item label="商品单位">
          <a-input v-decorator="['goodsUnit', {rules: [{required: true, message: '请输入商品单位！'}]}]" />
        </a-form-item>
        <a-form-item label="商品折扣">
          <a-input v-decorator="['goodsSale']" />
        </a-form-item>
        <a-form-item label="商品描述">
          <a-input v-decorator="['goodsDesc']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['goodsID', 'goodsName', 'goodsPrice', 'goodsSale', 'goodsDesc', 'goodsUnit','goodsNumber']

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
