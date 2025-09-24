<script>
import {
  getDrawingProcess,
  getDrawingProcessByFigureNumber,
  getDrawingProcessByCardNumber,
  getFileByname
} from "@/apis/api";
import {getFileType} from "@/utils";
import { ElMessageBox } from 'element-plus';

export default ({
  name:"DrawingProcessPage",
  computed:{},
  setup(){},
  data(){
    return {
      DrawingProcess:{
        name: ''
      },
      //返回结果列表
      list:[],
      //选中的行数据
      selectRow: {
        name: '',
        type: '',
        location: '',
        figurenumber: '',
        cardnumber: ''
      }

    }
  },
  components: {},
  methods:{
    inqueryhandler(){
      if(this.DrawingProcess.name.length < 5){
        ElMessageBox.alert('输入图纸工艺名称太短，请重新输入！！！', '查询条件错误', {

        })
      }else{
        getDrawingProcess(this.DrawingProcess.name).then((resp) =>{
          if(resp.data.data.length === null || resp.data.data.length === 0){
            ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
          }else{
            this.list = resp.data.data
          }}
        )
      }
    },
    inquerybyfigurenumberhandler(){
      if(this.DrawingProcess.figurenumber.length < 5){
        ElMessageBox.alert('输入图纸工艺名称太短，请重新输入！！！', '查询条件错误', {
        })
      }else{
        this.list = null
        getDrawingProcessByFigureNumber(this.DrawingProcess.figurenumber).then((resp) =>{
          if(resp.data.data.length === null || resp.data.data.length === 0){
            ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
          }else{
            this.list = resp.data.data
          }}
        )
      }
    },
    inquerybycardnumberhandler(){
      if(this.DrawingProcess.cardnumber.length < 5){
        ElMessageBox.alert('输入图纸工艺名称太短，请重新输入！！！', '查询条件错误', {

        })
      }else{
        this.list = null
        getDrawingProcessByCardNumber(this.DrawingProcess.cardnumber).then((resp) =>{
          if(resp.data.data.length === null || resp.data.data.length === 0){
            ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
          }else{
            this.list = resp.data.data
          }}
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
  },
})
</script>

<template>
  <div class="App">
    <div class="app-layout">
      <el-container class="app-container1" style="height: 100vh">
        <el-header height="100px" style="font-size: 20px;background-color: lightskyblue;text-align: center;font-size: 70px;font-family: Helvetica;color: ivory ">
          图纸工艺
        </el-header>
        <el-container>
          <el-main class="app-main">
            <div class="app-queryparameters">
              <el-row>
                <el-form-item label="图纸工艺名称">
                  <el-col :span="24">
                    <el-input v-model="DrawingProcess.name" placeholder="请输入图纸工艺名称" @keyup.enter="inqueryhandler"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button color="#599E5E" style="margin-left: 50px;margin-right: 50px" @click="inqueryhandler">
                    搜索结果
                  </el-button>
                </el-form-item >
                <el-form-item>
                  <el-col :span="24">
                    <el-input v-model="DrawingProcess.figurenumber" placeholder="请输入产品图号" @keyup.enter="inquerybyfigurenumberhandler"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button color="#599E5E" style="margin-left: 50px;margin-right: 50px" @click="inquerybyfigurenumberhandler">
                    图号搜索
                  </el-button>
                </el-form-item >
                <el-form-item>
                  <el-col :span="24">
                    <el-input v-model="DrawingProcess.cardnumber" placeholder="请扫描工单号" @keyup.enter="inquerybycardnumberhandler"></el-input>
                  </el-col>
                </el-form-item>

              </el-row>

            </div>
            <div class="app-queryresult">
              <el-table :data = "list" empty-text="暂无数据" border height="100%" id="inqueryresults"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{padding:'20px 0'}"
                        :cell-class-name="tableRowClassName"
                        style="width: 100%"
                        @row-dblclick="showCheck(scope.row,'Details')">
                <el-table-column prop="name" label="图纸工艺名称" style="width: 25%"   >
                </el-table-column>
                <el-table-column prop="type" label="文件类型"  style="width: 25%">
                </el-table-column>
                <el-table-column prop="location" label="文件地址" style="width: 25%">
                </el-table-column>
                <el-table-column label="操作" style="width: 25%">
                  <template #default="scope">
                    <el-button type="text" size="small" @click="showCheck(scope.row,'Details')">查看</el-button>
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
