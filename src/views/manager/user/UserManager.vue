/* eslint-disable */
<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
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
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item @click="deletes" key="1">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item @click="locks" key="2">
            <a-icon type="lock"/>
            锁定
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="true"
      :rowSelection="rowSelection"
      showPagination="auto"
    >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      <span slot="lock" slot-scope="text, record">
        <a-tag
          :color="record.isLocked === 1 ? 'volcano' : 'green'"
        >
          {{ record.isLocked === 1?'已锁定':'未锁定' }}
        </a-tag>
      </span>

      <span slot="password" slot-scope="text, record">
        <a-input-password
          :value="record.loginPassword"
          readonly
        />
      </span>

      <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handledeleteUser(record)">删除</a>
            <a-divider type="vertical"/>
            <a @click="record.isLocked ===1 ?unLockUser(record):handlelockUser(record)">{{ record.isLocked === 1?'解锁':'锁定' }}</a>
            <a-divider type="vertical"/>
            <a @click="handleInitPassword(record)">重置密码</a>
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
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
  import moment from 'moment'
  import {STable, Ellipsis} from '@/components'
  import {
    userList,
    initPassword,
    deleteUser,
    lockUser,
    insertUser,
    deleteUsers,
    lockUsers,
    unLockUser
  } from '@/api/user'

  import StepByStepModal from '@/views/list/modules/StepByStepModal'
  import CreateForm from './components/CreateForm'

  const columns = [
    {
      title: '序号',
      scopedSlots: {customRender: 'serial'}
    },
    {
      title: '用户名',
      dataIndex: 'userName'
    },
    {
      title: '登录账号',
      dataIndex: 'loginName'
    },
    {
      title: '登录密码',
      dataIndex: 'loginPassword',
      width: '200px',
      scopedSlots: {customRender: 'password'}
    },
    {
      title: '登录次数',
      dataIndex: 'loginTimes'
    },
    {
      title: '是否锁定',
      dataIndex: 'isLocked',
      scopedSlots: {customRender: 'lock'}
    },
    {
      title: '上次登录时间',
      dataIndex: 'lastLoginDateStr',
      sorter: true
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
    name: 'UserManager',
    components: {
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
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('loadData request parameters:', requestParameters)
          return userList(requestParameters)
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
      // getRoleList({ t: new Date() })
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
      handleEdit(record) {
        this.visible = true
        this.mdl = {...record}
      },
      handleOk() {
        const form = this.$refs.createModal.form
        this.confirmLoading = true
        form.validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values)
            if (values.id) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false
                this.confirmLoading = false
                // 重置表单数据
                form.resetFields()
                // 刷新表格
                this.$refs.table.refresh()

                this.$message.info('修改成功')
              })
            } else {
              // 新增
              new Promise((resolve, reject) => {
                insertUser(values)
                  .then((res) => {
                      if (res.state === 'success') {
                        this.$message.info(`新增成功`)
                      } else {
                        this.$message.error(`新增失败`)
                      }
                      resolve(res.message)
                    }
                  )
                  .catch(err => {
                      this.$message.error(err)
                      reject(err)
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
      handleCancel() {
        this.visible = false

        const form = this.$refs.createModal.form
        form.resetFields() // 清理表单数据（可不做）
      },
      handleInitPassword(record) {
        const _this = this
        _this.$confirm({
          title: '重置密码',
          // content: `是否要重置用户"${record.userName}"密码？`,
          content: h => this.redContent(`是否要重置用户"${record.userName}"密码？`),
        onOk()
        {
          initPassword({'id': record.id})
            .then((res) => {
                if (res.state === 'success') {
                  _this.$refs.table.refresh(true)
                  _this.$message.info(`用户"${record.userName}"重置密码成功`)
                } else {
                  _this.$message.error(`用户"${record.userName}"重置密码失败`)
                }
              }
            )
            .catch(err => _this.$message.error(err))
        }
      ,
        onCancel()
        {
        }
      })
      },
      handledeleteUser(record) {
        const _this = this
        _this.$confirm({
          title: '删除用户',
          content: this.redContent(`是否要删除用户"${record.userName}"？`),
          onOk() {
            deleteUser({'id': record.id})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$refs.table.refresh(true)
                    _this.$message.info(`用户"${record.userName}"删除成功"`)
                  } else {
                    _this.$message.error(`用户"${record.userName}"删除失败"`)
                  }
                }
              )
              .catch(err => _this.$message.error(err))
          },
          onCancel() {
          }
        })
      },
      deletes() {
        const _this = this
        let ids = ''
        for (var i = 0; i < _this.selectedRowKeys.length; i++) {
          ids += _this.selectedRowKeys[i] + ','
        }
        _this.$confirm({
          title: '删除用户',
          content: this.redContent(`是否要删除批量用户？`),
          onOk() {
            deleteUsers({'id': ids})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$refs.table.refresh(true)
                    _this.$message.info(`用户批量删除成功`)
                  } else {
                    _this.$message.error(`用户批量删除失败`)
                  }
                }
              )
              .catch(err => _this.$message.error(err))
          },
          onCancel() {
          }
        })
      },
      locks() {
        const _this = this
        let ids = ''
        for (var i = 0; i < _this.selectedRowKeys.length; i++) {
          ids += _this.selectedRowKeys[i] + ','
        }
        _this.$confirm({
          title: '锁定批量用户',
          content: this.redContent(`是否要锁定批量用户？`),
          onOk() {
            lockUsers({'id': ids})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$refs.table.refresh(true)
                    _this.$message.info(`用户批量锁定成功`)
                  } else {
                    _this.$message.error(`用户批量锁定失败`)
                  }
                }
              )
              .catch(err => _this.$message.error(err))
          },
          onCancel() {
          }
        })
      },
      handlelockUser(record) {
        const _this = this
        _this.$confirm({
          title: '锁定用户',
          content:this.redContent(`是否要锁定用户"${record.userName}"？`),
          onOk() {
            lockUser({'id': record.id})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$refs.table.refresh(true)
                    _this.$message.info(`用户"${record.userName}"锁定成功`)
                  } else {
                    _this.$message.error(`用户"${record.userName}"锁定失败`)
                  }
                }
              )
              .catch(err => _this.$message.error(err))
          },
          onCancel() {
          }
        })
      },
      unLockUser(record) {
        const _this = this
        _this.$confirm({
          title: '解锁用户',
          content: this.redContent(`是否要锁定用户"${record.userName}"？`),
          onOk() {
            unLockUser({'id': record.id})
              .then((res) => {
                  if (res.state === 'success') {
                    _this.$refs.table.refresh(true)
                    _this.$message.info(`用户"${record.userName}"解锁成功`)
                  } else {
                    _this.$message.error(`用户"${record.userName}"解锁失败`)
                  }
                }
              )
              .catch(err => _this.$message.error(err))
          },
          onCancel() {
          }
        })
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
