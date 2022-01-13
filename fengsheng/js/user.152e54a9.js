(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{1037:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a-result",{attrs:{isSuccess:!0,content:!1,title:e.email,"sub-title":e.description},scopedSlots:e._u([{key:"extra",fn:function(){return[r("a-button",{attrs:{size:"large",type:"primary"}},[e._v("查看邮箱")]),r("a-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"large"},on:{click:e.goHomeHandle}},[e._v("返回首页")])]},proxy:!0}])})},a=[],i={name:"RegisterResult",data:function(){return{description:"激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。",form:{}}},computed:{email:function(){var e=this.form&&this.form.email||"xxx";return"你的账户：".concat(e," 注册成功")}},created:function(){this.form=this.$route.params},methods:{goHomeHandle:function(){this.$router.push({name:"login"})}}},o=i,n=r("2877"),l=Object(n["a"])(o,s,a,!1,null,"4a6c53ae",null);t["default"]=l.exports},1348:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main user-layout-register"},[r("h3",[r("span",[e._v(e._s(e.$t("user.register.register")))])]),r("a-form",{ref:"formRegister",attrs:{form:e.form,id:"formRegister"}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{required:!0,type:"email",message:e.$t("user.email.required")}],validateTrigger:["change","blur"]}],expression:"['email', {rules: [{ required: true, type: 'email', message: $t('user.email.required') }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.register.email.placeholder")}})],1),r("a-popover",{attrs:{placement:"rightTop",trigger:["focus"],getPopupContainer:function(e){return e.parentElement}},model:{value:e.state.passwordLevelChecked,callback:function(t){e.$set(e.state,"passwordLevelChecked",t)},expression:"state.passwordLevelChecked"}},[r("template",{slot:"content"},[r("div",{style:{width:"240px"}},[r("div",{class:["user-register",e.passwordLevelClass]},[e._v(e._s(e.$t(e.passwordLevelName)))]),r("a-progress",{attrs:{percent:e.state.percent,showInfo:!1,strokeColor:e.passwordLevelColor}}),r("div",{staticStyle:{"margin-top":"10px"}},[r("span",[e._v(e._s(e.$t("user.register.password.popover-message"))+" ")])])],1)]),r("a-form-item",[r("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:e.$t("user.password.required")},{validator:this.handlePasswordLevel}],validateTrigger:["change","blur"]}],expression:"['password', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",placeholder:e.$t("user.register.password.placeholder")},on:{click:e.handlePasswordInputClick}})],1)],2),r("a-form-item",[r("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password2",{rules:[{required:!0,message:e.$t("user.password.required")},{validator:this.handlePasswordCheck}],validateTrigger:["change","blur"]}],expression:"['password2', {rules: [{ required: true, message: $t('user.password.required') }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"}],attrs:{size:"large",placeholder:e.$t("user.register.confirm-password.placeholder")}})],1),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{required:!0,message:e.$t("user.phone-number.required"),pattern:/^1[3456789]\d{9}$/},{validator:this.handlePhoneCheck}],validateTrigger:["change","blur"]}],expression:"['mobile', {rules: [{ required: true, message: $t('user.phone-number.required'), pattern: /^1[3456789]\\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"}],attrs:{size:"large",placeholder:e.$t("user.login.mobile.placeholder")}},[r("a-select",{attrs:{slot:"addonBefore",size:"large",defaultValue:"+86"},slot:"addonBefore"},[r("a-select-option",{attrs:{value:"+86"}},[e._v("+86")]),r("a-select-option",{attrs:{value:"+87"}},[e._v("+87")])],1)],1)],1),r("a-row",{attrs:{gutter:16}},[r("a-col",{staticClass:"gutter-row",attrs:{span:16}},[r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["captcha",{rules:[{required:!0,message:"请输入验证码"}],validateTrigger:"blur"}],expression:"['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.mobile.verification-code.placeholder")}},[r("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"mail"},slot:"prefix"})],1)],1)],1),r("a-col",{staticClass:"gutter-row",attrs:{span:8}},[r("a-button",{staticClass:"getCaptcha",attrs:{size:"large",disabled:e.state.smsSendBtn},domProps:{textContent:e._s(!e.state.smsSendBtn&&e.$t("user.register.get-verification-code")||e.state.time+" s")},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCaptcha.apply(null,arguments)}}})],1)],1),r("a-form-item",[r("a-button",{staticClass:"register-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.registerBtn,disabled:e.registerBtn},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[e._v(e._s(e.$t("user.register.register"))+" ")]),r("router-link",{staticClass:"login",attrs:{to:{name:"login"}}},[e._v(e._s(e.$t("user.register.sign-in")))])],1)],1)],1)},a=[],i=r("5530"),o=(r("498a"),r("7ded")),n=r("705f");r("ac1f");function l(e){var t=0;if(!e)return t;for(var r={},s=0;s<e.length;s++)r[e[s]]=(r[e[s]]||0)+1,t+=5/r[e[s]];var a={digits:/\d/.test(e),lower:/[a-z]/.test(e),upper:/[A-Z]/.test(e),nonWords:/\W/.test(e)},i=0;for(var o in a)i+=!0===a[o]?1:0;return t+=10*(i-1),parseInt(t)}var c={0:"user.password.strength.short",1:"user.password.strength.low",2:"user.password.strength.medium",3:"user.password.strength.strong"},u={0:"error",1:"error",2:"warning",3:"success"},d={0:"#ff0000",1:"#ff0000",2:"#ff7e05",3:"#52c41a"},p={name:"Register",components:{},mixins:[n["a"]],data:function(){return{form:this.$form.createForm(this),state:{time:60,level:0,smsSendBtn:!1,passwordLevel:0,passwordLevelChecked:!1,percent:10,progressColor:"#FF0000"},registerBtn:!1}},computed:{passwordLevelClass:function(){return u[this.state.passwordLevel]},passwordLevelName:function(){return c[this.state.passwordLevel]},passwordLevelColor:function(){return d[this.state.passwordLevel]}},methods:{handlePasswordLevel:function(e,t,r){if(""===t)return r();t.length>=6?(l(t)>=30&&(this.state.level=1),l(t)>=60&&(this.state.level=2),l(t)>=80&&(this.state.level=3)):(this.state.level=0,r(new Error(this.$t("user.password.strength.msg")))),this.state.passwordLevel=this.state.level,this.state.percent=33*this.state.level,r()},handlePasswordCheck:function(e,t,r){var s=this.form.getFieldValue("password");void 0===t&&r(new Error(this.$t("user.password.required"))),t&&s&&t.trim()!==s.trim()&&r(new Error(this.$t("user.password.twice.msg"))),r()},handlePhoneCheck:function(e,t,r){r()},handlePasswordInputClick:function(){this.isMobile?this.state.passwordLevelChecked=!1:this.state.passwordLevelChecked=!0},handleSubmit:function(){var e=this.form.validateFields,t=this.state,r=this.$router;e({force:!0},(function(e,s){e||(t.passwordLevelChecked=!1,r.push({name:"registerResult",params:Object(i["a"])({},s)}))}))},getCaptcha:function(e){var t=this;e.preventDefault();var r=this.form.validateFields,s=this.state,a=this.$message,i=this.$notification;r(["mobile"],{force:!0},(function(e,r){if(!e){s.smsSendBtn=!0;var n=window.setInterval((function(){s.time--<=0&&(s.time=60,s.smsSendBtn=!1,window.clearInterval(n))}),1e3),l=a.loading("验证码发送中..",0);Object(o["b"])({mobile:r.mobile}).then((function(e){setTimeout(l,2500),i["success"]({message:"提示",description:"验证码获取成功，您的验证码为："+e.result.captcha,duration:8})})).catch((function(e){setTimeout(l,1),clearInterval(n),s.time=60,s.smsSendBtn=!1,t.requestFailed(e)}))}}))},requestFailed:function(e){this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4}),this.registerBtn=!1}},watch:{"state.passwordLevel":function(e){}}},m=p,g=(r("5d18"),r("eea9"),r("2877")),h=Object(g["a"])(m,s,a,!1,null,"3f0943cc",null);t["default"]=h.exports},"19a1":function(e,t,r){},"2aa0":function(e,t,r){},"5d18":function(e,t,r){"use strict";r("eeab")},"90b4":function(e,t,r){},ac2a:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"main"},[r("a-form",{ref:"formLogin",staticClass:"user-layout-login",attrs:{id:"formLogin",form:e.form},on:{submit:e.handleSubmit}},[r("a-tabs",{attrs:{activeKey:e.customActiveKey,tabBarStyle:{textAlign:"center",borderBottom:"unset"}},on:{change:e.handleTabClick}},[r("a-tab-pane",{key:"tab1",attrs:{tab:e.$t("user.login.tab-login-credentials")}},[e.isLoginError?r("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{type:"error",showIcon:"",message:e.errorMsg}}):e._e(),r("a-form-item",[r("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["loginName",{rules:[{required:!0,message:e.$t("user.userName.required")},{validator:e.handleUsernameOrEmail}],validateTrigger:"change"}],expression:"[\n              'loginName',\n              {rules: [{ required: true, message: $t('user.userName.required') }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}\n            ]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.username.placeholder")}},[r("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),r("a-form-item",[r("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["loginPassword",{rules:[{required:!0,message:e.$t("user.password.required")}],validateTrigger:"blur"}],expression:"[\n              'loginPassword',\n              {rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur'}\n            ]"}],attrs:{size:"large",placeholder:e.$t("user.login.password.placeholder")}},[r("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1)],1)],1),r("a-form-item",[r("a-checkbox",{directives:[{name:"decorator",rawName:"v-decorator",value:["rememberMe",{valuePropName:"checked"}],expression:"['rememberMe', { valuePropName: 'checked' }]"}]},[e._v(e._s(e.$t("user.login.remember-me")))]),r("router-link",{staticClass:"forge-password",staticStyle:{float:"right"},attrs:{to:{name:"recover",params:{user:"aaa"}}}},[e._v(e._s(e.$t("user.login.forgot-password")))])],1),r("a-form-item",{staticStyle:{"margin-top":"24px"}},[r("a-button",{staticClass:"login-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.state.loginBtn,disabled:e.state.loginBtn}},[e._v(e._s(e.$t("user.login.login")))])],1)],1)],1)},a=[],i=r("5530"),o=(r("ac1f"),r("d3b7"),r("5880")),n=function(){var e=this,t=this,r=t.$createElement,s=t._self._c||r;return s("a-modal",{attrs:{centered:"",maskClosable:!1},on:{cancel:t.handleCancel},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[s("div",{style:{textAlign:"center"},attrs:{slot:"title"},slot:"title"},[t._v("两步验证")]),s("template",{slot:"footer"},[s("div",{style:{textAlign:"center"}},[s("a-button",{key:"back",on:{click:t.handleCancel}},[t._v("返回")]),s("a-button",{key:"submit",attrs:{type:"primary",loading:t.stepLoading},on:{click:t.handleStepOk}},[t._v(" 继续 ")])],1)]),s("a-spin",{attrs:{spinning:t.stepLoading}},[s("a-form",{attrs:{layout:"vertical","auto-form-create":function(t){e.form=t}}},[s("div",{staticClass:"step-form-wrapper"},[t.stepLoading?s("p",{staticStyle:{"text-align":"center"}},[t._v("正在验证.."),s("br"),t._v("请稍后")]):s("p",{staticStyle:{"text-align":"center"}},[t._v("请在手机中打开 Google Authenticator 或两步验证 APP"),s("br"),t._v("输入 6 位动态码")]),s("a-form-item",{style:{textAlign:"center"},attrs:{hasFeedback:"",fieldDecoratorId:"stepCode",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入 6 位动态码!",pattern:/^\d{6}$/,len:6}]}}},[s("a-input",{style:{textAlign:"center"},attrs:{placeholder:"000000"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleStepOk.apply(null,arguments)}}})],1),s("p",{staticStyle:{"text-align":"center"}},[s("a",{on:{click:t.onForgeStepCode}},[t._v("遗失手机?")])])],1)])],1)],2)},l=[],c={props:{visible:{type:Boolean,default:!1}},data:function(){return{stepLoading:!1,form:null}},methods:{handleStepOk:function(){var e=this,t=this;this.stepLoading=!0,this.form.validateFields((function(r,s){r?(e.stepLoading=!1,e.$emit("error",{err:r})):setTimeout((function(){t.stepLoading=!1,t.$emit("success",{values:s})}),2e3)}))},handleCancel:function(){this.visible=!1,this.$emit("cancel")},onForgeStepCode:function(){}}},u=c,d=(r("edd4"),r("2877")),p=Object(d["a"])(u,n,l,!1,null,"4a462ef6",null),m=p.exports,g=r("7ded"),h={components:{TwoStepCaptcha:m},data:function(){return{customActiveKey:"tab1",loginBtn:!1,loginType:0,isLoginError:!1,requiredTwoStepCaptcha:!1,stepCaptchaVisible:!1,form:this.$form.createForm(this),state:{time:60,loginBtn:!1,loginType:0,smsSendBtn:!1},errorMsg:""}},created:function(){var e=this;Object(g["a"])({}).then((function(t){e.requiredTwoStepCaptcha=t.result.stepCode})).catch((function(){e.requiredTwoStepCaptcha=!1}))},methods:Object(i["a"])(Object(i["a"])({},Object(o["mapActions"])(["Login","Logout"])),{},{handleUsernameOrEmail:function(e,t,r){var s=this.state,a=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;a.test(t)?s.loginType=0:s.loginType=1,r()},handleTabClick:function(e){this.customActiveKey=e},handleSubmit:function(e){var t=this;e.preventDefault();var r=this.form.validateFields,s=this.state,a=this.customActiveKey,o=this.Login;s.loginBtn=!0;var n="tab1"===a?["loginName","loginPassword"]:["mobile","captcha"];r(n,{force:!0},(function(e,r){if(e)setTimeout((function(){s.loginBtn=!1}),600);else{var a=Object(i["a"])({},r);delete a.loginName,a[s.loginType?"loginName":"email"]=r.loginName,a.loginPassword=r.loginPassword,o(a).then((function(e){t.loginSuccess(e)})).finally((function(){s.loginBtn=!1}))}}))},getCaptcha:function(e){var t=this;e.preventDefault();var r=this.form.validateFields,s=this.state;r(["mobile"],{force:!0},(function(e,r){if(!e){s.smsSendBtn=!0;var a=window.setInterval((function(){s.time--<=0&&(s.time=60,s.smsSendBtn=!1,window.clearInterval(a))}),1e3),i=t.$message.loading("验证码发送中..",0);Object(g["b"])({mobile:r.mobile}).then((function(e){setTimeout(i,2500),t.$notification["success"]({message:"提示",description:"验证码获取成功，您的验证码为："+e.result.captcha,duration:8})})).catch((function(e){setTimeout(i,1),clearInterval(a),s.time=60,s.smsSendBtn=!1,t.requestFailed(e)}))}}))},stepCaptchaSuccess:function(){this.loginSuccess()},stepCaptchaCancel:function(){var e=this;this.Logout().then((function(){e.loginBtn=!1,e.stepCaptchaVisible=!1}))},loginSuccess:function(e){var t=this;this.$router.push({name:"/"},(function(){t.$notification.success({message:"欢迎",description:"欢迎回来"})})),this.isLoginError=!1},requestFailed:function(e){this.isLoginError=!0,this.$notification["error"]({message:"错误",description:e,duration:4})}})},f=h,v=(r("c1ef"),Object(d["a"])(f,s,a,!1,null,"69eedc1e",null));t["default"]=v.exports},c1ef:function(e,t,r){"use strict";r("19a1")},edd4:function(e,t,r){"use strict";r("90b4")},eea9:function(e,t,r){"use strict";r("2aa0")},eeab:function(e,t,r){}}]);