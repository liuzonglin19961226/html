<template>
  <a-card :bordered="true">
    <a-spin :spinning="loading">
      <a-row :gutter="48">
        <a-col :md="5" :sm="24">
          <a-tree-select
            v-model="value"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="treeData"
            placeholder="Please select"
            tree-default-expand-all
            @select="selectTree"
          >
            <!--<span v-if="key === '0-0-1'" slot="title" slot-scope="{ key, value }" style="color: #08c">
              Child Node1 {{ value }}
            </span>-->
          </a-tree-select>
        </a-col>

        <a-col :md="8" :sm="24">
          <span style="font-size: 20px">你当前选中的分支：</span>
          <span style="color: red;font-size: 20px;font-weight:bold">{{categoryName}}</span>
          <a-input
            style="width: 40%;margin-left: 10px"
            placeholder="请输入新名称"
            allow-clear
            v-model="updateValue"
            v-show="updateFlag"/>
          <a-input
            style="width: 40%;margin-left: 10px"
            placeholder="请输入新名称"
            allow-clear
            v-model="insertValue"
            v-show="insertFlag"/>
        </a-col>

        <a-col :md="11" :sm="24">
          <a-button v-show="categoryName" class="button" type="primary" icon="search" @click="searchGoods">
            查询商品
          </a-button>
          <a-button v-show="categoryName" v-if="!updateFlag&&!insertFlag" class="button" type="primary" icon="plus" @click="insertCategory">
            新增分类
          </a-button>
          <a-button v-show="categoryName" v-if="insertFlag" class="button" type="primary" icon="edit"  @click="cancelInsertCategory">
            取消新增
          </a-button>
          <a-button v-show="categoryName" v-if="updateFlag" class="button" type="primary" icon="edit"  @click="cancelCategory">
            取消修改
          </a-button>
          <a-button v-show="categoryName" v-if="insertFlag" class="button" type="primary" icon="edit"  @click="confirmInsertCategory">
            确认新增
          </a-button>
          <a-button v-show="categoryName" v-if="updateFlag" class="button" type="primary" icon="edit"  @click="confirmCategory">
            确认修改
          </a-button>
          <a-button v-show="categoryName" v-if="!insertFlag&&!updateFlag" class="button" type="primary" icon="edit"  @click="updateCategory">
            修改分类
          </a-button>
          <a-button v-show="categoryName" v-if="!insertFlag&&!updateFlag" class="button" type="primary" icon="delete"  @click="deleteCategory">
            删除
          </a-button>
        </a-col>

      </a-row>
    </a-spin>
    <a-spin :spinning="goodsLoading">
      <a-row :gutter="48" style="padding:40px">
        <a-list
          class="demo-loadmore-list"
          :loading="loading"
          item-layout="horizontal"
          :data-source="data"
        >
