<template>
  <div class="order-main">
    <div class="container">
      <div class="message">
        <div class="left">
          <label for="avatar">头像</label>
          <label for="name">用户名</label>
          <label for="phone">手机号</label>
          <label for="email">邮箱地址</label>
        </div>
        <div class="right">
          <el-upload
            class="avatar-uploader"
            action="/client/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else :src="userInfo.avatar" class="avatar" />
          </el-upload>
          <input type="text" v-model="userInfo.username" id="name" />
          <input type="phone" v-model="userInfo.phone" id="phone" />
          <input type="email" v-model="userInfo.email" id="email" />
        </div>
      </div>
      <div class="addressList">
        <div class="left">
          <label for="address">收货地址</label>
          <el-button type="info" plain @click="submit" :loading="load">提交修改</el-button>
        </div>
        <div class="right">
          <el-button type="info" plain style="width:20%;margin:20px 0px;" @click="addAddress">添加地址</el-button>
          <el-table
            ref="addressTable"
            class="table"
            :data="addressList"
            empty-text="暂无收货地址"
            :header-cell-style="{background:'rgba(0,0,0,0.2)'}"
            :row-style="{background:'none'}"
          >
            <el-table-column type="index" > </el-table-column>
            <el-table-column  property="name" label="姓名" ></el-table-column>
            <el-table-column  property="phone" label="手机号" > </el-table-column>
            <el-table-column  property="address" label="地址"> </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button @click="editRow(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, addressList)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "Center",
  data() {
    return {
      imageUrl: "",
      userInfo: {
      },
      index:0,
      load:false,
      dialogFormVisible: false,
      form:{},
      addressList:[
        ]
    };
  },
  mounted() {
    this.userInfo = this.$store.state.user.userInfo;
    this.addressList = this.userInfo.addressList;
  },
  methods: {
    ...mapActions("user",["updateUserInfo"]),
    deleteRow(index,rows){
      rows.splice(index, 1);
    },
    editRow(index,row){
      this.dialogFormVisible = true;
      this.form = row;
      this.index = index;
    },
    update(){
      this.addressList[this.index] = this.form;
      this.dialogFormVisible = false;
    },
    submit(){
      this.load = true;
      this.userInfo.addressList = this.addressList;
      if(this.imageUrl!=''){
        this.userInfo.avatar = this.imageUrl;
      }
      this.updateUserInfo(this.userInfo).then((res)=>{
        if(res.code==200)
        {
          this.load = false;
          this.$message({"type":"success","message":"修改成功！"})
        }
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res,file);
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 和 PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addAddress(){
      this.addressList.push({});
    }
  },
};
</script>

<style lang="less" scoped>
.order-main {
  .container {
    margin: 0 auto;
    width: 1200px;
    .message {
      display: flex;
      align-items: stretch;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-right: 2px solid #aaa;
        margin-right: 100px;
      }
      .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        input {
          border: none;
          width: 50%;
          height: 50px;
          text-align: center;
          background: none;
          border-bottom: 1px solid #aaa;
          &:focus-visible {
            outline: none;
          }
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
        flex: 2;
      }
    }
    .addressList {
      margin-top: 50px;
      display: flex;
      align-items: stretch;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-right: 2px solid #aaa;
        margin-right: 100px;
      }
      .right {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        /deep/.table{
          background: none;
        }
      }
    }
    .submit {
      display: flex;
      align-items: stretch;
      .left {
        flex: 1;
        display: flex;
      }
      .right {
        flex: 2;
      }
    }
  }
}
</style>