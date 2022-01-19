<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="12" :sm="24">
            <a-form-item label="模糊查询">
              <a-input v-model="queryParam.search" placeholder="会员卡号、会员姓名、会员联系方式"/>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <!--<a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>-->
              </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="memberOrderID"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

        <span slot="status" slot-scope="text, record">
           <a-tag
             :color="record.status === 99 ? 'volcano' : record.status === 0 ? 'geekblue' : 'green'"
           >
            {{ record.status === 99 ? '已取消' : record.status === 0 ? '未付款' : '已付款' }}
          </a-tag>
        </span>

        <span slot="payType" slot-scope="text, record">
           <a-tag>
            {{ !record.payType ? '' : record.payType === 1 ? '会员卡' : record.payType === 2 ? '微信' : record.payType === 3 ? '支付宝' : '其他' }}
          </a-tag>
        </span>

        <span slot="sale" slot-scope="text, record">
          <a-tag :color="record.changeType === '1' ? '#f50':'#2db7f5'" v-show="record.memberPriceSale">
            {{ record.changeType === '1' ? record.changeMsg : record.memberPriceSale }}
          </a-tag>
           <span>

          </span>
        </span>

      <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)" v-show="record.status === 0">修改</a>
             <a-divider type="vertical" v-show="record.status === 0"/>
            <a @click="changeAmount(record)" v-show="record.status === 0">调整金额</a>
            <a @click="openDetail(record)" v-show="record.status === 1">查看</a>
             <a-divider type="vertical"/>
            <a @click="printOrder(record)">打印小票</a>
            <a-divider type="vertical"/>
            <a @click="printOrder(record,'noMoney')">打印小票(无金额)</a>
            <a-divider type="vertical" v-show="record.status === 0"/>
            <a @click="handleEditPay(record)" v-show="record.status === 0">支付</a>
            <a-divider type="vertical" v-show="record.status === 0"/>
          </template>
        </span>

    </s-table>

    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
    />

    <pay-form
      ref="payModal"
      :visible="visiblePay"
      :loading="confirmLoadingPay"
      :model="mdlPay"
      @cancel="handleCancelPay"
      @ok="handleOkPay"
    />
    <detail-form
      ref="payModal"
      :visible="visibleDetail"
      :loading="confirmLoadingDetail"
      :model="mdlDetail"
      @cancel="handleCancelDetail"
    />

    <change-form
      ref="changeModal"
      :visible="visibleChange"
      :loading="confirmLoadingChange"
      :model="mdlChange"
      @cancel="handleCancelChange"
      @ok="handleOkChange"
    />
    <!--<step-by-step-modal ref="modal" @ok="handleOk"/>-->
  </a-card>
</template>

