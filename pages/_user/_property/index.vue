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
                  :placeholder="'请输入'+item.name")
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
              el-button(type="text") 编辑
              el-button(
                @click="doDeleteCollections(scope.row, scope.$index)"
                type="text") 删除
        el-alert(
          v-show="!collectionsTableArr.length"
          title="暂无属性"
          type="warning"
          show-icon
          :closable="false")
    //- 修改属性名弹窗 
    el-dialog.property-option-form_box__dialog(
      :title="'修改属性名,原属性名'+currentPropertyDialog.name"
      :visible.sync="showPropertyDialog")
      el-row
        el-form(
          ref="myDialogForm1"
          :model="propertyDialog"
          :rules="propertyRules"
          :inline="true")
          el-form-item(
            label="修改后的属性名" prop="name")
            el-input(v-model="propertyDialog.name")
          el-form-item
            el-button(
              type="primary"
              @click="doPutProperty") 确认
</template>

<script>
import format from '~/assets/lib/format'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Property',
  async asyncData({ query, store }) {
    const { apiId } = query
    await store.dispatch('getProperties', { apiId })
    await store.dispatch('getCollections', { apiId })
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
        propertyId: ''
      },
      // 属性规则
      propertyRules: {
        name: [
          { required: true, message: '请输入属性名', trigger: 'blur' },
          { validator: format.onlyEng.bind(this), trigger: 'blur' }
        ]
      },
      showPropertyDialog: false
    }
  },
  computed: {
    ...mapGetters({
      userName: 'userName',
      propertiesArr: 'propertiesArr',
      collectionsArr: 'collectionsArr',
      collectionsTableArr: 'collectionsTableArr'
    })
  },
  methods: {
    ...mapActions({
      addProperty: 'addProperty',
      deleteProperty: 'deleteProperty',
      putProperty: 'putProperty',
      addCollections: 'addCollections',
      deleteCollections: 'deleteCollections'
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
        }
      })
    },
    // 添加集合
    doAddCollections() {
      const apiId = this.apiId
      const propertiesArr = this.propertiesArr
      this.addCollections({ apiId, propertiesArr })
    },
    // 删除集合
    doDeleteCollections(row, index) {
      const { collectionsId } = row
      const apiId = this.apiId

      this.deleteCollections({ apiId, collectionsId, index })
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
    }
  }
}
.el-input,
.el-select {
  width: 300px;
}
</style>
