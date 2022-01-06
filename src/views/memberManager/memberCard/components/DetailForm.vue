<template>
  <a-modal
    title="会员卡明细"
    :width="1080"
    :visible="visible"
    @cancel="() => { $emit('cancel') }"
  >
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :sm="12">
              <a-form-item label="时间">
                <a-date-picker
                  v-model="startValue"
                  show-time
                  format="YYYY-MM-DD"
                  placeholder="Start"
                  :open="open"
                  @openChange="handleStartOpenChange"
                />
                <a-date-picker
                  v-model="endValue"
                  show-time
                  format="YYYY-MM-DD"
                  placeholder="End"
                  :open="endOpen"
                  @openChange="handleEndOpenChange"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-select
                  mode="multiple"
                  placeholder="请选择操作类型"
                  :value="selectedItems"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in filteredOptions" :key="item" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="memberCardDetailID"
        :columns="columns"
        :data="this.loadDetailData"
        showPagination="auto"
        :options="['5','10','20','50']"
        :pageSize="5"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

        <span slot="type" slot-scope="text, record">
          <a-tag
            :color="record.type === 'pay' ? 'volcano' : record.type === 'recharge' ? 'blue' :'green'"
          >
           {{record.type === 'recharge' ? record.channel+'充值' :record.type === 'pay'?'支付':'初始化'}}
         </a-tag>

       </span>

        <span slot="action" slot-scope="text, record">
          <template>
<!--            <a @click="handledeleteUser(record)">删除</a>-->
          </template>
        </span>
      </s-table>
    </a-card>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import moment from 'moment'
import {STable, Ellipsis} from '@/components'
import {
  memberCardDetailList
} from '@/api/memberCardDetail'
import StepByStepModal from '@/views/list/modules/StepByStepModal'
import PayForm from "./PayForm"
import RechargeForm from "./RechargeForm"
import CreateForm from "./CreateForm"

const OPTIONS = ['充值', '支付', '初始化']
const detailColumns = [
  {
    title: '序号',
    scopedSlots: {customRender: 'serial'}
  },
  {
    title: '操作类型',
    dataIndex: 'type',
    scopedSlots: {customRender: 'type'}
  },
  {
    title: '操作描述',
    dataIndex: 'message'
  },
  {
    title: '金额',
    dataIndex: 'amount'
  },
  {
    title: '操作时间',
    dataIndex: 'createdDateStr',
    sorter: true
  },
  /*{
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: {customRender: 'action'}
  }*/
]

export default {
  components: {
    STable,
    Ellipsis,
    StepByStepModal
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.columns = detailColumns
    return {
      // create model
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadDetailData: parameter => {
        this.queryParam.memberCardNo = this.memberCardNo
        if (this.startValue){
          this.queryParam.startDate = moment(this.startValue).format('YYYY-MM-DD')
        }else{
          this.queryParam.startDate = null
        }
        if (this.endValue){
          this.queryParam.endDate = moment(this.endValue).format('YYYY-MM-DD')
        }else{
          this.queryParam.endDate = null
        }

        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return memberCardDetailList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      memberCardNo:'',
      selectedRowKeys: [],
      selectedRows: [],
      startValue: null,
      endValue: null,
      endOpen: false,
      open:false,
      selectedItems: []
    }
  },
  created () {

  },
  computed: {
    filteredOptions() {
      return OPTIONS.filter(o => !this.selectedItems.includes(o));
    }
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    refreshData(memberCardNo){
      this.memberCardNo = memberCardNo
      if (this.$refs.table){
        this.$refs.table.refresh(true)
      }
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    handleStartOpenChange(open) {
      this.open = open
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    reset(){
      this.queryParam = {}
      this.startValue = null
      this.endValue = null
      this.selectedItems = []
      this.queryParam.search = null
    },
    handleChange(selectedItems) {
      this.selectedItems = selectedItems;
      let search = ''
      if (selectedItems){
        for (var i=0 ; i<selectedItems.length ; i++){
          search += (selectedItems[i] === '充值' ? 'recharge' : selectedItems[i] === '支付' ? 'pay' : 'init')+','
        }
      }
      this.queryParam.search = search;
    }
  }
}
</script>
