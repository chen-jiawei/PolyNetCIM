<template>
  <div>
    <div class="inputBoder" :class="{myerror: isError}">
      {{fileName || alias}}
      <input ref="inputer" class="loadFile" type="file" @change="change">
    </div>
    <div class="tips">{{tips}}</div>
  </div>
</template>
<script>
export default {
  props: ['size', 'alias'],
  data () {
    return {
      fileName: '',
      tips: '',
      isError: false
    }
  },
  methods: {
    handelClick () {
      this.$refs.inputer.click()
    },
    change () {
      let inputDOM = this.$refs.inputer
      let fil = inputDOM.files[0]
      const size = fil.size
      if (size / 1024000 > this.size) {
        this.tips = this.$t('Overlimit,pleaseselectagain')
        this.isError = true
        this.fileName = ''
        return {
          imgFileName: '',
          imgFileExt: '',
          imgFileBase64: '',
          imgFilePath: ' '
        }
      } else {
        this.tips = ``
        this.isError = false
      }
      let name = fil.name // 文件名
      this.fileName = name
      let suffix = /\.[^.]+$/.exec(name)[0] // 文件后缀
      const base64Code = this.getFileBase64(fil)
      base64Code.then(res => {
        let base64 = res.split('base64,')
        this.$emit('change', {
          imgFileName: name,
          imgFileExt: suffix,
          imgFileBase64: base64[1],
          imgFilePath: ' '
        })
      })
    },
    getFileBase64: async (file) => {
      if (window.FileReader) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        return new Promise(resolve => {
          reader.onloadend = (e) => {
            resolve(e.target.result)
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>

.inputBoder {
  width: 100%;
  height: 32px;
  border-image: repeating-linear-gradient(to right, rgba(0,0,0,0.38) 0px, rgba(0,0,0,0.38) 2px, transparent 2px, transparent 4px) 1 repeat;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  border-radius: 2px;
  background: #fff;
  position: relative;
  text-align: left;
  line-height: 32px;
  padding-left: 10px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  .loadFile {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }
}
.myerror {
  border: 1px solid #e68f8f;
}
.tips {
    color: red;
    font-size: 12px;
    padding: 0 10px;
  }
</style>
