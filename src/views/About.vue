<template>


<div class="btn">
  <div class="number">共{{number}}条记录</div>

  <div class="group" >
  <a-button type="primary" @click="showModal">更新群号</a-button>
    <a-modal
      v-model:visible="group"
      title="添加群号"
      :confirm-loading="confirmLoading"
      @ok="handleOk1"
    >
  <a-input v-model:value="groupnum" placeholder="纳新群号" />
    </a-modal>
  </div>
   <div class="search">
         <a-input-search
      v-model:value="search"
      placeholder="学号或姓名"
      enter-button
      @search="onSearch"
    />
       </div>
  <div class="add">
    <span @click="add">添加成员</span>


  </div>
  <div class="excel" @click="excel">
   导出
  </div>



    

      
   
    <a-modal v-model:visible="visible" title="添加成员" @ok="handleOk" width="600px">
      <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item  label="学号" name="no">
      <a-input v-model:value="formState.no" type="text" autocomplete="off" size="small"  />
    </a-form-item>
    <a-form-item has-feedback label="姓名" name="name">
      <a-input v-model:value="formState.name" type="text" autocomplete="off" size="small"/>
    </a-form-item>
    <!-- <a-form-item has-feedback label="Age" name="age">
      <a-input-number v-model:value="formState.age" />
    </a-form-item> -->
     <a-form-item label="学习方向">
         <br>
      <a-checkbox-group v-model:value="formState.jobs">
        <a-checkbox value="前端" name="type">前端</a-checkbox>
        <br>
        <a-checkbox value="Java" name="type">Java</a-checkbox>
        <br>
        <a-checkbox value="Python" name="type">Python</a-checkbox>
        <br>
        <a-checkbox value="产品" name="type">产品</a-checkbox>
        <br>
         <a-checkbox value="美术" name="type">美术</a-checkbox>
        <br> <a-checkbox value="Golang" name="type">Golang</a-checkbox>
        <br> <a-checkbox value="安卓" name="type">安卓</a-checkbox>
        <br> <a-checkbox value="iOS" name="type">iOS</a-checkbox>
        <br> <a-checkbox value="Unity" name="type">Unity</a-checkbox>
        <br>
      </a-checkbox-group>
    </a-form-item>
     <a-form-item has-feedback label="校区" >
      <a-radio-group v-model:value="formState.campus">
      <a-radio value="铜盘">铜盘</a-radio>
      <a-radio value="旗山">旗山</a-radio>
     
    </a-radio-group>
    </a-form-item>
     <a-form-item has-feedback label="年级" >
      <a-radio-group v-model:value="formState.grade">
      <a-radio value="大一">大一</a-radio>
      <a-radio value="大二">大二</a-radio>
     
    </a-radio-group>
    </a-form-item>
    <a-form-item has-feedback label="学院专业" name="profession">
      <a-input v-model:value="formState.profession" type="text" autocomplete="off" size="small"/>
    </a-form-item>
      <a-form-item label="了解西二在线的渠道">
         <br>
      <a-checkbox-group v-model:value="formState.access">
        <a-checkbox value="福大助手" name="type">福大助手</a-checkbox>
        <br>
        <a-checkbox value="海报" name="type">海报</a-checkbox>
        <br>
        <a-checkbox value="班导" name="type">班导</a-checkbox>
        <br>
         <a-checkbox value="辅导员推荐" name="type">辅导员推荐</a-checkbox>
        <br>
        <a-checkbox value="其他" name="type">其他</a-checkbox>
        <br>
        
        <br>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item has-feedback label="选择西二的理由" name="reason">
      <a-textarea v-model:value="formState.reason" placeholder="选择西二的理由" :rows="4" />
    </a-form-item>
    <a-form-item has-feedback label="自我介绍" name="introduction">
      <a-textarea v-model:value="formState.introduction" placeholder="自我介绍" :rows="4" />
    </a-form-item>
     <a-form-item  label="邮箱" name="mail">
      <a-input v-model:value="formState.mail" type="text" autocomplete="off" size="small"/>
    </a-form-item>
     <a-form-item  label="手机号" name="phone">
      <a-input v-model:value="formState.phone" type="text" autocomplete="off" size="small"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
     

    </a-form-item>
  </a-form>
    </a-modal>
  </div>
    <img src="" alt="">
  <!-- </div> -->
  <!-- <div class="excel" @click="excel">
   导出
  </div> -->


  <a-table :columns="columns" :data-source="data1" @change="onChange" />
  
