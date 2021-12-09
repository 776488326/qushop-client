<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">家用电器</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="nav in floor.navList" :key="nav.text">
              <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floor.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
            </div>
            <div class="floorBanner">
              <slideLoop :list="floor.carouselList" class="slide"></slideLoop>
            </div>
            <div class="split">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <img :src="floor.bigImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["floor"], //声明接收属性，而不是属性值
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 30px;
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      background-color: rgba(200,200,200,.3);
      border: 1px solid #ccc;
      border-radius: 10px 10px 0px 0px;
      padding: 10px;
      height: 50px;
      box-sizing: border-box;
      .fl {
        float: left;
        font-size: 20px;
        line-height: 30px;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #777;
              }
            }
          }
        }
      }
    }

    .tab-content {
      .tab-pane {
        .floor-1 {
        flex: 1;
          height: 400px;
          display: flex;

          .blockgary {
          flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #f7f7f7;
            border-right: 1px solid #ccc;
            .jd-list {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              li {
                box-shadow: inset 0px 0px 2px 2px rgba(200,200,200,.3);
                display: flex;
                justify-content: center;
                align-items: center;
                list-style-type: none;
                float: left;
                width: 50%;
                text-align: center;
                &:hover{
                  box-shadow: inset 0px 0px 0px 0px;
                }
              }
            }
          }

          .floorBanner {
            flex: 1;
            .slide{
              width: 330px;
              height: 100%;
            }
          }

          .split {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ccc;
            background-color: #fff;
            img{
                height: 80%;
            }
            &:hover {
                box-shadow: inset 0 0 30px 5px rgba(0, 0, 0, 0.06);
            }
          }
        }
      }
    }
  }
}
</style>