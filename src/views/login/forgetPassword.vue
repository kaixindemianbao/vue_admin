<template>
  <div class="forgetPWD-container">
    <el-form class="forget-form" :model="forgetForm" :rules="forgetRules" ref="forgetForm" label-position="left">
      <h3 class="title">忘记密码</h3>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="forgetForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="forgetForm.code"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'forgetPassword',
  data () {
    return {
      forgetForm: {
        userName: '',
        code: ''
      },
      forgetRules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    handleSubmit () {
      //   this.$refs.forgetForm.validate(valid => {
      //     if (valid) {
      //       this.loading = true
      //       this.$store.dispatch('Login', this.loginForm).then(() => {
      //         this.loading = false
      //         this.$router.push({ path: '/' })
      //       }).catch(() => {
      //         this.loading = false
      //       })
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //   })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.forgetPWD-container {
  .forget-form {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
