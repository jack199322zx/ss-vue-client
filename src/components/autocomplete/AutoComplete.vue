<style >
  .transition, .autocomplete, .autocomplete ul, .autocomplete ul li a{
    transition:all 0.3s ease-out;
    -moz-transition:all 0.3s ease-out;
    -webkit-transition:all 0.3s ease-out;
    -o-transition:all 0.3s ease-out;
  }

  .autocomplete {
    position: absolute;
    left: -83px;
    width: 60%;
  }

  .autocomplete ul{
    font-family: sans-serif;
    position: absolute;
    list-style: none;
    background: #f8f8f8;
    margin: 0;
    display: inline-block;
    min-width: 15%;
    margin-top: 10px;
    width: 100%;
    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
  }

  .autocomplete ul:before{
    content: "";
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    border: 10px solid transparent;
    border-bottom: 10px solid #f8f8f8;
    top: -20px
  }

  .autocomplete ul li a{
    text-decoration: none;
    display: block;
    background: #f8f8f8;
    color: #2b2b2b;
    padding: 5px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .autocomplete ul li a:hover, .autocomplete ul li.focus-list a{
    color: white;
    background: #2F9AF7;
  }

  .form-control {
    padding-left: 30px;
    font-size: 14px;
    line-height: 1em;
    border: none;
    border-radius: 0;
    color: inherit;
    background-color: #fafafa;
  }

  .navbar-form .mac-style {
    width: 180px;
  }

  .search-input {
    border-radius: 3px;
    box-shadow: none;
    transition: all 0.15s ease-in 0s;
  }

  .search-btn {
    position: absolute;
    left: 28px;
    top: 6px;
    font-size: 14px;
    color: #ccc;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .search-btn:hover {
    color: #969696;
  }

  .mac-style:focus {
    width: 200px;
    background-color: #fafafa;
  }


</style>

<template>
  <div class="form-group search-div">
    <input type="text"
           class="form-control search-input mac-style"
           placeholder="搜索"
           v-model="inputmodel"
           @input="searchInt(inputmodel)"
           @blur="hideAll"
           @keydown="keydown"
           @focus="focus" ref="searchInput"/>
    <button class="search-btn" type="submit" @click="toSubmitSearch()"><i class="iconfont icon-kandianbo-sousuo"
                                                style="font-size:14px"></i></button>
    <div class="autocomplete transition"  v-show="showList && showFlag">
      <ul>
        <li v-for="(search, index) in searchList"
            :class="activeClass(index)">
          <a href="#"
             @click.prevent="selectList(search)"
             @mousemove="mousemove(index)">
            <b>{{ search }}</b>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

  export default {
    props: {
      searchList: {
        type: Array,
        required: true
      }
    },

    data:function(){
      return {
        inputmodel:'',
        focusIndex: '',
        showList: false
      }
    },

    methods: {
      searchInt:function(data){
        if (data && data.length> 0) {
          this.showList = true;
          //触发调用getData方法
          this.$emit('getData',data);
        }
      },
      //隐藏补全列表
      hideAll:function(e){
        //为了让blur方法延迟执行，以便能够成功执行click方法
        setTimeout(() => {
          this.showList = false;
        },250);
      },
      toSubmitSearch () {
        this.$emit('submitSearch', this.inputmodel);
      },
      focus:function(){
        this.focusIndex = 0;
      },
      mousemove:function(i){
        this.focusIndex = i;
      },
      //键盘移动
      keydown:function(e){
        let key = e.keyCode;

        //如果没有展示的list，则直接返回
        if(!this.showList) return;

        switch (key) {
          case 40: //向上
            this.focusIndex++;
            break;
          case 38: //向下
            this.focusIndex--;
            break;
          case 13: //确认
            this.selectList(this.searchList[this.focusIndex]);
            this.showList = false;
            break;
          case 27: //退出
            this.showList = false;
            break;
        }

        //点中的序号超过数组的长度时，循环到第一个
        let listLength = this.searchList.length - 1;
        this.focusIndex = this.focusIndex > listLength ? 0 : this.focusIndex < 0 ? listLength : this.focusIndex;

      },

      //更新样式
      activeClass:function(i){
        return {
          'focus-list' : i == this.focusIndex
        };
      },
      //选中列表中的哪一项
      selectList:function(data){
        this.inputmodel = data;
        this.showList = false;
      },

    },
    computed: {
      showFlag: {
        get () {
          return this.inputmodel && this.inputmodel.length> 0
        }
      }
    }
  }
</script>
