<template>
  <div class="typeone">
    <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
    <div class="echarts_demo" id="echartsDemo"></div>
    <div class="typeonenum">阀门口径</div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "movie",
  data() {
    return {}
  },
  created() {
    //不要在`created`钩子函数中调用该方法，因为此时demo只是被创建好了,还没有完成挂载会抛出错误
    //Error in created hook: "Error: Initialize failed: invalid dom." 创建的钩子出现错误初始化失败，无效的demo
  },
  mounted() {
    //可以在mounted钩子函数中调用，此时页面已完成初始化，可以对dom节点进行相关操作。
    this.getServiceCount()
  },
  methods: {
    // 请求数据,设备类型数量
    getServiceCount() {
      // 3.基于准备好的dom，echarts的init方法初始化echarts实例
      var myChart = echarts.init(document.getElementById('echartsDemo'))
      //初始化图表相关配置
      var option = {
        backgroundColor: 'transparent',
        grid: {
          left: '5%',
        },
        legend: {
          bottom: 6,
          icon: 'circle',
          itemHeight: 10,
          show: true,
          data: ['机械电子制造业', '轻纺工业', '资源加工工业', '其他'],
          selectedMode: false,
          textStyle: {
            color: '#96F5F6',
            fontSize: 10,
          },
        },
        angleAxis: {
          type: 'value',
          // min: 0,
          // max: 2257,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        radiusAxis: {
          type: 'category',
          data: ['其他', '资源加工工业', '轻纺工业', '机械电子制造业'],
          z: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            margin: 6,
            fontSize: 10,
            // formatter: function (value, index) {
            //   var list = [12, 25, 48, 60]
            //   return list[index] + '%'
            // },
            textStyle: {
              color: '#96F5F6',
            },
            interval: 0,
          },
        },
        polar: {
          radius: '100%',
          center: ['50%', '50%'],
        },
        tooltip: {
          show: true,
        },
        series: [
          {
            labelLine: {
              show: true
            },
            type: 'bar',
            barWidth: '30%',
            data: [],
            coordinateSystem: 'polar',
            // name: '口径12',
            stack: 'a',
            roundCap: true,
            itemStyle: {
              color: '#f3f0f0',
              barBorderRadius: 5,
            },
            showBackground: true,
            backgroundStyle: {
              color: '#27333F',
              barBorderRadius: 50,
            },
          },
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            // name: '资源加工工业',
            stack: 'a',
            roundCap: true,
            itemStyle: {
              color: '#328CD9',
            },
            showBackground: true,
            backgroundStyle: {
              color: '#27333F',
            },
          },
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            // name: '轻纺工业',
            stack: 'a',
            roundCap: true,
            itemStyle: {
              color: '#1FB4A7',
              barBorderRadius: 5,
            },
            showBackground: true,
            backgroundStyle: {
              color: '#27333F',
            },
          },
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            // name: '机械电子制造业',
            stack: 'a',
            roundCap: true,
            itemStyle: {
              color: '#424CB9',
              barBorderRadius: 5,
            },
            showBackground: true,
            backgroundStyle: {
              color: '#27333F',
            },
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)

      //发起http请求获取数据
      this.$http
          .get('/GIS/commandCenter/' + 'valve' + '/' + 'damageLevel')
          .then((res) => {
            //对图表需要的数据进行整理
            let account = res.data.data[2].count
            let dataList = res.data.data[1].DS
            let arrData1 = [dataList[150].count, 0, 0, 0]
            let arrData2 = [0, dataList[200].count, 0, 0]
            let arrData3 = [0, 0, dataList[50].count, 0]
            let arrData4 = [0, 0, 0, dataList[60].count]
            let array = [
              Math.round((dataList[150].percentage) * 10) / 10,
              Math.round((dataList[200].percentage) * 10) / 10,
              Math.round((dataList[50].percentage) * 10) / 10,
              Math.round((dataList[60].percentage) * 10) / 10
            ]
            //关键看这里，利用echarts的setOption方法将获取到的数据重新加载到图表中
            myChart.setOption({
              angleAxis: {//x轴最大/小值
                min: 0,
                max: account
              },
              radiusAxis: {
                axisLabel: {
                  show: true,
                  margin: 6,
                  fontSize: 10,
                  formatter: function (value, index) {//利用formatter格式化数据显示百分比
                    return array[index] + '%'
                  },
                  textStyle: {//文本颜色
                    color: '#96F5F6',
                  },
                },
              },
              series: [
                {
                  labelLine: {
                    show: true
                  },
                  data: arrData1, //环形1数据
                  itemStyle: {
                    color: '#f3f0f0',
                    barBorderRadius: 5,
                  },
                },
                {
                  data: arrData2, //环形2数据
                  itemStyle: {
                    color: '#328CD9',
                  },
                },
                {
                  data: arrData3, //环形3数据
                  itemStyle: {
                    color: '#1FB4A7',
                    barBorderRadius: 5,
                  },
                },
                {
                  data: arrData4, //环形4数据
                  itemStyle: {
                    color: '#424CB9',
                    barBorderRadius: 5,
                  },
                },
              ],
            })
          })
          .catch((err) => {
            this.$message(err)
          })
    },
  }
}
</script>

<style scoped>
.echarts_demo {
  width: 260px;
  height: 260px;
}
</style>
