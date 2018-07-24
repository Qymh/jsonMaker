<template lang="pug">
  .database
    el-row.database-nav(type="flex" align="center")
      el-button(type="text" size="medium") {{userName}}
      el-button(type="text" size="medium") 退出登陆
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
              @click="addApi"
              type="primary") 创建
      .database-option-table
        el-table(
          border
          :data="apiInfors")
          el-table-column(prop="apiName" label="api名字" width="150")
          el-table-column(prop="createdAt" label="创建时间" width="250")
          el-table-column(prop="description" label="描述")
          el-table-column(fixed="right" label="删除" width="120")
            template(slot-scope="scope")
              el-button(
                type="text" size="small"
                @click.native.prevent="deleteApi(scope.$index, tableData)") 删除
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Database',
  async fetch({ store }) {
    // 获取api
    await store.dispatch('getApiInfors')
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
      apiInfors: 'apiInfors',
      userName: 'userName'
    })
  },
  methods: {
    ...mapActions({
      addApiInfors: 'addApiInfors'
    }),
    addApi() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          const { apiName, description } = this.addApiForm
          this.addApiInfors({ apiName, description }).then(() => {
            this.$message({
              type: 'success',
              message: '添加成功',
              duration: 2000
            })
          })
        }
      })
    },
    deleteApi(index, database) {
      console.log(index)
      console.log(database)
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
