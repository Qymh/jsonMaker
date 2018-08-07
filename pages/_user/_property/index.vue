<template lang="pug">
  .property
    el-row.property-nav(type="flex" align="center")
      el-button(type="text" size="medium" @click="toHome") {{userName}}
      el-button(type="text" size="medium" @click="signOut") 退出登陆
    .property-option
      //- 创建属性表格
      .property-option-form
        el-row.property-option-form_title.colorFirst 创建属性
        el-form(
          ref="myForm1"
          :model="property"
          :rules="propertyRules"
          :inline="true"
          @submit.native.prevent)
          el-form-item(label="属性名" prop="name")
            el-input(
              v-model="property.name"
              placeholder="请输入属性名"
              @keyup.enter.native="doAddProperty")
          el-form-item
            el-button(
              @click.enter="doAddProperty"
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
          v-show="propertiesArr.length"
          @submit.native.prevent)
          el-row.property-option-form_box
            el-col(
              :span=12
              v-for="(item,index) in propertiesArr"
              :key="index")
              el-form-item(
                :label="item.name")
                el-input(
                  v-model="item.value"
                  :placeholder="'请输入'+item.name"
                  @keyup.enter.native="doAddCollections")
                el-row.property-option-form_box__edit(@click.native="doShowPropertyDialog(item)")
                  el-row(type="flex" align="middle" justify="center") 
                    i.el-icon-edit-outline
                el-row.property-option-form_box__delete(@click.native="doDeleteProperty(item,index)")
                  el-row(type="flex" align="middle" justify="center") 
                    i.el-icon-circle-close-outline
        //- 按钮
        el-row.property-option-form_btn
          el-button(
            @click="doAddCollections"
            type="primary") 添加
      //- 集合
      .property-option-collections
        el-row.colorFirst.property-option-collections_title 属性值Table
        el-table.property-option-collections_table(
          :data="collectionsArr"
          style="width:100%;"
          max-height="550"
          border
          v-if="collectionsTableArr.length")
          el-table-column(
            v-for="(item,index) in collectionsTableArr"
            :fixed="item==='collectionsId'?'left':false"
            :minWidth="item==='collectionsId'||item==='createdAt'?'250px':'150px'"
            :key="index"
            :prop="item"
            :label="item")
          el-table-column(
            width="100"
            fixed="right"
            label="操作")
            template(slot-scope="scope")
              el-button(
                @click="doShowCollectionsDialog(scope.row, scope.$index)"
                type="text") 编辑
              el-button(
                @click="doDeleteCollections(scope.row, scope.$index)"
                type="text") 删除
        el-alert(
          v-show="!collectionsTableArr.length"
          title="暂无属性"
          type="warning"
          show-icon
          :closable="false")
        el-row.property-option-collections_btn
          el-button(
            type="primary"
            @click="generateJSON") 生成JSON
    //- 修改属性名弹窗 
    el-dialog.property-property-dialog(
      :title="'原属性名'+currentPropertyDialog.name+',注意:修改属性名会重新刷新当前页面'"
      :visible.sync="showPropertyDialog")
      el-row
        el-form(
          ref="myDialogForm1"
          :model="propertyDialog"
          :rules="propertyRules"
          :inline="true"
          @submit.native.prevent)
          el-form-item(
            label="修改后的属性名" prop="name")
            el-input(
              v-model="propertyDialog.name"
              @keyup.enter.native="doPutProperty")
          el-form-item
            el-button(
              type="primary"
              @click="doPutProperty") 确认
    //- 修改属性值弹窗
    el-dialog.property-collections-dialog(
      title="属性值修改"
      :visible.sync="showCollectionsDialog")
      el-row
        el-form(
          ref="myDialogForm2"
          label-width="200px"
          label-position="left"
          @submit.native.prevent)
          el-form-item(
            v-for="(item,index) in collectionsDialogArr"
            :key="index"
            :label="item")
            el-input(
              :disabled="item==='collectionsId'||item==='createdAt'?true:false"
              v-model="collectionsDialog[item]"
              @keyup.enter.native="doPutCollections")
          el-form-item
            el-button(
              type="primary"
              @click="doPutCollections") 确认修改
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
import { SERVERCONFIG } from '~/assets/lib/appconfig'
export default {
  name: 'Property',
  async asyncData({ query, store, redirect }) {
    const { apiId } = query
    await store.dispatch('property/getProperties', { apiId, redirect })
    await store.dispatch('collections/getCollections', { apiId })
    return {
      apiId: apiId
    }
  },
  meta: {
    auth: true
  },
  data() {
    return {
      // apiId
      apiId: '',
      // 属性model
      property: {
        name: ''
      },
      // 修改属性model
      propertyDialog: {
        name: ''
      },
      // 当前选择的属性
      currentPropertyDialog: {
        name: '',
        propertyId: '',
        index: ''
      },
      // 修改集合model
      collectionsDialog: {},
      // 不是克隆的model
      collectionsDialogNoClone: {},
      // 当前选择的集合属性
      currentCollectionsDialogIndex: '',
      // 属性规则
      propertyRules: {
        name: [
          { required: true, message: '请输入属性名', trigger: 'blur' },
          { validator: format.onlyEng.bind(this), trigger: 'blur' }
        ]
      },
      showPropertyDialog: false,
      showCollectionsDialog: false
    }
  },
  computed: {
    ...mapGetters({
      userName: 'system/userName',
      propertiesArr: 'property/propertiesArr',
      collectionsArr: 'collections/collectionsArr',
      collectionsTableArr: 'collections/collectionsTableArr'
    }),
    collectionsDialogArr() {
      return Object.keys(this.collectionsDialog)
    }
  },
  methods: {
    ...mapActions({
      addProperty: 'property/addProperty',
      deleteProperty: 'property/deleteProperty',
      putProperty: 'property/putProperty',
      addCollections: 'collections/addCollections',
      deleteCollections: 'collections/deleteCollections',
      putCollections: 'collections/putCollections'
    }),
    // 添加属性
    doAddProperty() {
      this.$refs.myForm1.validate(valid => {
        if (valid) {
          this.addProperty({
            apiId: this.apiId,
            name: this.property.name
          })
          this.property.name = ''
        }
      })
    },
    // 删除属性
    doDeleteProperty(item, index) {
      this.$confirm(
        '删除这条属性后,对应的集合将直接删除掉这条属性,请确认',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const { propertyId } = item
          const apiId = this.apiId
          this.deleteProperty({ apiId, propertyId, index })
        })
        .catch(() => {})
    },
    // 显示属性修改dialog
    doShowPropertyDialog(item) {
      this.propertyDialog.name = ''
      this.showPropertyDialog = true
      this.currentPropertyDialog.name = item.name
      this.currentPropertyDialog.propertyId = item.propertyId
    },
    // 修改属性
    doPutProperty() {
      this.$refs.myDialogForm1.validate(valid => {
        if (valid) {
          const apiId = this.apiId
          const propertyId = this.currentPropertyDialog.propertyId
          const value = this.propertyDialog.name
          this.putProperty({ apiId, propertyId, value })
          this.showPropertyDialog = false
        }
      })
    },
    // 添加集合
    doAddCollections() {
      const apiId = this.apiId
      const propertiesArr = this.propertiesArr
      this.addCollections({ apiId, propertiesArr })
    },
    // 显示集合修改dialog
    doShowCollectionsDialog(item, index) {
      this.showCollectionsDialog = true
      this.collectionsDialog = Object.assign({}, item)
      this.collectionsDialogNoClone = item
      this.currentCollectionsDialogIndex = index
    },
    // 删除集合
    doDeleteCollections(row, index) {
      const { collectionsId } = row
      const apiId = this.apiId

      this.deleteCollections({ apiId, collectionsId, index })
    },
    // 删除集合
    doPutCollections() {
      const apiId = this.apiId
      const collectionsObj = this.collectionsDialog
      const index = this.currentCollectionsDialogIndex
      this.putCollections({ apiId, collectionsObj, index })
      this.showCollectionsDialog = false
    },
    // 生成JSON
    generateJSON() {
      const domain = SERVERCONFIG.domain
      const pathName = window.location.pathname
      const jumpUrl = `${domain}/api${pathName}/value`
      window.location.assign(jumpUrl)
    },
    // 退出登陆
    signOut() {
      this.$cookie.delete(['token', 'userName'])
      window.location.reload()
    },
    // 回到首页
    toHome() {
      this.$router.push(`/${this.userName}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.property {
  &-nav {
    position: fixed;
    top: 0;
    left: 0;
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
          margin-left: 10px;
          display: inline-block;
          cursor: pointer;
          &:hover {
            i {
              color: #f56c6c;
            }
          }
        }
        &__edit {
          margin-left: 10px;
          display: inline-block;
          cursor: pointer;
          &:hover {
            i {
              color: #409eff;
            }
          }
        }
        &__dialog {
          &__name {
            font-size: 20px;
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
    &-collections {
      margin-bottom: 200px;
      &_title {
        height: 100px;
        line-height: 100px;
        font-size: 25px;
      }
      &_btn {
        margin-top: 20px;
      }
    }
  }
}
.el-input,
.el-select {
  width: 300px;
}
</style>