</template>
<script>
import { defineComponent,onMounted, reactive,toRaw,ref } from 'vue';
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://join.w2fzu.com'
let tokenNmae = sessionStorage.getItem('tokenName')
let token = sessionStorage.getItem('token')
axios.defaults.headers['satoken'] = token
// axios.defaults.headers[`${tokenNmae}`] = `${token}`
import qs from 'qs'
import{useRoute,useRouter} from 'vue-router'
import store from '../store/index'
import {mapState} from 'vuex'
import XLXS from "xlsx";
import FileSaver from "file-saver";

const columns = [
  {
  title: '序号',
  width:'100px',
  dataIndex: 'number',
  defaultSortOrder: 'descend',
  sorter: (a, b) => b.number - a.number,
 
},
{
  title: '提交时间',
  dataIndex: 'updateTime',
  defaultSortOrder: 'descend',
  sorter: (a, b) => 1-2,
  width:'170px'
},
{
  title: '学号',
  dataIndex: 'no',
  defaultSortOrder: 'descend',
  width:'150px',
  sorter: (a, b) => a.no - b.no,
},

{
  title: '姓名  ',
  dataIndex: 'name',
  width:'130px'

}, 
{
  title: '方向',
  dataIndex: 'jobs',
  width:'130px',
  filters: [{
    text: '前端',
    value: '前端',
  }, {
    text: 'Java',
    value: 'Java',},
    {text:'Golang',
    value:'Golang'},
    {text:'iOS',
    value:'iOS'},
    {text:'Python',
    value:'Python'},
    {text:'产品',
    value:'产品'},
    {text:'美术',
    value:'美术'},
    {text:'安卓',
    value:'安卓'},
    {text:'Unity',
    value:'Unity'}
  
  ],
   onFilter: (value, record) => {
     let data = toRaw(record)
   let arr = data.jobs.split(',')
   var flag = false
  
   arr.forEach(item=>{
     console.log(item)
     if(item==value){
       flag = true
       
      
     }
   })
   return flag
   },
  defaultSortOrder: 'descend',
 
},
{
  title: '校区',
  dataIndex: 'campus',
  defaultSortOrder: 'descend',
  sorter: (a, b) => 1-2,
  width:'130px'
},
{
  title: '邮箱',
  dataIndex: 'mail',
  width:'250px'

},
{
  title: '手机',
  dataIndex: 'phone',
  defaultSortOrder: 'descend',
  width:'200px'
  
},
{
  title: '自我介绍',
  dataIndex: 'introduction',
  width:'200px',
  ellipsis: true,

 
},
  ];

export default defineComponent({

  setup() {
    let visible = ref(false)
      const group = ref(false);
       const showModal = () => {
      group.value = true;
    };
    let number = ref(0)



    let groupnum = ref('')

    let  handleOk1 = async() => {
       const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          
       
        }
      }

    let result = await  axios.post('/joinus/admin/setQQGroup',qs.stringify({groupNum:groupnum.value}),config)
    console.log(result)
    groupnum.value = ''
       group.value = false

    };
     function add(){
      visible.value = true
    }

    
 
     const handleOk = e => {
 formState.access = formState.access.toString()
      
      const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
           
        }
      }
      console.log(toRaw(formState));
      axios.post('/joinus/apply',qs.stringify(toRaw(formState)),config).then(res=>{
           console.log(res.data)
        
          if(res.data.code==200){
            console.log(res.data)

             alert('添加成功')
             location.reload()
          }

          else{
        alert('请查看是否有选项未填')
          }
      })
      // visible.value = false;

    };
     const formState = reactive({
      no: '',  //学号
      name: '',
     jobs:[],
     campus:'',
     grade:'',
     profession:'',
     access:[],
     reason:'',
     introduction:'',
     mail:'',
     phone:''

    });
      
    let checkNo = async (_rule, value) => {
         const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
           
        }
      }

    



     
     let result = await axios.post('/joinus/exists',qs.stringify({
          no:value
      }),config
)
    if(!value){
         return Promise.reject('请输入学号');
    }
    if(result.data.status==true){
        return Promise.reject('该学号已报名,继续报名会覆盖上次信息');

    }


    };

    let checkMail = async (_rule, value) => {
       
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if(!reg.test(value)){
       return Promise.reject('请输入正确的邮箱');
    }
    };

    let checkPhone = async(_rule,value)=>{
       var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
     
         if (!myreg.test(value)){
             return Promise.reject('请输入正确的手机号');
                }
                else{
                  return Promise.resolve();
                }
    }

    const rules = {
      no: [{
        required: true,
        validator: checkNo,
        trigger: 'change',
      }],
      mail: [{
        validator: checkMail,
        trigger: 'change',
      }],
      phone: [{
        validator: checkPhone,
        trigger: 'change',
      }],
     
    };
    const onChange = (pagination, filters, sorter) => {
      console.log('params', pagination, filters, sorter);
    };
    
        
   
    const router  = useRouter()
    const route = useRoute()
    console.log(route.query.time)
  onMounted(async()=>{
      
      

     
        
 
    })
      
       const search = ref('');

    
     
 

    return {
     visible,
     add,
      columns,
      onChange,
      formState,
      handleOk,
      rules,
     search,
     showModal,
     group,
     handleOk1,
     groupnum
     

    };
  },
