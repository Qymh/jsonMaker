<template lang="pug">
  el-row
    el-row.loginBox
      el-form(
        :model="login"
        :rules="rules"
        labelPosition="top"
        label-width="60px"
        ref="myForm")
        el-form-item
          el-col.loginBox_title.primary 登录
        //- 帐号
        el-form-item(label="帐号" prop="account")
          el-input(v-model="login.account")
        //- 密码 
        el-form-item(label="密码" prop="password")
          el-input(v-model="login.password")
        //- 按钮
        el-form-item.loginBox_btnBox
          el-button(type="primary" @click="submit") 登录
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: {
        account: '',
        password: ''
      },
      rules: {
        // 帐号
        account: [
          { required: true, message: '请输入你的帐号', triger: 'blur' },
          { min: 5, max: 12, message: '帐号长度在5到12位', triger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入你的密码', triger: 'blur' },
          { min: 8, max: 15, message: '密码长度在8到15位', triger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          this.$message({
            message: '登陆成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginBox {
  width: 400px;
  margin: 200px auto 0 auto;
  &_title {
    text-align: center;
    font-size: 25px;
  }
  &_btnBox {
    margin-top: 30px;
  }
}
.el-button {
  width: 400px;
}
</style>
