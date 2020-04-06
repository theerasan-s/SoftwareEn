<template>
  <v-app>
    <navbar></navbar>
    <v-container class="ml-5">
      <v-row>
        <v-col cols="12" md="3">
          <label for="department" class="mr-5">สาขาวิชา :</label>
          <v-select
            v-model="selectDepartment"
            :items="departmentselect"
            @change="departmentSelector()"
            menu-props="auto"
            label="สาขาวิชา"
            hide-details
            single-line
          ></v-select>
          <!-- Select Department -->
        </v-col>
        <v-col cols="12" md="3">
          <label for="year" class="mr-5">ปีการศึกษา :</label>
          <v-select
            v-model="selectYear"
            :items="projectYear"
            @change="yearSelector"
            menu-props="auto"
            label="ปีการศึกษา"
            hide-details
            single-line
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <label for="project" class="mr-5">โครงการ :</label>
          <v-select
            v-model="selectProject"
            :items="projectList"
            menu-props="auto"
            label="โครงการ"
            hide-details
            @change="loadSubProject"
            single-line
          ></v-select>
          <!-- Select main project -->
        </v-col>
        <v-col cols="12" md="2" class="mt-9" >
          <v-btn color="success" @click="displaySelectChoice" v-if="ready" :key="index">เพิ่มโครงการ</v-btn>
        </v-col>
      </v-row>
    </v-container>
    
    <v-container style="max-width: 1650px">
      <h2 class="mb-2">ข้อมูลโครงการใหญ่</h2>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="displayMain"
        ></v-data-table>
      </v-card>
    </v-container>
  
    <v-container style="max-width: 1650px">
      <h2 class="mb-2">ข้อมูลโครงการย่อย</h2>
      <v-card>
        <v-simple-table class="test">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  โครงการ / กิจกรรมย่อย
                </th>
                <th class="text-center">ผู้รับผิดชอบ</th>
                <th class="text-center">งบประมาณ(ตามแผน)</th>
                <th class="text-center">โอนออก</th>
                <th class="text-center">โอนเข้า</th>
                <th class="text-center">คงเหลือ(ตามแผน)</th>
                <th class="text-center">ขออนุมัติใช้</th>
                <th class="text-center">เบิกจ่าย</th>
                <th class="text-center">คงเหลือจากหลักการ</th>
                <th class="text-center">
                  คงเหลือจากเบิกจ่ายจริง
                </th>
                <th class="text-center" v-if="ready">แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in miniproject" :key="item.name">
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.name }}</td>
                <!-- show miniproject's budget -->
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.responsible }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.budgetPlan }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.transfer }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.deposit }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.remainPlan }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.approval }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">{{ item.expense }}</td>
                <td class="text-center" @click="setDetailCard(item,true)">
                  {{ item.remainApproval }}
                </td>
                <td class="text-center" @click="setDetailCard(item,true)">{{item.remainExpense }}</td>
                <td class="text-center" v-if="ready">
                  <v-icon right  small  @click="setDetailCard(item,false)">mdi-pencil</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    
    <v-dialog v-model="detail" max-width="450px">
      <v-row justify="center">
        <detailCard></detailCard>
      </v-row>
    </v-dialog>
    </v-container>

    <v-row justify="center">
      <v-dialog v-model="selectChoice" max-width="600px">
        <v-card>
          <v-container class="text-center">
            <h2>เลือกประเภทโครงการ</h2>
            <v-row justify="center">
              <v-col cols="12" md="4">
                <v-btn x-large color="warning" @click="projectChoice(true)">โครงการหลัก</v-btn>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn x-large color="success" @click="projectChoice(false)">โครงการย่อย</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="addProject" max-width="600px" persistent>
        <addProject :key="index"/>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="editProject" max-width="600px" persistent>
        <Edit :key="index"/>
      </v-dialog>
    </v-row>

    <v-row justify="center">
          <v-dialog justify="center" v-model="loading" max-width="400" persistent>
            <v-card>
              <v-card-title class="headline">รอสักครู่</v-card-title>
              <div class="text-center" style="padding-top: 25px; padding-bottom:50px; ">
                <v-progress-circular indeterminate color="green"></v-progress-circular>
              </div>
            </v-card>
          </v-dialog>
        </v-row>

      <v-row justify="center">
        <v-dialog v-model="transfering" max-width="600" persistent="">
          <v-card width="800">
            <v-row justify="center">
              <h2 class="mt-1">โอนย้ายงบประมาณ</h2>
            </v-row>
            <v-container class="mt-3">
            <v-row justify="center">
              <v-col cols="12" md="4" class="mt-2">
                <span>โครงการ: {{subProject}}</span>
              </v-col> 
              <v-col cols="12" md="2" class="mt-2">
                <span>ไปยัง</span>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                :items="allSubProjectName" 
                label="โครงการ" 
                dense
                outlined 
                required
                v-model="receiveProject"></v-select>
              </v-col>
              <v-col cols="10">
                <v-text-field label="จำนวนเงิน(บาท)" outlined dense required type="number" v-model="transferAmount"></v-text-field>
              </v-col>          
            </v-row>
            <v-row justify="center">
              <v-col cols="3">
                <v-btn color="error" @click="stopTransfering">ยกเลิก</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn color="success" @click="transferBudget">ยืนยัน</v-btn>
              </v-col>
            </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
  </v-app>
