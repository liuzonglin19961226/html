<template>
  <a-modal
    title="新建用户"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.memberCardNo > 0" label="主键ID">
          <a-input v-decorator="['memberCardNo']" disabled />
        </a-form-item>
        <a-form-item label="充值金额">
          <a-input-number :min="1" :step="100" v-decorator="['amount', {rules: [{required: true, message: '请输入充值金额！'}]}]" />
        </a-form-item>
        <a-form-item label="充值方式">
          <a-select
            style="width: 300px"
            @change="handleChange"
            v-decorator="['channel', {rules: [{required: true, message: '请选择充值方式！'}]}]"
          >
            <a-select-option value="支付宝">
              支付宝
            </a-select-option>
            <a-select-option value="微信">
              微信
            </a-select-option>
            <a-select-option value="银行卡">
              银行卡
            </a-select-option>
            <a-select-option value="现金">
              现金
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = [ 'memberCardNo', 'amount','channel']

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
  },
  methods:{
    handleChange(ss){
      console.log(ss)
    }
  }
}
</script>
