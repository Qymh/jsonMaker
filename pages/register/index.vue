<template lang="pug">
  el-row
    //- 导航
    el-menu(default-active="1" mode="horizontal" @select="handleSelect")
      el-menu-item(index="1") 注册
      el-menu-item(index="2") 登录
    //- 注册盒子
    el-row.registerBox
      el-form(
        :model="login"
        :rules="rules"
        labelPosition="top"
        label-width="60px"
        ref="myForm")
        el-form-item
          el-col.registerBox_title.primary 注册
        //- 帐号
        el-form-item(label="帐号" prop="account")
          el-input(v-model="login.account" placeholder="帐号长度在5到12位")
        //- 密码 
        el-form-item(label="密码" prop="password")
          el-input(v-model="login.password" placeholder="密码长度在8到15位")
        //- 确认密码
        el-form-item(label="确认密码" prop="passwordAgain")
          el-input(v-model="login.passwordAgain" placeholder="密码长度在8到15位")
        //- 按钮
        el-form-item.registerBox_btnBox
          el-button(type="primary" @click="register") 注册
</template>

<script>
import format from '~/assets/lib/format'
export default {
  name: 'Register',
  data() {
    return {
      login: {
        account: '',
        password: '',
        passwordAgain: ''
      },
      rules: {
        // 帐号
        account: [
          { required: true, message: '请输入帐号', triger: 'blur' },
          { min: 5, max: 12, message: '帐号长度在5到12位', triger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', triger: 'blur' },
          { validator: format.password, triger: 'blur' }
        ],
        // 确认密码
        passwordAgain: [
          { required: true, message: '请输入密码', triger: 'blur' },
          { validator: format.passwordAgain.bind(this), triger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 导航选择
    handleSelect(key) {
      if (key === 1) {
        return
      }
      this.$router.push('login')
    },
    // 登陆
    register() {
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
.registerBox {
  width: 400px;
  margin: 120px auto 0 auto;
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
