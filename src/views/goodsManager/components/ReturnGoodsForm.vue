<template>
  <a-modal
    title="套餐管理"
    :width="1024"
    :visible="visible"
    :confirmLoading="loading"
    @ok="ok"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-row :gutter="48">
        <a-col :md="8" :sm="24">
          菜品
        </a-col>
        <a-col :md="8" :sm="24">
          数量
        </a-col>
        <a-col :md="8" :sm="24">
          <div>操作</div>
        </a-col>
      </a-row>

      <a-row :gutter="48" style="padding-bottom: 20px;padding-top: 20px">
        <a-col :md="8" :sm="24">
          <a-input v-model="goodsName" placeholder="请输入菜品名称" @keyup.enter="addGoods"/>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-input-number :min="1" :step="1" v-model="num"  @keyup.enter="addGoods"/>
        </a-col>
        <a-col :md="8" :sm="24">
          <a-icon type="plus"  style="cursor: pointer;font-size: 24px;color: mediumspringgreen"  @click="addGoods"/>
        </a-col>
      </a-row>

      <a-row :gutter="48" v-for="(item,index) of data" v-bind:key="item.goodsID">
        <a-col :md="8" :sm="24">
          {{item.goodsName}}
        </a-col>
        <a-col :md="8" :sm="24">
          {{item.goodsNumber}}
        </a-col>
        <a-col :md="8" :sm="24">
          <a-icon type="delete"  style="cursor: pointer;font-size: 24px;color: red"  @click="deleteGoods(index)"/>
        </a-col>
      </a-row>

    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

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
    return {
      num:1,
      data:[],
      goodsName:''
    }
  },
  created () {

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods:{
    addGoods(){
      if (!this.goodsName){
        this.$message.error('菜品名称不能为空！')
        return
      }
      let index = -1;
      let obj = null;
      for (let i=0 ; i<this.data.length ; i++){
        if (this.data[i].goodsName === this.goodsName){
          index = i
          obj = this.data[i]
          break
        }
      }

      if (index === -1){
        this.data.push({goodsName:this.goodsName,goodsNumber:this.num})
      }else{
        obj.goodsNumber += this.num
        this.$set(this.data,index,obj)
      }
    },
    deleteGoods(index){
      this.data.splice(index,1)
    },
    ok(){
      if (!this.data){
        this.$message.error('请添加商品后提交！')
        return;
      }

      let paramStr = ''
      for (let i = 0;i<this.data.length ;i++){
        const obj = this.data[i]
        paramStr += obj.goodsName+','+obj.goodsNumber+';'
      }
      console.log(paramStr)
    }
  }
}
</script>

<style scoped>
  /deep/ .ant-input-number{
    width: 100px!important;
  }
</style>
