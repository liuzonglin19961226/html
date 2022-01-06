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
          <a-input v-decorator="['memberOrderID']" disabled />
        </a-form-item>
        <a-form-item label="付款方式">
          <a-select @change="payTypeChange" v-decorator="[
              'payType',
              {rules: [{ required: true, message: '请选择付款方式！' }]}
            ]">
            <a-select-option value="1">会员卡</a-select-option>
            <a-select-option value="2">微信</a-select-option>
            <a-select-option value="3">支付宝</a-select-option>
            <a-select-option value="4">其他</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="会员卡" v-show="selected">
          <a-select
            v-if="selected"
            show-search
            placeholder="请选择会员卡"
            option-filter-prop="children"
            :filter-option="filterOption"
            v-decorator="[
              'memberCardNo',
              {rules: [{ required: true, message: '请选择付款方式！' }]}
            ]"
          >
            <a-select-option v-for="item in memberCard" v-bind:key="item.memberCardNo" :value="item.memberCardNo">
              {{item.memberCardNo}},{{item.memberName}},{{item.memberPhone}}
            </a-select-option>
          </a-select>

          <a-select
            v-else
          >
            <a-select-option v-for="item in memberCard" v-bind:key="item.memberCardNo" :value="item.memberCardNo">
              {{item.memberCardNo}},{{item.memberName}},{{item.memberPhone}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="付款金额">
          <a-input :min="1" :step="100" v-decorator="['memberPriceFinal']" disabled/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
  memberCardListNoPage
} from '@/api/memberCard'
import {memberOrderPay} from "@/api/memberOrder";
// 表单字段
const fields = ['memberOrderID', 'memberPriceFinal', 'payType','memberCardNo']

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
      selected:false,
      memberCard:[]
    }
  },
  created () {
    console.log('custom modal created')
    this.loadMemberCard()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      console.log(this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods:{
    payTypeChange(value){
      if (value === '1'){
        this.selected = true
      }else{
        this.selected = false
      }
    },
    loadMemberCard(){
      memberCardListNoPage()
        .then((res) => {
            this.memberCard = res.data
          }
        )
        .catch(err => {
            this.$message.error(err)
          }
        )
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    }
  }
}
</script>