</template>

<script>
import XLSX from "xlsx"; // import xlsx
import Edit from "./Edit";
import firebase from "firebase"
import navbar from './navbar'
import detailCard from './viewDetail'
import addProject from './Addproject'
import { mapGetters } from 'vuex';
export default {
  name: "budgetInfo",
  components: { Edit , navbar , detailCard , addProject},
  data: () => ({
    edit: false,
    addProject: false,
    detail: false,
    selectChoice: false,
    headers: [
      {
        text: "โครงการ",
        align: "center",
        value: "projectName",
      },
      {
        text: "ผู้รับผิดชอบ",
        align: "center",
        value: "responsible",
      },
      {
        text:'โครงการ',
        align:'center',
        value:'projectName'
      },
      {
        text:'ผู้รับผิดชอบ',
        align:'center',
        value:'responsible'
        },
        {
          text:'งบประมาณ(ตามแผน)',
          align:'center',
          value: 'budgetPlan'
        },
        {
          text:'โอนออก',
          align:'center',
          value: 'transfer'
        },
        {
          text:'โอนเข้า',
          align:'center',
          value: 'deposit'
        },
        {
          text:'คงเหลือ(ตามแผน)',
          align:'center',
          value: 'remainPlan'
        },
        {
          text:'ขออนุมัติใช้',
          align:'center',
          value: 'approval'
        },
        {
          text:'เบิกจ่าย',
          align:'center',
          value: 'expense'
        },
        {
          text:'คงเหลือจากหลักการ',
          align:'center',
          value: 'remainApproval'
        },
        {
          text:'คงเหลือจากเบิกจ่ายจริง',
          align:'center',
          value: 'remainExpense'
        },
    ],
    displayMain:[],
    date: new Date().toISOString().substr(0, 7),
    allbudget: 10 /* All Budget variable*/,
    remainbudget: 20 /* Remain Budget variable*/,
    allproject: 30 /* All Project variable*/,
    completedproject: 40 /* Completed Project variable */,
    departmentData: [], //[{department:'coe',year:{2563:[{mainproject}]}}]
    mainpro: [],
    departmentselect:[],
    miniproject: [] /* 2 variable: name,budget [name:,budget:}]*/ /* All miniproject in main project */,
    selectDepartment: "",
    projectYear: [],
    selectYear: null,
    selectProject:null,
    projectList: [],
    listofProject: [], //[{}]
    mainName:'',
    budgetTransfering:false,
    allSubProjectName:[],
    allSubProject:[],
    updateDepartment:'',
    selectProject2:'',
    latestSearch:null,
    editData:'tee'
  }),
  methods: {
    displaySelectChoice(){
      this.index++
      this.selectChoice = true
    },
    editProject(item){
      this.$store.commit({
        type: 'setDetail',
        mainProject: this.mainName,
        project: this

      })

    },
     onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.testExportProject);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "รายละเอียดโครงการ.xlsx"  );
    },
    departmentSelector() {
      //console.log(this.selectDepartment)
      this.selectYear = undefined;
      this.selectProject = undefined;
      console.log('tmanranger')

      if (this.selectDepartment == "วิศวกรรมโยธา") {
        this.updateDepartment ="ce"
        this.loadYear("ce");
      } else if (this.selectDepartment == "วิศวกรรมไฟฟ้า") {
        this.updateDepartment ="ee"
        this.loadYear("ee");
      } else if (this.selectDepartment == "วิศวกรรมการเกษตร") {
        this.updateDepartment ="ae"
        this.loadYear("ae");
      } else if (this.selectDepartment == "วิศวกรรมอุตสาหการ") {
        this.updateDepartment ="ie"
        this.loadYear("ie");
      } else if (this.selectDepartment == "วิศวกรรมเครื่องกล") {
        this.updateDepartment ="me"
        this.loadYear("me");
      } else if (this.selectDepartment == "วิศวกรรมสิ่งแวดล้อม") {
        this.updateDepartment ="envi"
        this.loadYear("envi");
      } else if (this.selectDepartment == "วิศวกรรมคอมพิวเตอร์") {
        this.updateDepartment ="coe"
        this.loadYear("coe");
      } else if (this.selectDepartment == "วิศวกรรมเคมี") {
        this.updateDepartment ="chem"
        this.loadYear("chem");
      }
    },
    loadYear(selectDepartment) {
      console.log('year')
      const projectData = this.$store.state.projectData
      console.log(projectData)
      this.projectYear = [];
      //console.log(selectDepartment)
      let selectedDepartment = this.departmentData.find(
        ({ department }) => department == selectDepartment
      );
      //console.log(selectedDepartment)
      let departmentYear = [];
      for (let i in selectedDepartment.year) {
        departmentYear.push(i);
      }
      console.log(departmentYear);
      this.projectYear = departmentYear;
    },
    yearSelector() {
      if (this.selectDepartment == "วิศวกรรมโยธา") {
        this.loadProject("ce", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมไฟฟ้า")
        this.loadProject("ee", this.selectYear);
      else if (this.selectDepartment == "วิศวกรรมการเกษตร") {
        this.loadProject("ae", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมอุตสาหการ") {
        this.loadProject("ie", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมเครื่องกล") {
        this.loadProject("me", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมสิ่งแวดล้อม") {
        this.loadProject("envi", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมคอมพิวเตอร์") {
        this.loadProject("coe", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมเคมี") {
        this.loadProject("chem", this.selectYear);
      }
    },

    loadProject(selectDepartment, selectYear) {
      let departmentProject = this.departmentData.find(
        ({ department }) => department == selectDepartment
      );
      let allProject;
      this.projectList = [];
      for (let i in departmentProject.year) {
        if (i == selectYear) {
          console.log("yes");
          allProject = departmentProject.year[i];
          break;
        }
      }
      this.listofProject = allProject;
      for (let i in allProject) {
        this.projectList.push(allProject[i].project);
      }
    },

    loadSubProject() {
      //console.log(this.selectProject)
      const mainProject = this.listofProject.find(
        ({ project }) => (project == this.selectProject)
      );
      //for transfer budget
      this.allSubProjectName=[]
      this.allSubProject=[]
      for(let i in this.listofProject){
        console.log(this.listofProject[i])
        for(let j in this.listofProject[i].subProject){
          let subProjectT = {
          name:this.listofProject[i].subProject[j].project,
          //budget: mainProject.subProject[i].budgetPlan,
          measure: this.listofProject[i].subProject[j].measure,
          strategicIssue: this.listofProject[i].subProject[j].strategicIssue,
          strategic: this.listofProject[i].subProject[j].stategic,
          tactic: this.listofProject[i].subProject[j].tactic,
          targetPoint: this.listofProject[i].subProject[j].targetPoint,
          responsible: this.listofProject[i].subProject[j].responsible,
          budgetPlan: this.listofProject[i].subProject[j].budgetPlan,
          transfer: this.listofProject[i].subProject[j].transfer,
          deposit: this.listofProject[i].subProject[j].deposit,
          remainPlan: this.listofProject[i].subProject[j].remainPlan,
          approval: this.listofProject[i].subProject[j].approval,
          expense: this.listofProject[i].subProject[j].expense,
          remainApproval: this.listofProject[i].subProject[j].remainApproval,
          remainExpense:this.listofProject[i].subProject[j].remainExpense,
          comment:this.listofProject[i].subProject[j].comment,
          result: this.listofProject[i].subProject[j].result,
          resultDetail: this.listofProject[i].subProject[j].resultDetail,
          obstacle: this.listofProject[i].subProject[j].obstacle,
          subKey:j,
          mainKey:this.listofProject[i].key
        }
          this.allSubProjectName.push(subProjectT.name)
          this.allSubProject.push(subProjectT)
        }
      }
      console.log(this.allSubProject)
      //console.log(mainProject);
      this.mainKey = mainProject.key
      //display mainProject Data in data-table
      this.mainName = mainProject.project
      //console.log(mainProject.budgetPlan)
      this.displayMain = [{
        projectName: mainProject.project,
        responsible: mainProject.responsible,
        budgetPlan: mainProject.budgetPlan,
        transfer: mainProject.transfer,
        deposit: mainProject.deposit,
        remainPlan: mainProject.remainPlan,
        approval: mainProject.approval,
        expense: mainProject.expense,
        remainApproval: mainProject.remainApproval,
        remainExpense: mainProject.remainExpense
      }]
      //
      //this.allSubProject=[]
      this.miniproject = []
      for (let i in mainProject.subProject) {
        let subProject = {
          name: mainProject.subProject[i].project,
          //budget: mainProject.subProject[i].budgetPlan,
          measure: mainProject.subProject[i].measure,
          strategicIssue: mainProject.subProject[i].strategicIssue,
          strategic: mainProject.subProject[i].stategic,
          tactic: mainProject.subProject[i].tactic,
          targetPoint: mainProject.subProject[i].targetPoint,
          responsible: mainProject.subProject[i].responsible,
          budgetPlan: mainProject.subProject[i].budgetPlan,
          transfer: mainProject.subProject[i].transfer,
          deposit: mainProject.subProject[i].deposit,
          remainPlan: mainProject.subProject[i].remainPlan,
          approval: mainProject.subProject[i].approval,
          expense: mainProject.subProject[i].expense,
          remainApproval: mainProject.subProject[i].remainApproval,
          remainExpense: mainProject.subProject[i].remainExpense,
          comment: mainProject.subProject[i].comment,
          result: mainProject.subProject[i].result,
          resultDetail: mainProject.subProject[i].resultDetail,
          obstacle: mainProject.subProject[i].obstacle,
          key:i
        };
        //this.allSubProject.push(subProject.name)
        this.miniproject.push(subProject);
      }
       this.testExportProject = [];

      let test = {
        โครงการ: mainProject.project,
        //budget: mainProject.subProject[i].budgetPlan,
        ตัวชี้วัด: mainProject.measure,
        ประเด็นยุทธศาตร์: mainProject.strategicIssue,
        ยุทธศาตร์: mainProject.stategic,
        กลยุทธ์: mainProject.tactic,
        ค่าเป้าหมาย: mainProject.targetPoint,
        ผู้รับผิดชอบ: mainProject.responsible,
        งบประมาณตามแผน: mainProject.budgetPlan,
      };
      

      this.testExportProject.push(test);

      this.Miniproject2 = {};
      for (let i in mainProject.subProject) {
        let subProject = {
          โครงการ:"         "+mainProject.subProject[i].project ,
          //budget: mainProject.subProject[i].budgetPlan,
          ตัวชี้วัด: mainProject.subProject[i].measure,
          ประเด็นยุทธศาตร์: mainProject.subProject[i].strategicIssue,
          ยุทธศาตร์: mainProject.subProject[i].stategic,
          กลยุทธ์: mainProject.subProject[i].tactic,
          ค่าเป้าหมาย: mainProject.subProject[i].targetPoint,
          ผู้รับผิดชอบ: mainProject.subProject[i].responsible,
          งบประมาณตามแผน: mainProject.subProject[i].budgetPlan,
          โอนออก: mainProject.subProject[i].transfer,
          โอนเข้า: mainProject.subProject[i].deposit,
          คงเหลือตามแผน: mainProject.subProject[i].remainPlan,
          ขออนุมัติใช้: mainProject.subProject[i].approval,
          เบิกจ่าย: mainProject.subProject[i].expense,
          คงเหลือจากหลักการ: mainProject.subProject[i].remainApproval,
          คงเหลือจากเบิกจ่ายจริง: mainProject.subProject[i].remainExpense,
          หมายเหตุ: mainProject.subProject[i].comment,
          ผลการดำเนินงาน: mainProject.subProject[i].result,
          รายละเอียดผลการดำเนินงาน: mainProject.subProject[i].resultDetail,
          อุปสรรค: mainProject.subProject[i].obstacle,
        };
        this.testExportProject.push(subProject);
      }

    },
    setDetailCard(item,decision){
      //console.log('tee')
      this.$store.commit({
        type: 'setDetail',
        mainProject: this.mainName,
        project: item.name,
        budgetPlan: item.budgetPlan,
        measure: item.measure,
        strategicIssue: item.strategicIssue,
        strategic: item.strategic,
        tactic: item.tactic,
        targetPoint: item.targetPoint,
        responsible: item.responsible,
        transfer: item.transfer,
        deposit: item.deposit,
        remainPlan: item.remainPlan,
        approval: item.approval,
        expense: item.expense,
        remainApproval: item.remainApproval,
        remainExpense: item.remainExpense,
        comment: item.comment,
        result: item.result,
        resultDetail: item.resultDetail,
        obstacle: item.obstacle,
        year: this.selectYear,
        mainKey:this.mainKey,
        subKey: item.key
      })
      // decision: true = detailCard,false:edit
      if(decision){
        this.detail = true
      }
      else{
        console.log(item)
        this.index++
        this.$store.commit({
          type: 'setEditProject',
          editProject: true
        })
      }
      
    },
    projectChoice(decision){
      this.$store.commit({
        type:'setAddProject',
        addProject: true
      })
      this.index++
      
      if(decision){
        this.$store.commit({
          type:'setAddProjectChoice',
          choice: true
        })
      }
      else{
        this.$store.commit({
          type:'setAddProjectChoice',
          choice: false
        })
      }
    },
    stopTransfering(){
    this.$store.commit({
      type:'setTransfering',
      transfering:false
    })
    },
    async transferBudget(){
      //console.log(this.miniproject)
      const sender = this.allSubProject.find(({name}) => name == this.subProject)
      const receiver = this.allSubProject.find(({name}) => name == this.receiveProject)
      //console.log(sender)
      //console.log(receiver)
      const senderRef = firebase.database().ref('department/'+ this.currentDepartment 
      + '/year/' +this.selectYear + '/mainProject/' + sender.mainKey + '/subProject/' + sender.subKey)
      const recieverRef = firebase.database().ref('department/'+ this.currentDepartment 
      + '/year/' +this.selectYear + '/mainProject/' + receiver.mainKey + '/subProject/' + receiver.subKey)
      this.$store.commit({
        type:'setLoading',
        loading:true
      })
      await senderRef.update({
        transfer: parseInt(sender.transfer) + parseInt(this.transferAmount),
        remainPlan: parseInt(sender.remainPlan) -parseInt(this.transferAmount),
        remainApproval: parseInt(sender.remainPlan) - parseInt(this.transferAmount) - parseInt(sender.approval),
        remainExpense: parseInt(sender.remainPlan) - parseInt(this.transferAmount)- parseInt(sender.expense),

      })
      await recieverRef.update({
        deposit: parseInt(receiver.deposit) + parseInt(this.transferAmount),
        remainPlan:parseInt(receiver.remainPlan) + parseInt(this.transferAmount),
        remainApproval: parseInt(receiver.remainPlan) + parseInt(this.transferAmount) - parseInt(receiver.approval),
        remainExpense: parseInt(receiver.remainPlan) + parseInt(this.transferAmount)- parseInt(receiver.expense),

      })
      this.$store.commit({
        type:'setLoading',
        loading:false
      })
      this.stopTransfering()
       this.$store.commit({
        type:'setAddProject',
        addProject: false
      })
      this.$store.commit({
          type: 'setEditProject',
          editProject: false
        }) 
    },
    async loadUser(){
      const vm =this
    await firebase.auth().onAuthStateChanged(user => {
      if(user){
        firebase.database().ref('users').once('value')
        .then(snapshot => {
          const userData = snapshot.val()
          for(let i in userData){
            if(userData[i].uid == user.uid){
              if(userData[i].role == 'Keeper'){
                vm.ready = true
              }
            }
        }
        })
      }
    })
        
  }
  },
  
  computed:{
    ...mapGetters({
      loading: 'getLoading',
      transfering: 'getTransfering',
      subProject: 'getProject',
      addProject: 'getAddProject',
      editProject: 'getEditProject'
    })
  },
  

 mounted() {
    const vm = this
     firebase.database().ref('department').on('value', function(snapshot) {
      console.log('load')
      vm.departmentData=[]
      const projectData = snapshot.val()
      console.log(projectData)
      for(let i in projectData){
        // {department:coe,project} 
        const mainData = {department:i,year:{}}
        for(let j in projectData[i].year){
          const project = [] // mainProject data
          for(let k in projectData[i].year[j].mainProject){//projectData['coe'].year[2563]
              //console.log(projectData[i].year[j].mainProject[k])
              let dbProject = projectData[i].year[j].mainProject[k]
              var mainProject = {
                project: dbProject.project,
                strategicIssue: dbProject.strategicIssue,
                strategic: dbProject.stategic,
                tactic: dbProject.tactic,
                measure: dbProject.measure,
                targetPoint: dbProject.targetPoint,
                responsible: dbProject.responsible,
                budgetPlan: 0,
                transfer: 0,
                deposit: 0,
                remainPlan: 0,
                approval: 0,
                expense: 0,
                remainApproval: 0,
                remainExpense: 0,
                comment: dbProject.comment,
                result: dbProject.result,
                resultDetail: dbProject.resultDetail,
                obstacle: dbProject.obstacle,
                subProject: dbProject.subProject,
                key: k
              }
              
              for(let t in projectData[i].year[j].mainProject[k].subProject){
                //console.log('t')
                let subProject = projectData[i].year[j].mainProject[k].subProject[t]
                mainProject.budgetPlan += parseInt(subProject.budgetPlan)
                mainProject.transfer += parseInt(subProject.transfer)
                mainProject.deposit += parseInt(subProject.deposit)
                mainProject.remainPlan += parseInt(subProject.remainPlan)
                mainProject.approval += parseInt(subProject.approval)
                mainProject.expense += parseInt(subProject.expense)
                mainProject.remainApproval += parseInt(subProject.remainApproval)
                mainProject.remainExpense += parseInt(subProject.remainExpense)
              }
              //console.log(mainProject)
              project.push(mainProject)
            }
          mainData.year[j] = project
          //console.log(miniData)
      }
      vm.departmentData.push(mainData)
    }
    vm.$store.commit({
        type:'setProjectData',
        projectData: vm.departmentData
      })
     
        firebase.auth().onAuthStateChanged(user => {
      if(user){
        firebase.database().ref('users').once('value')
        .then(snapshot => {
          const userData = snapshot.val()
          for(let i in userData){
            if(userData[i].uid == user.uid){
              vm.$store.commit({
                type:'setCurrentUserData',
                currentUser: userData[i].firstname+' '+userData[i].lastname,
                currentDepartment: userData[i].depart,
                role: userData[i].role
              })
              if(userData[i].role == 'Keeper'){
                vm.departmentselect = []
                //console.log('role')
                //console.log(userData[i].depart)
                if(userData[i].depart == 'coe'){
                  vm.departmentselect.push("วิศวกรรมคอมพิวเตอร์")
                  vm.selectDepartment = "วิศวกรรมคอมพิวเตอร์"
                  }
                  else if(userData[i].depart == 'ae'){
                    vm.departmentselect.push("วิศวกรรมการเกษตร")
                    vm.selectDepartment = "วิศวกรรมการเกษตร"

                    }
                  else if(userData[i].depart == 'ee'){
                    vm.departmentselect.push("วิศวกรรมไฟฟ้า")
                    vm.selectDepartment = "วิศวกรรมไฟฟ้า"
                  }
                  else if(userData[i].depart == 'ce'){
                    vm.departmentselect.push("วิศวกรรมโยธา")
                    vm.selectDepartment = "วิศวกรรมโยธา"
                  }
                  else if(userData[i].depart =='me'){
                    vm.departmentselect.push("วิศวกรรมเครื่องกล")
                    vm.selectDepartment = "วิศวกรรมเครื่องกล"

                  }
                  else if(userData[i].depart == 'ie'){
                    vm.departmentselect.push("วิศวกรรมอุตสาหการ")
                    vm.selectDepartment = "วิศวกรรมอุตสาหการ"
                  }
                  else if(userData[i].depart =='envi'){
                    vm.departmentselect.push("วิศวกรรมสิ่งแวดล้อม")
                    vm.selectDepartment = "วิศวกรรมสิ่งแวดล้อม"
                  }
                  else if(userData[i].depart =='chem'){
                    vm.departmentselect.push("วิศวกรรมเคมี")
                    vm.selectDepartment = "วิศวกรรมเคมี"
                  }
              }
              else{
                vm.departmentselect = ["วิศวกรรมโยธา","วิศวกรรมไฟฟ้า","วิศวกรรมการเกษตร","วิศวกรรมอุตสาหการ","วิศวกรรมเครื่องกล","วิศวกรรมสิ่งแวดล้อม","วิศวกรรมเคมี","วิศวกรรมคอมพิวเตอร์"]
              }
              
              vm.currentUser = userData[i].firstname+' '+userData[i].lastname
              vm.currentDepartment = userData[i].depart
              vm.role = userData[i].role
              console.log(vm.currentDepartment)
              vm.loadYear(vm.currentDepartment)
              console.log('ttttttt')
              if(vm.role == 'Keeper'){
                console.log('i am keeper')
                vm.ready = true
              }
              if(vm.selectYear != null){
                vm.loadProject(vm.currentDepartment,vm.selectYear)
                if(vm.selectProject != null){
                  vm.loadSubProject()
                }
              }
              break
            }
          }
        }
        )
      }
    })
      })
  
  },

  created(){
    this.loadUser()
  }
  
}
</script>

<style>
.texta {
  font-size: 23px; /* Card's fontsize */
}
.cardt {
  background-color: #d3d3d3;
}

</style>
