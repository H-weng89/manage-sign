<template>
    <div :class="{'wra':true,'mobile':mobile}">
        <div class="top">
            <div class="left">
                <div :class="{'flag':flag}" @click="list">列表视图</div>
                <div :class="{'flag':!flag}" @click="chart">统计视图</div>
            </div>
            <div :class="{'right':!mobile,'rmobile':mobile}">
                 <a-dropdown placement="bottomCenter" :trigger="['click']" >
    <a class="ant-dropdown-link" @click.prevent>
           {{time}}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item >
          <a href="javascript:;" style="font-size:13px" @click="this.time=this.nowtime">{{nowtime}}</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" style="font-size:13px" @click="this.time = this.nowtime-1">{{nowtime-1}}</a>
        </a-menu-item>
        <a-menu-item >
          <a href="javascript:;" style="font-size:13px" @click="this.time = this.nowtime-2">{{nowtime-2}}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
            
        </div>
        </div>
        <div class="main">
          <keep-alive>
  <router-view></router-view>
          </keep-alive>
          
        </div>
        
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue'
import {mapState} from 'vuex'
import store from '../store/index'
export default defineComponent( {
    components:{
        DownOutlined
    },
    data(){
        return{
            flag:true,
            time:'',
            mobile:false,
            nowtime:''
            
        }
    },
    computed:{
   
    },

  

    async mounted() {
       var d = new Date(); 
       var year = d.getFullYear();
         this.nowtime = year
      this.mobile = this.isMobile()
             this.time = year 
         store.dispatch('setTime',this.nowtime)
       
          console.log(store.state.time)
    
     
      this.$router.push({path:'/about',query:{
        time:this.time
      }})
    },

    watch:{
      async time(newval,old){
         await store.dispatch('setTime',newval)
         console.log(newval)
       
         
      }
    },
  

    methods: {
        list(){
            this.$router.push({path:'/about',query:{time:this.time}})
            this.flag = true
        },
        chart(){
             this.$router.push({path:'/chart',query:{time:this.time}})
             this.flag = false
        },
        isMobile () {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true // 手机端
  } else {
    return false // alert('PC端')
  }
}

        
    },
});
</script>

<style lang="less" scoped>

.wra{
    width: 100%;
    height: 100%;
  overflow-x: hidden;
   
}
 :global(.ant-dropdown-link ){
  color: white !important;
}

.mobile{
    width: 180% !important;
    overflow-y: hidden;
    overflow-x: visible;
    .top{
      width: 110%;
    }

  .rmobile{
      position: absolute;
      right: -60%;
      /deep/ span svg{
         font-size: 9px;
     }
   /deep/.ant-dropdown-menu-title-content a{
         font-size: 8px !important;
     }
        }
}
.top{
    width: auto;
    height: 5%;
    background-color: #5a5a5a;
    line-height: 26px;
    text-align: center;
    display: flex;
       align-items: flex-end;
        align-content: flex-end;
     .left{
        display: flex;
        height: 80%;
     
       
        width: 35%;
       div{
            margin-left: 5px;
            padding-left: 5px;
            padding-right: 5px;
           background-color: gray;
       }
       div:hover{
           cursor: pointer;
       }
       .flag{
           background-color: white;
       }
    }
    .right{
     position: absolute;
  
     right: 10%;
     /deep/ span svg{
         font-size: 9px;
     }
   /deep/.ant-dropdown-menu-title-content a{
         font-size: 8px !important;
     }
    }
}

.main{
    height: 80%;
   
width: 88%;

}

</style>