<!--          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-spin v-if="loadingMore" />
          </div>-->
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" @click="handleEdit(item.goodsID)">修改</a>
            <a slot="actions" @click="handleDelete(item.goodsID,item.goodsName)">删除</a>
            <a-list-item-meta
              :description="item.goodsDesc"
            >
              <a slot="title">{{ item.goodsName }}</a>
             <!-- <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />-->
            </a-list-item-meta>
            <span>{{item.goodsPrice}}元/{{item.goodsUnit}},</span>
            <span style="color: red">折扣：{{item.goodsSale}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>x{{item.goodsNumber}}</span>
          </a-list-item>
        </a-list>

        <div class="addBtn" v-show="isSearch">
          <a-button class="new-btn" type="dashed" @click="handleAdd">
            <a-icon type="plus"/>
            新增产品
          </a-button>
        </div>
      </a-row>
    </a-spin>
    <create-form
      ref="createModal"
      :visible="visible"
      :loading="confirmLoading"
      :model="mdl"
      @cancel="handleCancel"
      @ok="handleOk"
    />

  </a-card>


</template>

<script>
  import { TreeSelect } from 'ant-design-vue'
  import {
    categoryList,
    categoryUpdate,
    categoryInsert,
    categoryDelete
  } from '@/api/category'
  import {
    goodsList,
    goodsInsert,
    goodsUpdate,
    goodsSearch,
    goodsDelete
  } from '@/api/goods'
  import CreateForm from './components/CreateForm'
    export default {
      name: "Category",
      components: {
        [TreeSelect.name]: TreeSelect,
        ATreeSelectNode: TreeSelect.TreeNode,
        ATreeSelect: TreeSelect,
        CreateForm
      },
      data() {
        return {
          value: '',
          loading: false,
          goodsLoading: false,
          loadingMore: false,
          showLoadingMore: true,
          data: [],
          treeData : [],
          categoryName : '',
          categoryID : '',
          updateFlag:false,
          insertFlag:false,
          updateValue:'',
          insertValue:'',
          loading:false,
          isSearch:false,
          // create model
          visible: false,
          confirmLoading: false,
          mdl: null,
        };
      },
      mounted() {
        this.loadCategoryList()
        /*this.loading = false;
        this.data = res.results;*/
      },
      watch: {
      },
      methods:{
        redContent(content){
          return <div style = 'color:red;' >  {content} </div>
        },
        loadCategoryList(){
          categoryList()
            .then((res) => {
                if (res.state === 'success') {
                  this.treeData = res.data
                } else {
                  this.$message.error(`查询分类失败`)
                }
              }
            )
            .catch(err => {
              this.$message.error(err)
            })
        },
        selectTree(value,e) {
          this.categoryName = e.eventKey
          this.categoryID = value
        },
        updateCategory(){
          this.updateFlag = true
          this.cancelInsertCategory()
        },
        insertCategory(){
          this.insertFlag = true
          this.cancelCategory()
        },
        cancelCategory(){
          this.updateFlag = false
          this.updateValue = ''
        },
        cancelInsertCategory(){
          this.insertFlag = false
          this.insertValue = ''
        },
        confirmInsertCategory(){
          if (!this.insertValue){
            this.$message.error('新增分类名不能为空！')
            return
          }
          this.loading = true
          const param = {}
          param.categoryName = this.insertValue
          param.categoryID = this.categoryID
          categoryInsert(param)
            .then((res) => {
                if (res.state === 'success') {
                  this.loadCategoryList()
                  this.insertFlag = false
                  this.insertValue = ''
                  this.$message.success(`新增分类成功`)
                } else {
                  this.$message.error(`新增分类失败`)
                }
              }
            )
            .catch(err => {
              this.$message.error(err)
            }).finally(()=>this.loading=false)

        },
        confirmCategory(){
          if (!this.updateValue){
            this.$message.error('修改分类名不能为空！')
            return
          }
          this.loading = true
          const param = {}
          param.categoryName = this.updateValue
          param.categoryID = this.categoryID
          categoryUpdate(param)
            .then((res) => {
                if (res.state === 'success') {
                  this.loadCategoryList()
                  this.categoryName = this.updateValue
                  this.updateFlag = false
                  this.updateValue = ''
                  this.$message.success(`修改分类成功`)
                } else {
                  this.$message.error(`修改分类失败`)
                }
              }
            )
            .catch(err => {
              this.$message.error(err)
            }).finally(()=>this.loading=false)
        },
        deleteCategory(){
          const _this = this
          _this.$confirm({
            title: '删除分类',
            content: this.redContent(`是否要删除分类`+this.categoryName+`？`),
            onOk() {
              _this.loading = true
              const param = {}
              param.categoryID = _this.categoryID
              categoryDelete(param)
                .then((res) => {
                    if (res.state === 'success') {
                      _this.loadCategoryList()
                      _this.categoryName = null
                      _this.value = null
                      _this.categoryID = null
                      _this.$message.success(res.message)
                    } else {
                      _this.$message.error(res.message)
                    }
                  }
                )
                .catch(err => {
                  _this.$message.error(err)
                }).finally(()=>_this.loading=false)
            },
            onCancel() {
            }
          })
        },
        //商品相关start
        searchGoods(){
          this.goodsLoading = true
          const param = {}
          param.goodsCategoryID = this.categoryID
          goodsList(param)
            .then((res) => {
                if (res.state === 'success') {
                  this.data = res.data
                  this.isSearch = true
                  this.goodsLoading = false
                } else {
                  this.$message.error(`查询商品失败`)
                }
              }
            )
            .catch(err => {
              this.$message.error(err)
            })
        },
        handleCancel() {
          this.visible = false
          const form = this.$refs.createModal.form
          form.resetFields() // 清理表单数据（可不做）
        },
        handleOk() {
          const form = this.$refs.createModal.form
          this.confirmLoading = true
          form.validateFields((errors, values) => {
            if (!errors) {
              values.categoryID = this.categoryID
              if (values.goodsID){
                // 修改
                new Promise((resolve, reject) => {
                  goodsUpdate(values)
                    .then((res) => {
                        if (res.state === 'success') {
                          this.$message.info(`修改成功`)
                        } else {
                          this.$message.error(res.message)
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
                  this.searchGoods()
                })
              }else{
                // 新增
                new Promise((resolve, reject) => {
                  goodsInsert(values)
                    .then((res) => {
                        if (res.state === 'success') {
                          this.$message.info(`新增成功`)
                        } else {
                          this.$message.error(res.message)
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
                  this.searchGoods()
                })
              }
            } else {
              this.confirmLoading = false
            }
          })
        },
        handleAdd() {
          this.mdl = null
          this.visible = true
        },
        handleEdit(goodsID) {
          this.visible = true
          const param ={}
          param.goodsID = goodsID
          goodsSearch(param)
            .then((res) => {
                if (res.state === 'success') {
                  this.mdl = res.data
                }
              }
            )
            .catch(err => {
                this.$message.error(err)
              }
            )
        },
        handleDelete(goodsID,goodsName){
          const param ={}
          param.goodsID = goodsID
          const _this = this
          _this.$confirm({
            title: '删除商品',
            content: this.redContent(`是否要删除商品`+goodsName+`？`),
            onOk() {
              goodsDelete(param)
                .then((res) => {
                    if (res.state === 'success') {
                      _this.searchGoods()
                      _this.$message.success(res.message)
                    } else {
                      _this.$message.error(res.message)
                    }
                  }
                )
                .catch(err => {
                  _this.$message.error(err)
                })
            },
            onCancel() {
            }
          })
        }
        //商品相关end
      }
    }
</script>

<style scoped>
  .demo-loadmore-list {
    min-height: 200px;
  }
  .button{
    margin-right: 3px;
  }
  .addBtn{
    text-align: center;
  }
  .new-btn{
    width: 100%;
    height: 80px;
  }
</style>