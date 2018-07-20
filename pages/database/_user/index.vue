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
          :model="createApiForm"
          :rules="createApiFormRules")
          el-form-item(label="api名字" prop="apiName")
            el-input(
              v-model="createApiForm.apiName"
              placeholder="Api名字")
          el-form-item(label="描述" prop="description")
            el-input(
              v-model="createApiForm.description"
              placeholder="描述")
          el-form-item
            el-button(
              @click="createApi"
              type="primary") 创建
      .database-option-table
        el-table(
          border
          :data="tableData")
          el-table-column(prop="apiName" label="api名字" width="150")
          el-table-column(prop="createdTime" label="创建时间" width="250")
          el-table-column(prop="description" label="描述")
          el-table-column(fixed="right" label="删除" width="120")
            template(slot-scope="scope")
              el-button(
                type="text" size="small"
                @click.native.prevent="deleteApi(scope.$index, tableData)") 删除
        div {{test}}
</template>

<script>
import format from '~/assets/lib/format'
import api from '~/assets/actions/api'
export default {
  name: 'Database',
  asyncData() {
    return api.getApi().then(data => {
      return {
        userName: 'Qymh',
        test: data
      }
    })
  },
  data() {
    return {
      userName: '',
      test: [],
      tableData: [
        {
          apiName: 'test1',
          createdTime: '2018-07-20 13:51:20',
          description: '测试接口1'
        },
        {
          apiName: 'test2',
          createdTime: '2018-07-20 13:53:13',
          description: '测试接口2'
        }
      ],
      createApiForm: {
        apiName: '',
        description: ''
      },
      createApiFormRules: {
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
  methods: {
    createApi() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          api
            .addApi(this.createApiForm.apiName, this.createApiForm.description)
            .then(data => {
              console.log(data)
            })
            .catch(() => {})
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
