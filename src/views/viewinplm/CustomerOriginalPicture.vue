<script>
import {getCustomerOringinalPicture,getFileByname} from "@/apis/api"
import {getFileType} from "@/utils";
import { ElMessageBox } from 'element-plus';
import request from '@/utils/request'

export default ({
  name:"CustomerOriginalPicture",
  computed:{},
  setup(){},
  data(){
    return {
      CustomerOriginalPicture:{
        name: '',
      },
      //返回的结果列表
      list:[],
      //选中的行数据
      selectRow: {
        name: '',
        type: '',
        location: ''
      }

    }
  },
  components: {},
  methods:{
    inqueryhandler(){
      if(this.CustomerOriginalPicture.name.length < 5){
        ElMessageBox.alert('输入客户原图名称太短，请重新输入！！！', '查询条件错误')
      }else{
        this.list = null
        getCustomerOringinalPicture(this.CustomerOriginalPicture.name).then((resp) =>{
              console.log(resp.data.data)
              if(resp.data.data.length === null || resp.data.data.length === 0){
                ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
              }else{
                this.list = resp.data.data
              }
            }
        )
      }
    },
    showCheck(row){
      const filetype = getFileType(row.location)
      if(filetype === "pdf" || filetype === "PDF" || filetype === "jpg" || filetype === "png"){
        getFileByname(row.location.replaceAll("\\","/")).then(res => {
          const binaryData = [];
          binaryData.push(res.data);
          //获取blob链接
          let pdfUrl = window.URL.createObjectURL(
              new Blob(binaryData, { type: "application/" + filetype })
          );
          window.open(pdfUrl,"_blank","menubar=no","")
        })
      }else{
        getFileByname(row.location.replaceAll("\\","/")).then(res =>{
          let blob = new Blob([res.data],{type:"application/octet-stream;"})
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          //拆分图片地址保留文件名称及格式
          link.setAttribute('download',"download." + filetype);
          document.body.appendChild(link);
          link.click();
        })
      }

    },
    getFile(){
      return request({
        url: "/CustomerOriginalPicture/getbyname?remoteFilePath=smb://192.168.1.32/filedata/OPTF/5/01_000E37A0-7D47-11EF-85BF-005056B3E4CA4957_P.pdf",
        method: 'get',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        responseType: 'blob',
      })
    },
    download(){
      this.getFile().then(res =>{
        let blob = new Blob([res.data],{type:"application/octet-stream;"})
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        //拆分图片地址保留文件名称及格式
        link.setAttribute('download',"01_000E37A0-7D47-11EF-85BF-005056B3E4CA4957_P.pdf");
        document.body.appendChild(link);
        link.click();
      })
    }

  },
})
</script>

<template>
  <div class="App">
    <div class="app-layout">
      <el-container class="app-container1" style="height: 100vh">
        <el-header height="100px" style="font-size: 20px;background-color: lightskyblue;text-align: center;font-size: 70px;font-family: Helvetica;color: ivory ">
          客户原图
        </el-header>
        <el-container>
          <el-main class="app-main">
            <div class="app-queryparameters">
              <el-row>
                <el-form-item label="客户原图名称">
                  <el-col :span="24">
                    <el-input v-model="CustomerOriginalPicture.name" placeholder="请输入客户原图名称" @keyup.enter="inqueryhandler"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button color="#599E5E" style="margin-left: 50px;margin-right: 50px" @click="inqueryhandler">
                    搜索结果
                  </el-button>
                </el-form-item >
              </el-row>

            </div>
            <div class="app-queryresult">
              <el-table :data = "list" empty-text="暂无数据" border height="100%" id="inqueryresults"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{padding:'20px 0'}"
                        :cell-class-name="tableRowClassName"
                        style="width: 100%">
                <el-table-column prop="name" label="客户原图名称" style="width: 25%"   >
                </el-table-column>
                <el-table-column prop="type" label="文件类型"  style="width: 25%">
                </el-table-column>
                <el-table-column prop="location" label="文件地址" style="width: 25%">
                </el-table-column>
                <el-table-column label="操作" style="width: 25%">
                  <template #default="scope">
                    <el-button type="text" size="large" @click="showCheck(scope.row,'Details')">查看</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>

</style>
