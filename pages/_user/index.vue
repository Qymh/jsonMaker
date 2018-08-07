<template lang="pug">
  .database
    el-row.database-nav(type="flex" align="center")
      el-button(type="text" size="medium") {{userName}}
      el-button(type="text" size="medium" @click="signOut") 退出登陆
    .database-option
      .database-option-form
        el-row.database-option-form_title.colorFirst 创建你的api
        el-form(
          ref="myForm"
          :inline="true"
          :model="addApiForm"
          :rules="addApiFormRules"
          @submit.native.prevent)
          el-form-item(label="api名字" prop="apiName")
            el-input(
              v-model="addApiForm.apiName"
              placeholder="Api名字"
              @keyup.enter.native="doAddApi")
          el-form-item(label="描述" prop="description")
            el-input(
              v-model="addApiForm.description"
              placeholder="描述"
              @keyup.enter.native="doAddApi")
          el-form-item
            el-button(
              @click="doAddApi"
              type="primary") 创建
      .database-option-table
        el-table(
          border
          :data="api"
          @row-click="toProperty")
          el-table-column(prop="apiName" label="api名字" width="150")
          //- el-table-column(prop="createdAt" label="创建时间" width="250")
          el-table-column(prop="description" label="描述")
          el-table-column(fixed="right" label="操作" width="120")
            template(slot-scope="scope")
              el-button(
                type="text"
                @click.stop="doShowPutApi(scope.row,scope.$index)") 编辑
              el-button(
                type="text"
                @click.stop="doDeleteApi(scope.$index,api[scope.$index].apiId)") 删除
    el-dialog.database-dialog(
      title="修改Api"
      :visible.sync="showApiDialog")
      el-row
        el-form(
          ref="myDialogForm1"
          :model="currentApiDialog"
          :rules="addApiFormRules"
          :inline="true"
          @submit.native.prevent)
          el-form-item(
            label="修改Api名字" prop="apiName")
            el-input(
              v-model="currentApiDialog.apiName"
              @keyup.enter.native="doPutApi")
          el-form-item(
            label="修改Api描述" prop="description")
            el-input(
              v-model="currentApiDialog.description"
              @keyup.enter.native="doPutApi")
          el-form-item
            el-button(
              type="primary"
              @click="doPutApi") 确认修改
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Database',
  async asyncData({ store, route, redirect }) {
    const userName = route.path.slice(1)
    // 获取api
    await store.dispatch('api/getApi', { userName, redirect })
  },
  meta: {
    auth: true
  },
  data() {
    return {
      // 添加api的绑定数据
      addApiForm: {
        apiName: '',
        description: ''
      },
      // 添加api的规则
      addApiFormRules: {
        apiName: [
          { required: true, message: '请输入Api的名字', trigger: 'blur' },
          { validator: format.onlyEng.bind(this), trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      // 当前选择的api
      currentApiDialog: {},
      // 是否展示api修改弹窗
      showApiDialog: false
    }
  },
  computed: {
    ...mapGetters({
      api: 'api/api',
      userName: 'system/userName'
    })
  },
  methods: {
    ...mapActions({
      addApi: 'api/addApi',
      deleteApi: 'api/deleteApi',
      putApi: 'api/putApi'
    }),
    // 添加api
    doAddApi() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          const { apiName, description } = this.addApiForm
          this.addApi({ apiName, description })
        }
      })
    },
    // 删除api
    doDeleteApi(index, apiId) {
      this.$confirm('您确定删除这个Api吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteApi({ apiId, index })
      })
    },
    // 显示修改api
    doShowPutApi(row, index) {
      this.showApiDialog = true
      this.currentApiDialog = Object.assign({}, row)
      this.currentApiDialog.index = index
    },
    // 修改api
    doPutApi() {
      const { apiName, apiId, description, index } = this.currentApiDialog
      this.putApi({ apiName, apiId, description, index })
      this.showApiDialog = false
    },
    // 前往属性
    toProperty(row) {
      const { apiName, apiId } = row
      const userName = this.userName
      this.$router.push({
        path: `/${userName}/${apiName}`,
        query: {
          apiId: apiId
        }
      })
    },
    // 注销登陆
    signOut() {
      this.$router.push({
        path: '/login',
        query: {
          signOut: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.database {
  &-nav {
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 20px;
    padding-right: 20px;
    background-color: white;
    z-index: 1;
  }
  &-option {
    width: 1200px;
    margin: 60px auto 0 auto;
    &-form {
      &_title {
        height: 100px;
        line-height: 100px;
        font-size: 25px;
      }
      & .el-input {
        width: 300px;
      }
    }
    &-table {
      margin-top: 20px;
    }
  }
}
</style>
