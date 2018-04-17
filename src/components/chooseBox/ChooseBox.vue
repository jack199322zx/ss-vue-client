<template>
  <div>
    <MaskLayer></MaskLayer>
    <div class="choose-programs-box">
      <div class="title">
        <div style="float: left;">选择标签</div>
        <div class="close" @click="closeModal">x</div>
      </div>
      <div class="cloud cloud-choose-flag">
        <div class="cloud-box">
          <ul>
            <li v-for="(flag,index) in flagList"  :class="{'no-choosen': noChoosenList[index]}">
              <a @click="changeChooseFlag(index)">{{flag.flagInfo}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="operate-content">
        <div class="confirm-btn" @click="confirmModal">确认</div>
        <div class="cancel-btn" @click="closeModal">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import MaskLayer from '../../components/loadPlayer/MaskLayer';

  export default {
    props: ['flagList'],
    data() {
      return {
        noChoosenList: []
      };
    },
    methods: {
      confirmModal() {
        this.$emit('confirmModal', this.noChoosenList);
      },
      closeModal() {
        this.$emit('closeModal');
      },
      changeChooseFlag (index) {
        this.noChoosenList[index]= !this.noChoosenList[index];
        this.noChoosenList.push()
      }
    },
    created () {
      this.noChoosenList = Array(this.flagList.length).fill(true);
    },
    components: {
      MaskLayer
    }
  };
</script>
<style scoped lang="less">
  @import '../../assets/styles/base';

  .choose-programs-box {
    z-index: 10001;
    position: fixed;
    width: 500px;
    height: 250px;
    top: 30%;
    left: 30%;
    background-color: white;
    border-radius: 5px;
    color: #555555;
    .title {
      height: 40px;
      width: 100%;
      line-height: 40px;
      background-color: #f5f5f5;
      color: #555555;
      font-size: 16px;
      border-radius: 5px 5px 0 0;
      border-bottom: 1px solid #eeeeee;
      padding: 0 1.5% 0 2.5%;
      .close {
        float: right;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        &:hover {
          cursor: pointer;
          color: @green-color;
        }
      }
    }
  }

  .operate-content {
    height: 40px;
    width: 100%;
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    justify-content: center;
    .confirm-btn, .cancel-btn {
      width: 90px;
      height: 30px;
      line-height: 30px;
      color: white;
      border-radius: 5px;
      margin: 10px 0 0 10px;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
    .confirm-btn {
      background-color: @green-color;
    }
    .cancel-btn {
      background-color: #d2d2d2;
    }
  }
  .cloud-choose-flag {
    padding: 10px 20px;

  }
  .cloud ul .no-choosen {
    background: #d2d2d2;
    color: #fff;
  }

</style>
