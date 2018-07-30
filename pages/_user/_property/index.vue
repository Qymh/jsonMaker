<template lang="pug">
  .property
    el-row.property-nav(type="flex" align="center")
      el-button(type="text" size="medium") {{userName}}
      el-button(type="text" size="medium" @click="signOut") 退出登陆
    .property-option
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
      .property-option-form
        el-row.property-option-form_title.colorFirst 输入属性值
        el-form(
          ref="myForm2"
          :inline="true")
          el-form-item(
            v-for="(item,index) in addPropertyFormArr"
            :key="index"
            :label="item.label")
            el-input(
              v-model="item.value"
              :placeholder="'请输入'+item.label")
          el-form-item
            el-button(
              @click="doAddProperty"
              type="primary") 添加属性
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Property',
  asyncData({ query }) {
    const { apiId } = query
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
        'Array',
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
      userName: 'userName'
    })
  },
  methods: {
    ...mapActions({
      addProperty: 'addProperty'
    }),
    doAddProperty() {
      this.$refs.myForm1.validate(valid => {
        if (valid) {
          this.addProperty({
            apiId: this.apiId,
            name: this.property.name,
            type: this.property.type
          })
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
