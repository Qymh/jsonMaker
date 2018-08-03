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
          :rules="addApiFormRules")
          el-form-item(label="api名字" prop="apiName")
            el-input(
              v-model="addApiForm.apiName"
              placeholder="Api名字")
          el-form-item(label="描述" prop="description")
            el-input(
              v-model="addApiForm.description"
              placeholder="描述")
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
          el-table-column(fixed="right" label="删除" width="120")
            template(slot-scope="scope")
              el-button(
                type="text" size="small"
                @click.stop="doDeleteApi(scope.$index,api[scope.$index].apiId)") 删除
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Database',
  async fetch({ store }) {
    // 获取api
    await store.dispatch('getApi')
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
      }
    }
  },
  computed: {
    ...mapGetters({
      api: 'api',
      userName: 'userName'
    })
  },
  methods: {
    ...mapActions({
      addApi: 'addApi',
      deleteApi: 'deleteApi'
    }),
    doAddApi() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          const { apiName, description } = this.addApiForm
          this.addApi({ apiName, description })
        }
      })
    },
    doDeleteApi(index, apiId) {
      this.$confirm('您确定删除这个Api吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteApi({ apiId, index })
      })
    },
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
    signOut() {
      this.$cookie.delete(['token', 'userName'])
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.database {
  &-nav {
    height: 60px;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 20px;
    padding-right: 20px;
  }
  &-option {
    width: 1200px;
    margin: 0 auto;
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
