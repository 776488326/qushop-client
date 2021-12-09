<template>
  <!-- 猜你喜欢 -->
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">猜你喜欢</h3>
        <a href="javascript:;" class="fr">换一换</a>
      </div>
      <div class="bd">
        <ul class="favourate">
          <li>
            <div class="image"><img src="./images/like_02.png" alt="" /></div>
            <div class="like-text">
              <p>不锈钢锅 不粘锅 平底锅</p>
              <p>厨具创造生活</p>
              <h3>¥116.00</h3>
            </div>
          </li>
          <li>
            <div class="image"><img src="./images/like_03.png" alt="" /></div>
            <div class="like-text">
              <p>遮阳伞 雨伞 便携伞</p>
              <p>雨具遮风挡雨</p>
              <h3>¥116.00</h3>
            </div>
          </li>
          <li>
            <div class="image"><img src="./images/like_01.png" alt="" /></div>
            <div class="like-text">
              <p>阳光美包新款单肩包</p>
              <p>背包带来美好</p>
              <h3>¥116.00</h3>
            </div>
          </li>
          <li>
            <div class="image"><img src="./images/like_04.png" alt="" /></div>
            <div class="like-text">
              <p>AirPorts 音乐耳机</p>
              <p>音乐舞动世界</p>
              <h3>¥116.00</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Like",
};
</script>

<style lang="less" scoped>
.like {
  margin-top: 30px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      background-color: rgba(200,200,200,.3);
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px 10px 0px 0px;
      overflow: hidden;
      padding: 10px 10px;
      height: 50px;
      border: 1px solid #ccc;
      line-height: 30px;
      .fl {
        float: left;
        font-size: 20px;
      }
      .fr {
        font-size: 16px;
        float: right;
        text-decoration: none;
        &:hover {
          color: #000 !important;
          transform: scale(1.1);
        }
      }
    }

    .bd {
    width: 100%;
        display: flex;

      .favourate {
        overflow: hidden;
        flex: 1;
        box-sizing: border-box;
        display: flex;

        li {
          box-sizing: border-box;
          height: 400px;
          overflow: hidden;
          background: #fff;
          position: relative;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          border-right: 1px solid #e4e4e4;
          .image {
            box-sizing: border-box;
            padding: 50px;
            img {
              width: 150px;
              height: 150px;
              transition: all 400ms;

              &:hover {
                opacity: 0.8;
                transform: scale(1.2);
              }
            }
          }

          .like-text {
            margin: 20px;
            width: 142px;
            text-align: center;
            p {
              margin: 10px 0;
              &:first-child {
                font-weight: bold;
                color: #000;
              }
              color: #aaa;
            }

            h3 {
              color: #df3033;
              font-size: 16px;
              line-height: 30px;
              margin: 30px 0;
              font-weight: 700;
            }
          }
          &:hover {
            box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.06);
          }
        }
      }
    }
  }
}
</style>