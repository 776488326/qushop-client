<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div class="tab">
      <div class="tab-tit">
        <a href="javascript:;" class="hot">
          <p class="text">热门推荐</p>
        </a>
        <a href="javascript:;" class="change">
          <p class="text">换一换</p>
        </a>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="./images/iphone3.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">Apple iPhone 8 Plus 256GB 银色</a>
                <p>【官网价直降1100】</p>
              </div>
              <p class="info-price">定金：¥100.00</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="./images/iphone1.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">Apple iPhone 8 Plus 256GB 银色</a>
                <p>【官网价直降1100】</p>
              </div>
              <p class="info-price">定金：¥100.00</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="./images/iphone2.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">Apple iPhone 8 Plus 256GB 银色</a>
                <p>【官网价直降1100】</p>
              </div>
              <p class="info-price">定金：¥100.00</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="./images/iphone.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">Apple iPhone 8 Plus 256GB 银色</a>
                <p>【官网价直降1100】</p>
              </div>
              <p class="info-price">定金：¥100.00</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",
};
</script>

<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 30px auto 0px;

  .tab {
    width: 100%;
    display: flex;
    flex-direction: column;
    .tab-tit {
      position: relative;
      background-color: rgba(200,200,200,.3);
      display: flex;
      justify-content: start;
      height: 50px;
      line-height: 30px;
      padding: 10px;
      border-radius: 10px 10px 0px 0px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      a {
        display: block;
        padding: 0 20px;
        float: left;
        text-decoration: none;
        font-size: 20px;
      }

      .hot {
        font-weight: bold;
        margin-left: -20px;
        color: #000;
      }
      .change{
        color: #666;
        position: absolute;
        right: -10px;
        font-size: 14px;
        &:hover {
          color: #000 !important;
          transform: scale(1.1);
        }
      }
    }
  }

  .content {
    display: flex;
    width: 100%;
    ul {
      flex: 1;
      li {
        flex: 1;
        display: flex;
        .img-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 400px;
          border-right: 1px solid #ccc;
          background: #fff;

          .tab-pic {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            padding: 25px;
            a {
                display: inline-block;
                width: 200px;
                height: 200px;
                text-align: center;
              img {
                height: 100%;
              }
            }
          }

          .tab-info {
            .info-title {
              text-align: center;
              margin: 20px;
              a {
                text-decoration: none;
                font-weight: bold;

                color: #000;
              }
              p {
                color: #aaa;
                margin: 10px 0;
              }
            }

            .info-price {
              text-align: center;
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