<template>
  <nav class="paginate-box">
    <ul class="pagination boot-page">
      <li>
        <a href="javascript:void(0)" aria-label="Previous" @click="onFirstClick()">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" aria-label="Next" @click="onPrevClick()">
          <span aria-hidden="true">‹</span>
        </a>
      </li>
      <li v-for="(page, index) in pages" :class="activeNum === index ? 'active' : ''">
        <a href="javascript:void(0)" v-text="page" @click="onPageClick(index)"></a>
      </li>
      <li>
        <a href="javascript:void(0)" aria-label="Next" @click="onNextClick()">
          <span aria-hidden="true">›</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" aria-label="Next" @click="onLastClick()">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    <div class="page-total">
      共 <span v-text="pageTotal"></span> 页
    </div>
  </nav>
</template>

<script>
  export default {
    props: {

      // 是否请求服务器端数据
      async: {
        type: Boolean,
        default: true
      },

      // 每页显示个数
      len: {
        type: Number,
        default: 30
      },

      // 表格数据（数组）
      data: {
        type: Array,
        default: function () {
          return []
        }
      },

      // 请求的路径
      url: {
        type: String,
        default: null
      },

      // 显示页数
      pageLen: {
        type: Number,
        default: 5
      },

      // 参数内容
      param: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        pageTotal: 1,
        pages: [1],
        activeNum: 0
      }
    },
    mounted () {
      if (!this.async) {
        this.getPages()
      }
      this.getData()
    },
    created () {
      eventHub.$on('paginate_refresh', this.refresh)
    },
    beforeDestroy () {
      eventHub.$off('paginate_refresh', this.refresh)
    },
    methods: {

      // 点击页码刷新数据
      onPageClick (index) {
        this.activeNum = index
      },

      // 上一页
      onPrevClick () {
        // 当前页是否为当前最小页码
        if (this.activeNum > 0)
        {
          this.activeNum = this.activeNum - 1
        }
        else
        {
          if (this.pages[0] !== 1)
          {
            let newPages = []

            for (let i = 0; i < this.pages.length; i++) {
              newPages[i] = this.pages[i] - 1
            }

            this.pages = newPages
            this.getData()
          }
        }
      },

      // 下一页
      onNextClick () {
        // 当前页是否为当前最大页码
        if (this.activeNum < this.pages.length - 1)
        {
          this.activeNum = this.activeNum + 1
        }
        else
        {
          if (this.pages[this.pages.length - 1] < this.pageTotal)
          {
            let newPages = []

            for (let i = 0; i < this.pages.length; i++) {
              newPages[i] = this.pages[i] + 1
            }

            this.pages = newPages

            this.getData()
          }
        }
      },

      // 第一页
      onFirstClick () {
        if (this.pages[0] === 1)
        {
          this.activeNum = 0
        }
        else
        {
          let originPage = []

          for (let i = 1; i <= this.pageLen; i++) {
            originPage.push(i)
          }

          this.pages = originPage
          this.activeNum === 0 ? this.getData() : this.activeNum = 0
        }
      },

      // 最后一页
      onLastClick () {
        if (this.pageTotal <= this.pageLen)
        {
          this.activeNum = this.pages.length - 1
        }
        else
        {
          let lastPage = []

          for (let i = this.pageLen - 1; i >= 0; i--) {
            lastPage.push(this.pageTotal - i)
          }

          this.pages = lastPage
          this.activeNum === this.pages.length - 1 ? this.getData() : this.activeNum = this.pages .length - 1
        }
      },

      // 获取页码
      getPages () {
        this.pages = []

        if (!this.async) {
          this.pageTotal = Math.ceil(this.data.length / this.len)
        }

        // 比较总页码和显示页数
        if (this.pageTotal <= this.pageLen)
        {
          for (let i = 1; i <= this.pageTotal; i++) {
            this.pages.push(i)
          }
        }
        else
        {
          for (let i = 1; i <= this.pageLen; i++) {
            this.pages.push(i)
          }
        }
      },

      // 页码变化获取数据
      getData () {
        if (!this.async)
        {
          let len = this.len,
            pageNum = this.pages[this.activeNum] - 1,
            newData = [];

          for (let i = pageNum * len; i < (pageNum * len + len); i++) {
            this.data[i] !== undefined ? newData.push(this.data[i]) : ''
          }

          this.$emit('pd', newData)
        }
        else
        {
          this.param.page = this.pages[this.activeNum]
          this.param.page_size = this.len

          axios.get(this.url, { params: this.param }).then((response) => {
            let res = response.data
            this.pageTotal = Math.ceil(res.all_count / this.len)

            if (this.pages.length !== this.pageLen || this.pageTotal < this.pageLen)
            {
              this.getPages()
            }

            if (!res.data.length)
            {
              this.activeNum = this.pageTotal - 1
            }

            this.$emit('pd', res)
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },

      // 刷新表格
      refresh () {
        this.getData()
      },

      // 重置并刷新表格
      refresh2 () {
        this.pages = [1]
        this.activeNum === 0 ? this.getData() : this.activeNum = 0
      }
    },
    watch: {
      // 监听显示数量
      'len' (newVal, oldVal) {
        if (!this.async) {
          this.getPages()

          if (this.activeNum + 1 > this.pages.length) {
            this.activeNum = this.pages.length - 1
          }

          this.getData()
        } else {
          this.refresh2()
        }
      },

      // 监测当前页变化
      'activeNum' (newVal, oldVal) {
        this.getData()
      }
    }
  }
</script>

<style scoped>
  .boot-select {
    float: right;
    width: 80px;
  }

  .boot-page {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
  }

  .page-total {
    display: inline-block;
    vertical-align: middle;
  }

  .paginate-box {
    margin-top: 8px;
    text-align: center;
  }
</style>