<script>
  import moment from 'moment'
  import {STable, Ellipsis} from '@/components'
  import {
    memberOrderList,
    memberOrderPay,
    memberOrderPrint,
    memberOrderChange
  } from '@/api/memberOrder'
  import PayForm from './components/PayForm'
  import StepByStepModal from '@/views/list/modules/StepByStepModal'
  import CreateForm from './components/CreateForm'
  import DetailForm from './components/DetailForm'
  import ChangeForm from './components/ChangeForm'

  const columns = [
    {
      title: '序号',
      scopedSlots: {customRender: 'serial'}
    },
    {
      title: '订单号',
      dataIndex: 'memberOrderID'
    },
    {
      title: '会员卡号',
      dataIndex: 'memberCardNo'
    },
    {
      title: '会员姓名',
      dataIndex: 'memberName'
    },
    {
      title: '会员电话',
      dataIndex: 'memberPhone'
    },
    {
      title: '订单金额',
      dataIndex: 'memberPrice'
    },
    {
      title: '支付金额',
      dataIndex: 'memberPriceFinal'
    },
    {
      title: '优惠金额',
      dataIndex: 'memberPriceSale',
      scopedSlots: {customRender: 'sale'}
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      scopedSlots: {customRender: 'status'}
    },
    {
      title: '付款方式',
      dataIndex: 'payType',
      scopedSlots: {customRender: 'payType'}
    },
    {
      title: '付款时间',
      dataIndex: 'payTimeStr'
    },
    {
      title: '创建时间',
      dataIndex: 'createdDateStr'
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '200px',
      scopedSlots: {customRender: 'action'}
    }
  ]

  export default {
    name: 'MemberOrderList',
    components: {
      STable,
      Ellipsis,
      CreateForm,
      StepByStepModal,
      PayForm,
      DetailForm,
      ChangeForm
    },
    data() {
      this.columns = columns
      return {
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return memberOrderList(requestParameters)
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: [],
        // pay model
        visiblePay: false,
        confirmLoadingPay: false,
        mdlPay: null,
        // detail model
        visibleDetail: false,
        confirmLoadingDetail: false,
        mdlDetail: null,
        // change model
        visibleChange: false,
        confirmLoadingChange: false,
        mdlChange: null,
      }
    },
    filters: {},
    created() {
    },
    computed: {
      rowSelection() {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    methods: {
      handleAdd() {
        this.mdl = null
        this.visible = true
      },
      handleDetail(record) {
        this.visible = true
        this.mdl = {...record}
      },
      changeAmount(record) {
        this.visibleChange = true
        this.mdlChange = {...record}
      },
      openDetail(record) {
        this.visibleDetail = true
        this.mdlDetail = {...record}
      },
      handleCancel() {
        this.visible = false
        this.$refs.goodsData = []
        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
        this.$refs.table.refresh(true)
      },
      handleCancelPay() {
        this.visiblePay = false

        const form = this.$refs.payModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleCancelChange() {
        this.visibleChange = false

        const form = this.$refs.changeModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleCancelDetail() {
        this.visibleDetail = false
      },
      handleEditPay(record) {
        this.visiblePay = true
        this.mdlPay = {...record}
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      resetSearchForm() {
        this.queryParam = {
          date: moment(new Date())
        }
      },
      printOrder(record,type){
        const _this = this
        _this.$confirm({
          content: this.redContent(`是否要打印小票？`),
          onOk() {
            memberOrderPrint({'memberOrderID': record.memberOrderID,type:type?type:''})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$message.info(res.message)
                  } else {
                    _this.$message.error(res.message)
                  }
                }
              )
              .catch(err => _this.$message.error(err))
          },
          onCancel() {
          }
        })
      },
      handleOkPay() {
        const form = this.$refs.payModal.form
        this.confirmLoadingPay = true
        form.validateFields((errors, values) => {
          console.log(values)
          if (!errors) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              memberOrderPay(values)
                .then((res) => {
                    if (res.state === 'success') {
                      this.$message.info(res.message)
                    } else {
                      this.$message.error(res.message)
                    }
                    resolve()
                  }
                )
                .catch(err => {
                    this.$message.error(err)
                    reject(err)
                    resolve()
                  }
                )
            }).then(res => {
              this.visiblePay = false
              this.confirmLoadingPay = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
            })
          } else {
            this.confirmLoadingPay = false
          }
        })
      },
      handleOkChange() {
        const form = this.$refs.changeModal.form
        this.confirmLoadingChange = true
        form.validateFields((errors, values) => {
          if (!errors) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              memberOrderChange(values)
                .then((res) => {
                    if (res.state === 'success') {
                      this.$message.info(res.message)
                    } else {
                      this.$message.error(res.message)
                    }
                    resolve()
                  }
                )
                .catch(err => {
                    this.$message.error(err)
                    reject(err)
                    resolve()
                  }
                )
            }).then(res => {
              this.visibleChange = false
              this.confirmLoadingChange = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
            })
          } else {
            this.confirmLoadingChange = false
          }
        })
      },
      redContent(content){
        return <div style = 'color:red;' >  {content} </div>
      }
    }
  }
</script>
<style scope>
  /deep/ .ant-input{

  }
</style>
