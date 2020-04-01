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
                <th class="text-center">แก้ไข</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in miniproject" :key="item.name" @click="setDetailCard(item)">
                <td class="text-center">{{ item.name }}</td>
                <!-- show miniproject's budget -->
                <td class="text-center">{{ item.responsible }}</td>
                <td class="text-center">{{ item.budgetPlan }}</td>
                <td class="text-center">{{ item.transfer }}</td>
                <td class="text-center">{{ item.deposit }}</td>
                <td class="text-center">{{ item.remainPlan }}</td>
                <td class="text-center">{{ item.approval }}</td>
                <td class="text-center">{{ item.expense }}</td>
                <td class="text-center">
                  {{ item.remainApproval }}
                </td>
                <td class="text-center">{{item.remainExpense }}</td>
                <td class="text-center"><Edit></Edit></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    
    <v-dialog v-model="detail" max-width="600">
      <v-row justify="center">
        <detailCard></detailCard>
      </v-row>
    </v-dialog>
    
    </v-container>

  
  </v-app>
</template>

<script>

import Edit from "./Edit";
import firebase from "firebase"
import navbar from './navbar'
import detailCard from './viewDetail'
export default {
  name: "budgetInfo",
  components: { Edit , navbar , detailCard},
  data: () => ({
    detail:false,
    headers:[
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
    departmentselect: [
      /* All Department variable */
      "วิศวกรรมโยธา",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมการเกษตร",
      "วิศวกรรมอุตสาหการ",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมสิ่งแวดล้อม",
      "วิศวกรรมเคมี",
      "วิศวกรรมคอมพิวเตอร์"
    ],
    miniproject: [] /* 2 variable: name,budget [name:,budget:}]*/ /* All miniproject in main project */,
    selectDepartment: "",
    projectYear: [],
    selectYear: "",
    selectProject: "",
    projectList: [],
    listofProject: [], //[{}]
    mainName:''
  }),
  methods: {
    async loadData(){
      const ref = firebase.database().ref('department')
      const data = await ref.once('value')
      const projectData = data.val()
      for(let i in projectData){
        // {department:coe,project} 
        const mainData = {department:i,year:{}}
        for(let j in projectData[i].year){
          const project = [] // mainProject data
          for(let k in projectData[i].year[j].mainProject){//projectData['coe'].year[2563]
              let mainProject = {
                name:projectData[i].year[j].mainProject[k].project,
                budget:projectData[i].year[j].mainProject[k].budgetPlan
                }
              project.push(projectData[i].year[j].mainProject[k])
            }
          mainData.year[j] = project
          //console.log(miniData)
      }
      this.departmentData.push(mainData)
    }
    console.log(this.departmentData)
    },
    departmentSelector() {
      //console.log(this.selectDepartment)
      this.selectYear = undefined;
      this.selectProject = undefined;

      if (this.selectDepartment == "วิศวกรรมโยธา") {
        this.loadYear("ce");
      } else if (this.selectDepartment == "วิศวกรรมไฟฟ้า") this.loadYear("ee");
      else if (this.selectDepartment == "วิศวกรรมการเกษตร") {
        this.loadYear("ae");
      } else if (this.selectDepartment == "วิศวกรรมอุตสาหการ") {
        this.loadYear("ie");
      } else if (this.selectDepartment == "วิศวกรรมเครื่องกล") {
        this.loadYear("me");
      } else if (this.selectDepartment == "วิศวกรรมสิ่งแวดล้อม") {
        this.loadYear("envi");
      } else if (this.selectDepartment == "วิศวกรรมคอมพิวเตอร์") {
        this.loadYear("coe");
      } else if (this.selectDepartment == "วิศวกรรมเคมี") {
        this.loadYear("chem");
      }
    },
    loadYear(selectDepartment) {
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

    loadSubProject(selectedProject) {
      const mainProject = this.listofProject.find(
        ({ project }) => (project = selectedProject)
      );
      //console.log(mainProject);
      //display mainProject Data in data-table
      this.mainName = mainProject.project
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
      this.miniproject = [];
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
          obstacle: mainProject.subProject[i].obstacle
        };
        this.miniproject.push(subProject);
      }
    },
    setDetailCard(item){
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
        obstacle: item.obstacle
      })
      this.detail = true
    }
  },
  async created() {
    await this.loadData();
  }
};
</script>

<style>
.texta {
  font-size: 23px; /* Card's fontsize */
}
.cardt {
  background-color: #d3d3d3;
}

</style>
