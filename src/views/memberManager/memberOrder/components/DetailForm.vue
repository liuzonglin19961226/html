<template>
  <a-modal
    title="查看订单"
    :width="1080"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('cancel') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading||loadingSelf">
      <a-row :gutter="48">
        <a-col :md="24" :sm="24">
          <div class="insertForm">
            <h2 style="text-align: center;">订单商品</h2>
            <a-row>
              <a-col :md="8" :sm="24">名称</a-col>
              <a-col :md="8" :sm="24">数量</a-col>
              <a-col :md="8" :sm="24">金额</a-col>
            </a-row>
            <a-row v-for="item in goodsData" v-bind:key="item.goodsID">
              <a-col :md="8" :sm="24">{{item.goodsName}}</a-col>
              <a-col :md="8" :sm="24">{{item.goodsNumber}}</a-col>
              <a-col :md="8" :sm="24">{{item.goodsNumber*item.goodsPrice*item.goodsSale}}</a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import {Collapse} from "ant-design-vue";
import {
  memberOrderDetail,
} from '@/api/memberOrder'
import pick from "lodash.pick";

export default {
  components: {
    ACollapse: Collapse,
    ACollapsePanel:Collapse.Panel,
  },
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
      goodsData:[],
      activeKey: ['0'],
      memberOrderID: null,
      loadingSelf:false
    }
  },
  created () {
    console.log('custom modal created')
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.loadCategoryDetailList(this.model.memberOrderID)
    })
  },
  methods:{
    loadCategoryDetailList(memberOrderID){
      this.loadingSelf = true
      memberOrderDetail({'memberOrderID' : (memberOrderID?memberOrderID:this.memberOrderID)})
        .then((res) => {
            if (res.state === 'success') {
              this.goodsData = res.data.goodsList
            } else {
              this.$message.error(`查询失败`)
            }
          }
        )
        .catch(err => {
          this.$message.error(err)
        })
      this.loadingSelf = false
    },
    redContent(content){
      return <div style = 'color:red;' >  {content} </div>
    }
  }
}
</script>

<style scoped>
  .insertForm{
/*    border-right: 1px solid;*/
    padding-left: 10px;
    padding-right: 10px;

  }
  /deep/ .ant-input-number-input{
    height: 100%;
  }
</style>
