<script>
import {
  getWorkInstruction,
  getWorkInstructionByCardNumber,
  getLableWorkInstructionByCardNumber,
  getFileByname
} from "@/apis/api";
import GlobalVariable from "@/module/GlobalVariables";
import { ElMessageBox } from 'element-plus';

export default ({
  name:"WorkInstructionPage",
  computed:{},
  setup(){},
  data(){
    return {
      WorkInstruction:{
        name: '',
        cardnumberforworkinstruction: '',
        cardnumberforlabelworkinstruction: ''
      },
      list:[],
      selectRow: {
        name: '',
        type: '',
        location: '',
        time: '',

      }

    }
  },
  components: {},
  methods:{
    inqueryhandler(){
      if(this.WorkInstruction.name.length < 5){
        ElMessageBox.alert('输入作业指导书名称太短，请重新输入！！！', '查询条件错误', {

        })
      }else{
        getWorkInstruction(this.WorkInstruction.name).then((resp) =>{
          if(resp.data.data.length === null || resp.data.data.length === 0){
            ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
          }else{
            this.list = resp.data.data
          }}
        )
      }

    },
    cardnumberforworkinstructioninqueryhandler(){
      if(this.WorkInstruction.cardnumberforworkinstruction.length < 5){
        ElMessageBox.alert('输入作业指导书名称太短，请重新输入！！！', '查询条件错误', {

        })
      }else{
        getWorkInstructionByCardNumber(this.WorkInstruction.cardnumberforworkinstruction).then((resp) =>{
          if(resp.data.data.length === null || resp.data.data.length === 0){
            ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
          }else{
            this.list = resp.data.data
          }}
        )
      }

    },
    cardnumberforlabrlworkinstructioninqueryhandler(){
      if(this.WorkInstruction.cardnumberforlabelworkinstruction.length < 5){
        ElMessageBox.alert('输入作业指导书名称太短，请重新输入！！！', '查询条件错误', {

        })
      }else{
        getLableWorkInstructionByCardNumber(this.WorkInstruction.cardnumberforlabelworkinstruction).then((resp) =>{
          if(resp.data.data.length === null || resp.data.data.length === 0){
            ElMessageBox.alert('所查图纸不存在或正在检出变更', '未找到图纸')
          }else{
            this.list = resp.data.data
          }}
        )
      }

    },
    showCheck(row){
      getFileByname(row.location.replaceAll("\\","/")).then(res => {
        const binaryData = [];
        binaryData.push(res.data);
        //获取blob链接
        let pdfUrl = window.URL.createObjectURL(
            new Blob(binaryData, { type: "application/pdf" })
        );
        window.open(pdfUrl,"_blank","menubar=no","")
      })

    },
  },
})
</script>

<template>
  <div class="App">
    <div class="app-layout">
      <el-container class="app-container1" style="height: 100vh">
        <el-header height="100px" style="font-size: 20px;background-color: lightskyblue;text-align: center;font-size: 70px;font-family: Helvetica;color: ivory ">
          作业指导书
        </el-header>
        <el-container>
          <el-main class="app-main">
            <div class="app-queryparameters">
              <el-row>
                <el-form-item label="作业指导书名称">
                  <el-col :span="24">
                    <el-input v-model="WorkInstruction.name" placeholder="请输入作业指导书名称" @keyup.enter="inqueryhandler"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button color="#599E5E" style="margin-left: 50px;margin-right: 50px" @click="inqueryhandler">
                    搜索结果
                  </el-button>
                </el-form-item >
                <!--隐藏下列组件-->
                <el-form-item v-show="false">
                  <el-col :span="24">
                    <el-input v-model="WorkInstruction.cardnumberforworkinstruction" placeholder="扫描工单查询作业指导书" @keyup.enter="cardnumberforworkinstructioninqueryhandler"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24" style="margin-left:20px">

                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-col :span="24">
                    <el-input v-model="WorkInstruction.cardnumberforlabelworkinstruction" placeholder="扫描工单查询标签作业指导书" @keyup.enter="cardnumberforlabrlworkinstructioninqueryhandler"></el-input>
                  </el-col>
                </el-form-item>
              </el-row>

            </div>
            <div class="app-queryresult">
              <el-table :data = "list" empty-text="暂无数据" border height="100%" id="inqueryresults"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{padding:'20px 0'}"
                        :cell-class-name="tableRowClassName"
                        style="width: 100%">
                <el-table-column prop="code" label="作业指导书代号" style="width: 25%"   >
                </el-table-column>
                <el-table-column prop="name" label="作业指导书名称"  style="width: 25%">
                </el-table-column>
                <el-table-column prop="plocation" label="地址" style="width: 25%">
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
