<template>
    <div id="chart"> 
        <div id="chart1"></div>
        <div id="chart2"></div>
        <div id="chart3"></div>
        <div id="chart4"></div>
        <div id="chart5"></div>
        
    </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://join.w2fzu.com'
axios.defaults.headers['satoken'] = sessionStorage.getItem('token')

import {mapState} from 'vuex'
     
          
export default {
  data(){
    return{
      rusult:''
    }
  },

   async mounted() {
 
    this.chart()
    
      
    },


    methods: {
      async  chart(){
               const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }

       this.result = await axios.post('/joinus/admin/count',qs.stringify({year:this.time}),config)
     console.log(this.result)
  
   var campus  = this.result.data.data.campus
   var jobs =this.result.data.data.job
   jobs.splice(0,1)
   var grade = this.result.data.data.grade
   var channel = this.result.data.data.channel
    var myChart = echarts.init(document.getElementById('chart1'));
    myChart.dispose()
    myChart = echarts.init(document.getElementById('chart1'),null,{
    
    });
  
  let option1 = {
    tooltip :{                                      //提示框组
    trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
               
                   //文本样式
},
title:{
  show:true,
  text:'校区分布',
  x:'center',
  y:'bottom'
},

  series: [
    {
      type: 'pie',
    
      data: [
        {
          value: campus[0].num,
          name: campus[0].campus
        },
        {
          value: campus[1].num,
          name: campus[1].campus
        },
        
      ],
      radius:'60%',
      lable:{
        title:'校区'
      },
      

    }
  ],

};
        myChart.setOption(option1)

           let myChart2 = echarts.init(document.getElementById('chart2'));
           myChart2.dispose()
    myChart2 = echarts.init(document.getElementById('chart2'),null,{
    
    });
         let option2 = {
            tooltip :{                                      //提示框组
    trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
               
                   //文本样式
},
title:{
  show:true,
  text:'方向分布',
  x:'center',
  y:'bottom'
},
  xAxis: {
    data: jobs.map(item=>item.job)
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: jobs.map(item=>item.num)
     
    }
  ]
};
myChart2.setOption(option2)
 let myChart3 = echarts.init(document.getElementById('chart3'));
           myChart3.dispose()
    myChart3 = echarts.init(document.getElementById('chart3'),null,{
    
    });
     let option3 = {
    tooltip :{                                      //提示框组
    trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
               
                   //文本样式
},
title:{
  show:true,
  text:'年级分布',
  x:'center',
  y:'bottom'
},

  series: [
    {
      type: 'pie',
    
      data: [
        {
          value: grade[0].num,
          name: '大一'
        },
        {
          value: grade[1].num,
          name: '大二'
        },
        
      ],
      radius:'60%',
      lable:{
        title:'校区'
      },
      

    }
  ],

};
myChart3.setOption(option3)

 var myChart4 = echarts.init(document.getElementById('chart4'));
    myChart4.dispose()
    myChart4 = echarts.init(document.getElementById('chart4'),null,{
    
    });
  
  let option4 = {
    tooltip :{                                      //提示框组
    trigger: 'item',                            //触发类型,'item'数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。 'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
               
                   //文本样式
},
title:{
  show:true,
  text:'了解渠道',
  x:'center',
  y:'bottom'
},

  series: [
    {
      type: 'pie',
    
      data: channel.map(item=>{
          return {
            value: item.count,
          name: item.channel
          }
        })
        
        
      ,
      radius:'50%',
      lable:{
        title:'校区'
      },
      

    }
  ],

};
        myChart4.setOption(option4)
        },
    },
    computed:{
      ...mapState(['time'])
    },
    watch:{
      async time(newval,oldval){
         const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }

     this.result = await axios.post('/joinus/admin/count',qs.stringify({year:newval}),config)
         console.log(newval)
         console.log(this.result)
         this.chart()
      }
    }
};
</script>

<style lang="less" scoped>
#chart{
  display: flex;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
#chart1{
    width: 300px;
    height: 200px;
}

#chart2{
  width:500px;
  height: 300px;
}
#chart3{
  width: 300px;
   height: 200px;
}
#chart4{
  width: 300px;
  height: 200px;
}
</style>