<template>
  <a-modal
    title="套餐管理"
    :width="1024"
    :visible="visible"
    :confirmLoading="loading"
    @ok="ok"
    @cancel="() => { $emit('cancel') }"
    okText="保存"
  >
    <a-spin :spinning="loading||loadingReturnGoods">
      <a-row :gutter="48">
        <a-col :md="12" :sm="24">
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

<!--          <a-row :gutter="48" style="padding-bottom: 20px;padding-top: 20px">
            <a-col :md="8" :sm="24">
              <a-input v-model="goodsName" placeholder="请输入菜品名称" @keyup.enter="addGoods"/>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-input-number :min="1" :step="1" v-model="num"  @keyup.enter="addGoods"/>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-icon type="plus"  style="cursor: pointer;font-size: 24px;color: mediumspringgreen"  @click="addGoods"/>
            </a-col>
          </a-row>-->

          <a-row :gutter="48" v-for="(item,index) of data" v-bind:key="item.returnGoodsID">
            <a-col :md="8" :sm="24">
              {{item.goodsName}}
            </a-col>
            <a-col :md="8" :sm="24">
              {{item.goodsNumber}}{{item.goodsUnit}}
            </a-col>
            <a-col :md="8" :sm="24">
              <a-icon type="delete"  style="cursor: pointer;font-size: 24px;color: red"  @click="deleteGoods(index)"/>
            </a-col>
          </a-row>
        </a-col>
        <a-col :md="12" :sm="24">
          <h2 style="text-align: center;">选择商品</h2>
          <div>
            <a-collapse v-model="activeKey">
              <a-collapse-panel v-for="(item1,index1) of categoryGoodsList" v-bind:key="item1.name" :key="item1.title" :header="item1.title">
                <a-row v-for="(item2,index2) of item1.goodsList" v-bind:key="item2.goodsID">
                  <a-col :md="6" :sm="24">{{item2.goodsName}}</a-col>
                  <a-col :md="6" :sm="24">{{item2.goodsPrice}}元/{{item2.goodsUnit}}</a-col>
                  <a-col :md="12" :sm="24">
                    <a-input-number :id="item2.goodsID" :defaultValue="1" :min="1" style="width:70px;height:100%" />
                    <a-icon type="plus"  style="cursor: pointer;font-size: 24px;color: mediumspringgreen"  @click="addGoods(item2)"/>
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
import {
  returnGoodsInsert,
  returnGoodsList
} from '@/api/goods'
import {
  categoryGoodsList
} from '@/api/category'
import {Collapse} from "ant-design-vue";
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
    return {
      num:1,
      data:[],
      goodsName:'',
      goodsID:'',
      loadingReturnGoods:false,
      categoryGoodsList:[],
      activeKey: ['0'],
    }
  },
  created () {
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      if (this.model){
        this.loadCategoryList()
        this.goodsID = this.model.goodsID
        this.loadReturnGoodsList(this.model.goodsID)
      }
    })
  },
  methods:{
    addGoods(item){
      let index = -1;
      let obj = null;
      for (let i=0 ; i<this.data.length ; i++){
        if (this.data[i].goodsName === item.goodsName){
          index = i
          obj = this.data[i]
          break
        }
      }

      if (index === -1){
        this.data.push({goodsName:item.goodsName,goodsNumber:document.getElementById(item.goodsID).value,
          goodsUnit:item.goodsUnit})
      }else{
        obj.goodsNumber = Number(obj.goodsNumber) + Number(document.getElementById(item.goodsID).value)
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
        paramStr += obj.goodsName+','+obj.goodsNumber+','+obj.goodsUnit+';'
      }
      returnGoodsInsert({goodsID:this.goodsID,value:paramStr})
        .then((res) => {
            if (res.state === 'success') {
              this.$message.info(`保存成功`)
            } else {
              this.$message.error(`保存失败`)
            }
          }
        )
        .catch(err => {
          this.$message.error(err)
        })
    },
    loadCategoryList(){
      categoryGoodsList({type:'returnGoods'})
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
    },
    loadReturnGoodsList(goodsID){
      this.loadingReturnGoods = true
      returnGoodsList({goodsID:goodsID})
        .then((res) => {
            if (res.state === 'success') {
              this.data = res.data
            } else {
              this.$message.error(`查询套餐失败`)
            }
            this.loadingReturnGoods = false
          }
        )
        .catch(err => {
          this.$message.error(err)
          this.loadingReturnGoods = false
        })
    },
  }
}
</script>

<style scoped>
  /deep/ .ant-input-number{
    width: 100px!important;
  }
</style>
