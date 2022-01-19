<template>
  <a-modal
    title="订单管理"
    :width="1080"
    :visible="visible"
    :confirmLoading="loading"
    @ok="ok"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading||loadingSelf">
      <a-row :gutter="48">
        <a-col :md="10" :sm="24">
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
        <a-col :md="14" :sm="24">
          <h2 style="text-align: center;">选择商品</h2>
          <div>
            <a-collapse v-model="activeKey">
              <a-collapse-panel v-for="(item1,index1) of categoryGoodsList" v-bind:key="item1.name" :key="item1.title" :header="item1.title">
                  <a-row v-for="(item2,index2) of item1.goodsList" v-bind:key="item2.goodsID">
                    <a-col :md="4" :sm="24">{{item2.orderNumber}}.{{item2.goodsName}}</a-col>
                    <a-col :md="4" :sm="24">{{item2.goodsPrice}}元/{{item2.goodsUnit}}</a-col>
                    <a-col :md="4" :sm="24" style="color: red">折扣：{{item2.goodsSale}}</a-col>
<!--                    <a-col :md="4" :sm="24">x{{item2.goodsNumber}}</a-col>-->
                    <a-col :md="6" :sm="24">
                      当前数量：
                      <span style="color: red;font-size: 20px;font-weight: bold" v-if="item2.currentNum">{{item2.currentNum}}</span>
                      <span style="color: red" v-if="!item2.currentNum">0</span>
                    </a-col>
                    <a-col :md="6" :sm="24">
                      <a-icon style="color: dodgerblue;cursor: pointer" @click="addGoods(item2,'minus',index1,index2)" type="minus" />
                      <a-input-number :id="item2.goodsID" :defaultValue="1" :min="1" style="width:70px;height:100%" />
                      <a-icon style="color: dodgerblue;cursor: pointer" @click="addGoods(item2,'plus',index1,index2)" type="plus" />
                    </a-col>
                  </a-row>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </a-col>
      </a-row>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {Collapse} from "ant-design-vue"
import {
  categoryGoodsList
} from '@/api/category'
import {
  memberOrderInsert,
  memberOrderDetail,
} from '@/api/memberOrder'
// 表单字段
const fields = ['memberName', 'memberCardNo', 'memberPhone']

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
      categoryGoodsList:[],
      activeKey: ['0'],
      memberOrderID: null,
      loadingSelf:false
    }
  },
  created () {
    console.log('custom modal created')
    // 当 model 发生改变时，为表单设置值
    if (!this.model){
      this.loadCategoryList()
    }
    this.$watch('model', () => {
      console.log(this.model)
      if(this.model){
        this.memberOrderID = this.model.memberOrderID
        this.loadCategoryDetailList(this.model.memberOrderID)
      }else{
        this.memberOrderID = null
      }
      console.log(this.memberOrderID)
    })
  },
  methods:{
    ok(){
      let paramStr = ''
      for (let i = 0;i<this.goodsData.length ;i++){
        const obj = this.goodsData[i]
        paramStr += obj.goodsID+','+obj.goodsNumber+','+(obj.goodsNumber*obj.goodsPrice*obj.goodsSale)+','+(obj.goodsNumber*obj.goodsPrice)+';'
      }
      const param = {'value':paramStr,'memberOrderID':this.memberOrderID}

      const _this = this
      _this.$confirm({
        title: (this.memberOrderID ?'修改':'新增')+'订单',
        content: this.redContent(`是否要`+(this.memberOrderID?'修改':'新增')+`订单？`),
        onOk() {
          memberOrderInsert(param)
            .then((res) => {
                if (res.state === 'success') {
                  _this.$message.info(res.message)
                  _this.$emit('cancel')
                } else {
                  _this.$message.error(res.message)
                }
              }
            )
        },
        onCancel() {
        }
      })
    },
    loadCategoryList(){
      this.loadingSelf = true
      categoryGoodsList()
        .then((res) => {
            if (res.state === 'success') {
              this.categoryGoodsList = res.data
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
    loadCategoryDetailList(memberOrderID){
      this.loadingSelf = true
      memberOrderDetail({'memberOrderID' : (memberOrderID?memberOrderID:this.memberOrderID)})
        .then((res) => {
            if (res.state === 'success') {
              this.categoryGoodsList = res.data.categoryGoodsDtos
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
    addGoods(goodsItem,type,goodsIndex1,goodsIndex2) {
      let obj = goodsItem
      let index = -1;
      const goodsDataNew = this.goodsData

      const categoryList = this.categoryGoodsList[goodsIndex1]

      for (let i = 0 ;i<goodsDataNew.length ; i++){
        if (goodsDataNew[i].goodsID === goodsItem.goodsID){
          obj = goodsDataNew[i]
          index = i
          break;
        }
      }
      const num = document.getElementById(goodsItem.goodsID).value
      if (num<=0){
        return
      }
      if (index >= 0){
        if (type === 'minus'){
          obj.goodsNumber = Number(obj.goodsNumber )-Number(num)

        }else{
          obj.goodsNumber = Number(obj.goodsNumber )+Number(num)
        }
        categoryList.goodsList[goodsIndex2].currentNum = obj.goodsNumber
        if (obj.goodsNumber === 0){
          this.goodsData.splice(index,1)
        }else {
          this.$set(this.goodsData,index,obj)
        }
      }else{
        if (type === 'minus'){
          return
        }else{
          obj.goodsNumber = num
          categoryList.goodsList[goodsIndex2].currentNum = num
        }

        this.goodsData.push(goodsItem)
      }

      this.$set(this.categoryGoodsList,goodsIndex1,categoryList)
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
