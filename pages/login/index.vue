<template lang="pug">
  el-row
    //- 导航
    el-menu(default-active="2" mode="horizontal" @select="handleSelect")
      el-menu-item(index="1") 注册
      el-menu-item(index="2") 登录
    //- 登录盒子 
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
          el-input(v-model="login.account" placeholder="请输入你的帐号")
        //- 密码 
        el-form-item(label="密码" prop="password")
          el-input(v-model="login.password" placeholder="请输入你的密码")
        //- 按钮
        el-form-item.loginBox_btnBox
          el-button(type="primary" @click="register") 注册
          el-button(type="primary" @click="submit") 登录
</template>

<script>
import user from '~/assets/actions/user'
import system from '~/assets/actions/system'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      login: {
        account: 'admin',
        password: '12345678'
      },
      rules: {
        // 帐号
        account: [
          { required: true, message: '请输入你的帐号', triger: 'blur' },
          { min: 5, max: 18, message: '帐号长度在5到18位', triger: 'blur' }
        ],
        // 密码
        password: [
          { required: true, message: '请输入你的密码', triger: 'blur' },
          { min: 8, max: 18, message: '密码长度在8到18位', triger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      setSystem: 'setSystem'
    }),
    // 导航选择
    handleSelect(key) {
      if (key === 2) {
        return
      }
      this.$router.push('register')
    },
    // 注册
    register() {
      this.$router.push('register')
    },
    // 登陆
    submit() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          user
            .login(this.login.account, this.login.password)
            .then(data => {
              this.$message({
                message: '登陆成功',
                type: 'success',
                duration: 2000
              })
              this.$cookie.set('token', data.token)
              this.$cookie.set('userName', data.userName)
              this.setSystem({ key: '_token', value: data.token })
              system
                .getSystem(data.token)
                .then(data => {
                  const { userName, account } = data
                  this.setSystem({ key: '_userName', value: userName })
                  this.setSystem({ key: '_account', value: account })
                  this.setSystem({ key: '_isFirstIn', value: false })
                  this.$router.push({
                    path: `/${userName}`
                  })
                })
                .catch(() => {})
            })
            .catch(err => {
              this.$message({
                message: err.error_message,
                type: 'error',
                duration: 2000
              })
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
  width: 195px;
}
</style>
