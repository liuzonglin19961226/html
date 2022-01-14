/* eslint-disable */
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
      rowKey="memberCardNo"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
    >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>

      <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">查看明细</a>
            <a-divider type="vertical"/>
            <a @click="handleEdit(record)">修改信息</a>
            <a-divider type="vertical"/>
            <a @click="handleEditRecharge(record)">充值</a>
            <a-divider type="vertical"/>
            <a @click="handleEditPay(record)">支付</a>
            <a-divider type="vertical"/>
            <a @click="sendRechargeSms(record)">发送短信</a>
          </template>
        </span>

    </s-table>

    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />

    <pay-form
      ref="payModal"
      :visible="visiblePay"
      :loading="confirmLoadingPay"
      :model="mdlPay"
      @cancel="handleCancelPay"
      @ok="handleOkPay"
    />

    <recharge-form
      ref="rechargeModal"
      :visible="visibleRecharge"
      :loading="confirmLoadingRecharge"
      :model="mdlRecharge"
      @cancel="handleCancelRecharge"
      @ok="handleOkRecharge"
    />

    <detail-form
      ref="detailModal"
      :visible="visibleDetail"
      :model="mdlDetail"
      @cancel="handleCancelDetail"
    />
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
  import moment from 'moment'
  import {STable, Ellipsis} from '@/components'
  import {
    memberCardList,
    memberCardInsert,
    memberCardPay,
    memberCardRecharge,
    memberCardUpdate,
    memberCardSms
  } from '@/api/memberCard'

  import StepByStepModal from '@/views/list/modules/StepByStepModal'
  import CreateForm from './components/CreateForm'
  import PayForm from './components/PayForm'
  import RechargeForm from './components/RechargeForm'
  import DetailForm from './components/DetailForm'
  import {initPassword} from "@/api/user";

  const columns = [
    {
      title: '序号',
      scopedSlots: {customRender: 'serial'}
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
      title: '会员卡密码',
      dataIndex: 'payPassword'
    },
    {
      title: '余额',
      dataIndex: 'totalAmount'
    },
    {
      title: '支付金额',
      dataIndex: 'payAmount'
    },
    {
      title: '充值金额',
      dataIndex: 'rechargeAmount'
    },
    {
      title: '创建时间',
      dataIndex: 'createdDateStr',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '300px',
      scopedSlots: {customRender: 'action'}
    }
  ]

  export default {
    name: 'MemberCardList',
    components: {
      DetailForm,
      PayForm,
      RechargeForm,
      STable,
      Ellipsis,
      CreateForm,
      StepByStepModal
    },
    data() {
      this.columns = columns
      return {
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        // recharge model
        visibleRecharge: false,
        confirmLoadingRecharge: false,
        mdlRecharge: null,
        // pay model
        visiblePay: false,
        confirmLoadingPay: false,
        mdlPay: null,
        // detail model
        visibleDetail: false,
        mdlDetail: null,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return memberCardList(requestParameters)
            .then(res => {
              return res.data
            })
        },
        selectedRowKeys: [],
        selectedRows: []
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
        this.mdlDetail = record
        this.visibleDetail = true
        this.$refs.detailModal.refreshData(record.memberCardNo)
      },
      handleEdit(record) {
        this.visible = true
        this.mdl = {...record}
        this.mdl.id = '111'
      },
      handleEditPay(record) {
        this.visiblePay = true
        this.mdlPay = {...record}
      },
      handleEditRecharge(record) {
        this.visibleRecharge = true
        this.mdlRecharge = {...record}
      },
      sendRechargeSms(record) {
        const _this = this
        _this.$confirm({
          // content: `是否要重置用户"${record.userName}"密码？`,
          content: h => this.redContent(`是否要发送会员卡创建短信`),
          onOk() {
            memberCardSms({'memberCardNo': record.memberCardNo})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$message.info('短信发送成功')
                  } else {
                    _this.$message.error(res.message)
                  }
                }
              )
          }
        })
      },
      handleOk() {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields((errors, values) => {
          if (!errors) {
            if (values.id) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                memberCardUpdate(values)
                  .then((res) => {
                      if (res.state === 'success') {
                        this.$message.info(`修改成功`)
                      } else {
                        this.$message.error(`修改失败`)
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
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()
              })
            } else {
              // 新增
              new Promise((resolve, reject) => {
                memberCardInsert(values)
                  .then((res) => {
                      if (res.state === 'success') {
                        this.$message.info(`新增成功`)
                      } else {
                        this.$message.error(`新增失败`)
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
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()
              })
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleOkPay() {
        const form = this.$refs.payModal.form
        this.confirmLoadingPay = true
        form.validateFields((errors, values) => {
          if (!errors) {
            if (values.memberCardNo) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                memberCardPay(values)
                  .then((res) => {
                      if (res.state === 'success') {
                        this.$message.info(`付款成功`)
                      } else {
                        this.$message.error(res.message)
                      }
                      resolve(res.message)
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
            }
          } else {
            this.confirmLoadingPay = false
          }
        })
      },
      handleOkRecharge() {
        const form = this.$refs.rechargeModal.form
        this.confirmLoadingRecharge = true
        form.validateFields((errors, values) => {
          if (!errors) {
            if (values.memberCardNo) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                memberCardRecharge(values)
                  .then((res) => {
                      if (res.state === 'success') {
                        this.$message.info(`充值成功`)
                      } else {
                        this.$message.error(`充值失败`)
                      }
                      resolve(res.message)
                    }
                  )
                  .catch(err => {
                      this.$message.error(err)
                      reject(err)
                      resolve()
                    }
                  )
              }).then(res => {
                this.visibleRecharge = false
                this.confirmLoadingRecharge = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()
              })
            } else {
            }
          } else {
            this.confirmLoadingRecharge = false
          }
        })
      },
      handleCancel() {
        this.visible = false
        this.mdl = null
        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },

      handleCancelPay() {
        this.visiblePay = false

        const form = this.$refs.payModal.form
        form.resetFields() // 清理表单数据（可不做）
      },

      handleCancelRecharge() {
        this.visibleRecharge = false

        const form = this.$refs.rechargeModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleCancelDetail() {
        this.visibleDetail = false
        if (this.$refs.detailModal){
          this.$refs.detailModal.startValue = null
          this.$refs.detailModal.endValue = null
          this.$refs.detailModal.open = null
          this.$refs.detailModal.endOpen = null
          this.$refs.detailModal.selectedItems = []
          this.$refs.detailModal.queryParam.search = null
        }
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
