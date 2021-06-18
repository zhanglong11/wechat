<template>
  <div class="page">
    <div class="weui-form">
      <div class="weui-form__text-area">
        <h2 class="weui-form__title">绑定手机号</h2>
      </div>
      <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
              <div class="weui-cell__bd">
                <input
                  v-model="form.mobile"
                  class="weui-input"
                  type="number"
                  pattern="[0-9]*"
                  placeholder="请输入手机号"
                />
              </div>
            </div>
            <div class="weui-cell weui-cell_active weui-cell_vcode">
              <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
              <div class="weui-cell__bd">
                <input
                  id="js_input"
                  v-model="form.verifyCode"
                  autofocus
                  class="weui-input"
                  type="text"
                  pattern="[0-9]*"
                  placeholder="输入验证码"
                  maxlength="6"
                />
              </div>
              <div class="weui-cell__ft">
                <button
                  class="weui-btn weui-btn_default weui-vcode-btn"
                  :disabled="!(isMobileValid && _.isNull(expireSeconds))"
                  @click="handleGetMsgCode"
                >
                  {{ _.isNull(expireSeconds) ? '获取验证码' : expireSeconds }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-form__opr-area">
        <a
          id="showTooltips"
          class="weui-btn weui-btn_primary"
          :class="{ 'weui-btn_disabled': !(form.mobile && form.verifyCode) }"
          :disabled="!(form.mobile && form.verifyCode)"
          @click="login"
          >确定</a
        >
      </div>
    </div>
    <div id="js_toast" style="display: none">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-success-no-circle weui-icon_toast"></i>
        <p class="weui-toast__content">已完成</p>
      </div>
    </div>
    <div id="dialogs">
      <!--BEGIN dialog1-->
      <div id="iosDialog1" class="js_dialog" style="display: none">
        <div class="weui-mask"></div>
        <div id="js_half_screen_dialog" class="weui-half-screen-dialog">
          <div class="weui-half-screen-dialog__hd">
            <div class="weui-half-screen-dialog__hd__side">
              <button id="dialogClose" class="weui-icon-btn">关闭<i class="weui-icon-close-thin"></i></button>
            </div>
            <div class="weui-half-screen-dialog__hd__main">
              <strong class="weui-half-screen-dialog__title">标题</strong>
            </div>
          </div>
          <div class="weui-half-screen-dialog__bd">
            <br />
            <br />
            可放自定义内容
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <!--END dialog1-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        mobile: '',
        verifyCode: ''
      },
      code: null,
      expireSeconds: null
    }
  },
  computed: {
    isMobileValid() {
      return /[0-9]{11}/.test(this.form.mobile)
    }
  },
  onLoad() {
    if (!this.$store.state.bindKey) {
      alert('非法操作，002')
    }
  },
  methods: {
    async login() {
      await this.axios.wx
        .get(`/noToken/wx/oauth2/bindUser/` + this.$store.state.appId, {
          mobile: this.form.mobile,
          uuid: this.$store.state.bindKey,
          verifyCode: this.form.verifyCode
        })
        .then(res => {
          this.$store.commit('user/setToken', res.data)
          location.href = '/bindSuccess.html'
        })
    },
    async handleGetMsgCode() {
      if (!_.isNull(this.expireSeconds)) return false
      const { data: expireSeconds } = await this.axios.system.get(
        '/noToken/cim6d/verify/code/wxBind/' + this.$store.state.bindKey + '/' + this.form.mobile
      )
      this.$utils.showToast('验证码已发送')
      this.expireSeconds = +expireSeconds
      this.clock = setInterval(() => {
        if (this.expireSeconds === 0) {
          this.expireSeconds = null
          clearInterval(this.clock)
          return false
        } else {
          this.expireSeconds -= 1
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped></style>
