<template>
  <a-modal
    title="调整金额"
    :width="1024"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-if="model && model.memberOrderID">
          <a-input type="hidden" v-decorator="['memberOrderID']"  />
        </a-form-item>
        <a-form-item label="调整方式">
          <a-radio-group name="radioGroup" v-decorator="['changeType',{initialValue:1}]" @change="onChangeValue">
            <a-radio :value="1">
              打折
            </a-radio>
            <a-radio :value="2">
              修改金额
            </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="调整金额">
          <a-input-number v-decorator="['changeAmount', {rules: [{required: true,  message: '请输入调整金额！'}]}]" @change="onChange"/>
        </a-form-item>

        <a-form-item label="调整备注">
          <a-input v-decorator="['changeMsg', {rules: [{required: true,  message: '请输入调整备注！'}]}]"/><span style="color: red">用来打印小票中优惠备注</span>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['memberOrderID', 'changeAmount', 'changeMsg']

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
      form: this.$form.createForm(this),
      value : 1,
      changeAmount:0
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
    onChange(e){
      this.changeAmount = e
      if (this.value === 1 && e){
        this.form.setFieldsValue({changeMsg:'优惠'+e+'折'})
      }else if (!e){
        this.form.setFieldsValue({changeMsg:''})
      }

    },
    onChangeValue(e){
      this.value = e.target.value
      if (e.target.value === 1){
        if (this.changeAmount){
          this.form.setFieldsValue({changeMsg:'优惠'+this.changeAmount+'折'})
        }
      }else{
        this.form.setFieldsValue({changeMsg:''})
      }

    }
  }
}
</script>

<style scoped>
  /deep/ .ant-input-number{
    width: 100%!important;
  }
</style>
