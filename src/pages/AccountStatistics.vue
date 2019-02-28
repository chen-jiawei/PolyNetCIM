<template>
  <div class="page-padding">
    <my-breadcrumbs :item="navItems"></my-breadcrumbs>
    <div class="my-shadow my-content">
      <div class="search-bar my-shadow">
        <div class="search-item">
          <v-select
            :items="start"
            :label="$t('StartYear')"
            v-model="startYear"
          ></v-select>
        </div>
        <div class="search-item">
          <v-select
            :items="end"
            :label="$t('EndYear')"
            v-model="endYear"
          ></v-select>
        </div>
        <div class="search-item">
          <v-btn color="info" @click="getData" :loading="loading"><v-icon small>search</v-icon> {{$t('Search')}}</v-btn>
        </div>
        <v-radio-group v-model="radios" row>
          <v-radio label="Pie Charts" :value="1"></v-radio>
          <v-radio label="Bar Charts" :value="2"></v-radio>
          <v-radio label="3D Charts" :value="3"></v-radio>
        </v-radio-group>
      </div>
      
      <div>
        <div class="charts loading" v-if="loading">{{$t('Loading...')}}</div>
        <div class="charts loading" v-if="nodata">{{$t('NoData')}}</div>
        <div id="myChart" class="charts" v-show="radios === 1 && !loading && !nodata"></div>
        <div id="myChart1" class="charts" v-show="radios === 2 && !loading && !nodata"></div>
        <div id="myChart2" class="charts" v-show="radios === 3 && !loading && !nodata"></div>
        
      </div>
    </div>
  </div>
</template>
<script>
import data from '../../static/3dChart'
import 'echarts-gl/dist/echarts-gl.min.js'
export default {
  data () {
    return {
      loading: false,
      nodata: false,
      radios: 1,
      navItems: [
        {
          text: this.$t('Home'),
          disabled: false,
          href: '/'
        },
        {
          text: this.$t('AccountStatistics'),
          disabled: true
        }
      ],
      showType: '',
      start: [],
      end: [],
      startYear: 2000,
      endYear: 2009,
      chartData: [],
      chartTitle: []
    }
  },
  mounted () {
    this.initDate()
    this.getData()
    this.init3Dchart()
    // this.initPieCahrt()
  },
  methods: {
    initDate () {
      // 获取今年
      let nowDate = new Date()
      let endYear = nowDate.getFullYear()
      let date = []
      for (let i = endYear; i > 1989; i--) {
        date.push(i)
      }
      this.start = date
      this.end = date
    },
    getData () {
      this.loading = true
      this.chartData = []
      this.chartTitle = []
      this.$fetch(`/ipoly/clientManager/getReportStatistics.json?startYear=${this.startYear}&endYear=${this.endYear}`)
        .then(res => {
          if (res.body && res.body.length <= 0) {
            this.nodata = true
            this.loading = false
            return
          }
          res.body.map(item => {
            this.chartData.push(item.motBprm)
            this.chartTitle.push(item.secYear + '')
          })
          this.initPieCahrt()
          this.initBarChart()
          this.nodata = false
          this.loading = false
        })
    },
    initBarChart () {
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: this.chartTitle
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.chartData,
          type: 'bar'
        }]
      })
    },
    initPieCahrt () {
      // let legenData = ['2000','2001'....]  // 数据示例
      let legenData = this.chartTitle  // 数据示例
      // let selected = {2000: true, 2001: false} // 数据示例 true则显示数据，false则不显示，点击可以改变状态
      let selected = {}
      for (let i = 0; i < this.chartTitle.length; i++) {
        selected[this.chartTitle[i]] = true
      }
      // let seriesData = [{name: 2000,value:564564},{name: 2001,value:66899}] // 示例数据
      let seriesData = []
      for (let i = 0; i < this.chartData.length; i++) {
        let obj = {}
        obj['name'] = this.chartTitle[i]
        obj['value'] = this.chartData[i]
        seriesData.push(obj)
      }
      let myChart = this.$echarts.init(document.getElementById('myChart1'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'horizontal',
          left: 'center',
          bottom: '10',
          data: legenData,
          selected: selected
        },
        series: [
          {
            name: 'ratio:',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    init3Dchart () {
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      let option = {
        grid3D: {},
        tooltip: {},
        xAxis3D: {
          type: 'category'
        },
        yAxis3D: {
          type: 'category'
        },
        zAxis3D: {},
        visualMap: {
          max: 1e8,
          dimension: 'Population'
        },
        dataset: {
          dimensions: [
            'Income',
            'Life Expectancy',
            'Population',
            'Country',
            'Year'
          ],
          source: data
        },
        series: [
          {
            type: 'bar3D',
            // symbolSize: symbolSize,
            shading: 'lambert',
            encode: {
              x: 'Year',
              y: 'Country',
              z: 'Life Expectancy',
              tooltip: [0, 1, 2, 3, 4]
            }
          }
        ]
        // series: [
        //   {
        //     name: '数据',
        //     type: 'bar3D',
        //     shading: 'lambert',
        //     encode: {
        //       x: 'year', // 映射到X轴的数据
        //       y: 'param1', // 映射到Y轴的数据
        //       z: 'param2', // 映射到Z轴的数据，也就是决定柱子高低的一个数据
        //       tooltip: [0, 1, 2] // 鼠标hover的时候弹出的提示，表示要显示第几项内容
        //     }
        //   }
        // ]
      }
      myChart.setOption(option)
    },
    /**
     * 3Dchart示例数据
     */
    exampleData3D () {
      const EXAMPLE_DATA = [
        ['param1', 'param2', 'year'],
        [10001, 13, '2000'],
        [10002, 114, '2000'],
        [10003, 115, '2000'],
        [10004, 116, '2000'],
        [10002, 14, '2001'],
        [10002, 15, '2002'],
        [10004, 16, '2003'],
        [10005, 17, '2004'],
        [10006, 18, '2005'],
        [10007, 19, '2006'],
        [10008, 20, '2007'],
        [10009, 21, '2008'],
        [10010, 22, '2009']
      ]
      return EXAMPLE_DATA
    }
  }
}
</script>
<style lang="less" scoped>
.charts {
  width: 1200px;
  height: 600px;
  margin: 0 auto;
}
.right {
  float: right;
  overflow: hidden;
}
.left {
  float: left;
  overflow: hidden;
}
.loading {
  text-align: center;
  line-height: 500px;
  font-size: 20px;
}
</style>

