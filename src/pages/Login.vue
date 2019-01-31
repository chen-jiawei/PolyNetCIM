<template>
<div>
  <div class="wrap">
    <!-- 标题 -->
    <div class="title">
      <div class="logo"></div>
      <!-- 选择语言组件 -->
      <div class="lang">English</div>
    </div>
    <div class="about">
      <div class="about-me">关于我们</div>
    </div>
    <!-- 登录 -->
    <div class="login">
      <div class="right-logo"></div>
      <div class="login-title">PolyNetCIM保險業務平台</div>
      <div class="login-form">
        <v-text-field
            color="#2196F3"
            required
            v-model="name"
            :rules="nameRules"
            :label="$t('UserName')"
            type="text"
            :error="nameError"
        ></v-text-field>
        <v-text-field
          color="#2196F3"
          required
          v-model="pwd"
          :rules="pwdRules"
          :label="$t('Pwd')"
          type="password"
          :error="pwdError"
        ></v-text-field>
        <v-btn @click="submit" block color="info" style="background:#2196F3;">login<v-icon>　send</v-icon></v-btn>
        <a href="#" class="find-pwd">忘记密码？</a>
      </div>
    </div>
    <!-- 底部 -->
    <div class="myfooter">
      <div class="copyright"><span class="left">©2018-中国太平保险（澳门）版权所有。</span><span class="right">最后更新时间：2019年1月1日12时12分</span></div>
      <div>
        <a href="#">服务协议</a> | <a href="#">隐私政策声明</a> | <a href="#">收集个人资料声明</a> | <a href="#">监管机构</a>
      </div>
    </div>

  </div>
</div>         
</template>

<script>

export default {
  data () {
    return {
      name: '',
      nameError: false,
      nameRules: [
        v => !!v || this.$t('NameEmpty')
      ],
      pwd: '',
      pwdError: false,
      pwdRules: [
        v => !!v || this.$t('PwdEmpty')
      ]
    }
  },
  methods: {
    onSuccess (data) {
      this.$store.commit('setAuth', data)
      this.$router.replace('/')
    },
    submit () {
      if (!this.name) {
        this.nameError = true
        return
      }
      if (!this.pwd) {
        this.pwdError = true
        return
      }
      this.$router.push('/')
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 1268px;
  height: 715px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -358px;
  margin-left: -634px;
  box-sizing: border-box;
  padding: 16px;
  .right-logo {
      width: 244px;
      height: 46px;
      background: url(../../static/right_logo.jpg) no-repeat;
      position: absolute;
      top: 150px;
      right: 16px;
    }
  .title {
    height: 54px;
    .logo {
      float: left;
      width: 155px;
      height: 46px;
      background: url(../../static/logo.jpg) no-repeat;
      margin-top: 9px;
    }
    .lang {
      float: right;
      line-height: 54px;
    }
  }
  .about {
    border-bottom: 7px solid #0661AA;
    margin-top: 17px;
    -moz-box-shadow: 1px 6px 9px #828282; 
    -webkit-box-shadow: 1px 6px 9px #828282; 
    box-shadow: 1px 6px 9px #828282;
    position: relative;
    .about-me {
      width: 78px;
      line-height: 38px;
      background: #0661AA;
      border-radius: 3px;
      text-align: center;
      color: #FFF;
      font-size: 14px;
      position: absolute;
      top: 0px;

      
    }
  }
  .login {
    margin-top:100px;
    height: 320px;
    background: url(../../static/login_bg.jpg) no-repeat 270px 100px;
    
    .login-title {
      font-size: 20px;
      font-weight: bold;
    }
    .login-form {
      width: 250px;
    }
  }
  .myfooter {
    border-top: 1px dashed #999999;
    font-size: 16px;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .copyright {
      line-height: 32px;
      height: 32px;
    }
  }
  
}
</style>