async mounted(){
 const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'satoken':token
             
        }
      }
      var result  = await axios.post('/joinus/admin/getAll',qs.stringify({year:this.$route.query.time,pageSize:10000}),config)
         
      this.data1 = result.data.data.list
      console.log(result)
      this.number = this.data1.length
      this.data1.forEach((item,index)=>{
        item.number = index+1
       
          item.jobs = toRaw(item.jobs).toString()
          
      })

   
     
      
},
computed:{
  ...mapState(['time'])
},
  data(){
    return{
      data1:[],
      number:0
     
    }
  },
  methods:{
   async  excel(){
      
      const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      let date = new Date
      let year = date.getFullYear()
      let result = await axios.get('/joinus/admin/dump',{params:{year:this.$store.state.time},responseType:'blob'})
      console.log(result)
      let filename='下载.xlsx';
      // let blob = new Blob(result.data)
let blob=new Blob([result.data],{type:result.data.type})
  if(window.navigator && window.navigator.msSaveBlob){
          window.navigator.msSaveBlob(blob,filename);
        }else{
          var downloadElement=document.createElement('a');//模拟一个a标签与asp.net试图操作类似
          var href=window.URL.createObjectURL(blob);//转成链接让其能供人下载
          downloadElement.href=href;//a标签的href
          downloadElement.download=filename;//a标签的下载名字
          document.body.appendChild(downloadElement);//注册这个控件将这个组件加到body尾部
          downloadElement.click();//注销掉
          window.URL.revokeObjectURL(href);//清除生成的链接，会占用一些东西，不知道啥，反正运行慢点
        }
    },
  async  onSearch(searchValue){
 const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }

       let rgb = /[0-9]/
          if(rgb.test(searchValue)){
         let result  = await   axios.post('/joinus/admin/search',qs.stringify({
              year:store.state.time,
              no:searchValue}),config)
               this.data1 = result.data.data.list
                 this.data1.forEach((item,index)=>{
        item.number = index+1
       
          item.jobs = toRaw(item.jobs).toString()
          
      })
          }
          else{
             let result  = await   axios.post('/joinus/admin/search',qs.stringify({
              year:store.state.time,
              name:searchValue}),config)
               this.data1 = result.data.data.list
                 this.data1.forEach((item,index)=>{
        item.number = index+1
       
          item.jobs = toRaw(item.jobs).toString()
          
      })

          }
         
  }

  },
  watch:{
   async  time(n,o){
       const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }
      var result  = await axios.post('/joinus/admin/getAll',qs.stringify({year:this.time,pageSize:10000}),config)
         
      this.data1 = result.data.data.list
      this.data1.forEach((item,index)=>{
        item.number = index+1
       
          item.jobs = toRaw(item.jobs).toString()
          
      })

      console.log(this.data1)
    }
  }

});
</script>

<style lang="less" scoped>

.btn{
  display: flex;
  
justify-content: space-around;

 width: 100%;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;
 
   font-size: 16px;

   .number{
   
   }

   .search{
   margin-right: 100px;
   height: 50px;
   line-height: 50px;
   margin-top: 20px;
   }

   .group{
      text-decoration: underline;
  color: skyblue;
  margin-right: 100px;
   }

   .group:hover{
     cursor: pointer;
   }


.wra{
  width: 100%;
  height: 100%;
 

  .main{
   /deep/.ant-table table{
    margin: auto;
    width: 100%;
   }
  }
}
  

.search{

}
.add{
  
  text-decoration: underline;
  color: skyblue;
  margin-right: 100px;
  

}
.add:hover{
  cursor:pointer;
}

.excel{

    text-decoration: underline;
  color: skyblue;
}
.excel:hover{
  cursor: pointer;
}
}

:global(.ant-btn-primary){
  background-color: #1d202e;
  border-color: #1d202e;
}

:global(.ant-table-thead > tr > th){
  padding: 10px 20px !important;
}
:global(.wra .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters){
  padding-right: 20px !important;
}
  
</style>