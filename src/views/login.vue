<template>
<div class="wra">
     <div class="top"><h3>西二在线</h3></div>
     <div :class="{'main1':!flag,'main2':flag}">
          <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="用户名"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
     </div>
</div>


</template>
<script>
import axios from 'axios'
import qs from 'qs'
import { defineComponent, reactive,onMounted } from 'vue';
import {useRouter} from 'vue-router'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://www.jessieback.top'


export default defineComponent({
  setup() {
      const router = useRouter()
    const formState = reactive({
      username: 'west2admin',
      password: 'West2admin',
      remember: true,
    });

    const onFinish = values => {
        const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
          
        }
      }
      console.log('Success:', values);
      axios.post('/joinus/admin/login',qs.stringify({
          username:formState.username,
          password:formState.password
      }),config).then(res=>{
          console.log(res)
          sessionStorage.setItem('tokenName',res.data.data.tokenName)
          sessionStorage.setItem('token',res.data.data.tokenValue)
          console.log(sessionStorage.getItem('tokenName'))
          router.push('/chartView')

      })
          };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    function  isMobile () {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true // 手机端
  } else {
    return false // alert('PC端')
  }
}

 var flag = isMobile()
   onMounted(()=>{
       console.log(isMobile())
   })

    return {
      formState,
      onFinish,
      onFinishFailed,
      flag
    };
  },

   mounted() {
       
   },

});
</script>

<style lang="less" scoped>
.wra{
 
 .top h3{
     color: white;
     font-size: 20px;
 }

width: 100%;
height: 100%;
    
    

    background: rgb(31, 44, 54);
}


.main2{
 position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%,-30%);
    background-color: white;
    border-radius: 10px;
    width:80%;
    height: 50%;
   
    /deep/ form {
        margin-top: 10%;
        margin-right: 20%;
        margin-left: 10%;
    
    }
    
  
}
.main1{
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-30%);
    background-color: white;
    border-radius: 10px;
    width:50%;
    height: 60%;
   
    /deep/ form {
        margin-top: 10%;
        margin-right: 20%;
        margin-left: 10%;
        button{
            margin-left: 15%;
        }
    
    }

}

</style>