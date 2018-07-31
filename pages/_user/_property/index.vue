<template lang="pug">
  .property
    el-row.property-nav(type="flex" align="center")
      el-button(type="text" size="medium") {{userName}}
      el-button(type="text" size="medium" @click="signOut") 退出登陆
    .property-option
      //- 创建属性表格
      .property-option-form
        el-row.property-option-form_title.colorFirst 创建属性
        el-form(
          ref="myForm1"
          :model="property"
          :rules="propertyRules"
          :inline="true")
          el-form-item(label="属性名" prop="name")
            el-input(
              v-model="property.name"
              placeholder="请输入属性名")
          el-form-item(label="属性类型" prop="type")
            el-select(
              v-model="property.type"
              placeholder="请选择属性类型")
              el-option(
                v-for="(item,index) in propertyTypes"
                :key="index"
                :label="item"
                :value="item")
          el-form-item
            el-button(
              @click="doAddProperty"
              type="primary") 创建
      //- 创建属性值表格
      .property-option-form
        el-row.property-option-form_title.colorFirst 输入属性值
        el-alert(
          v-show="!propertiesArr.length"
          title="暂无属性"
          type="warning"
          show-icon
          :closable="false")
        el-form(
          ref="myForm2"
          label-width="150px"
          label-position="left"
          :inline="true"
          v-show="propertiesArr.length")
          el-row.property-option-form_box
            el-col(
              :span=12
              v-for="(item,index) in propertiesArr"
              :key="index")
              el-form-item(
                :label="item.name")
                el-input(
                  v-model="item.value"
                  :placeholder="'请输入'+item.name+' 类型:'+item.type")
                el-row.property-option-form_box__delete(@click.native ="doDeleteProperty(item,index)")
                  el-row(type="flex" align="middle" justify="center") 
                    i.el-icon-circle-close-outline
        //- 按钮
        el-row.property-option-form_btn
          el-button(
            @click="doAddProperty"
            type="primary") 确认
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Property',
  async asyncData({ query, store }) {
    const { apiId } = query
    await store.dispatch('getProperties', { apiId })
    return {
      apiId: apiId
    }
  },
  meta: {
    auth: true
  },
  data() {
    return {
      apiId: '',
      property: {
        name: '',
        type: ''
      },
      propertyRules: {
        name: [
          { required: true, message: '请输入属性名', trigger: 'blur' },
          { validator: format.onlyEng.bind(this), trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择属性类型', trigger: 'blur' }]
      },
      propertyTypes: [
        'String',
        'Number',
        'Date',
        'Boolean',
        'Schmea.Types.Mixed',
        'Schema.Types.ObjectId'
      ],
      addPropertyFormArr: [
        {
          property: 'name',
          label: '名字',
          value: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      userName: 'userName',
      propertiesArr: 'propertiesArr'
    })
  },
  methods: {
    ...mapActions({
      addProperty: 'addProperty',
      deleteProperty: 'deleteProperty'
    }),
    // 添加属性
    doAddProperty() {
      this.$refs.myForm1.validate(valid => {
        if (valid) {
          this.addProperty({
            apiId: this.apiId,
            name: this.property.name,
            type: this.property.type
          })
          this.property.name = ''
          this.property.type = ''
        }
      })
    },
    // 删除属性
    doDeleteProperty(item, index) {
      this.$confirm('您确定删除这条属性吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const { propertyId } = item
          const apiId = this.apiId
          this.deleteProperty({ apiId, propertyId, index })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {})
    },
    // 退出登陆
    signOut() {
      this.$cookie.delete(['token', 'userName'])
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.property {
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
      &_box {
        max-height: 250px;
        overflow-y: auto;
        border: 1px solid #ededed;
        padding: 24px;
        border-radius: 3px;
        &:hover {
          box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
            0 2px 4px 0 rgba(232, 237, 250, 0.5);
        }
        &__delete {
          display: inline-block;
          width: 50px;
          cursor: pointer;
          &:hover {
            i {
              color: #f56c6c;
            }
          }
        }
      }
      &_btn {
        margin-top: 20px;
      }
    }
    &-table {
      margin-top: 20px;
    }
  }
}
.el-input,
.el-select {
  width: 300px;
}
</style>
