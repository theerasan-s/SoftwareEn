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
      <v-card>
        <v-simple-table class="test">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  โครงการ / กิจกรรมย่อย
                </th>
                <th class="text-center" style="width:1%">ประเด็นยุทธศาสตร์</th>
                <th class="text-center" style="width:1%;">ยุทธศาสตร์</th>
                <th class="text-center" style="width:1%;">กลยุทธ์</th>
                <th class="text-center" style="width:1%;">ตัวชี้วัด</th>
                <th class="text-center" style="width:1%;">ค่าเป้าหมาย</th>
                <th class="text-center" style="width:1%;">ผู้รับผิดชอบ</th>
                <th class="text-center" style="width:1%;">งบประมาณ(ตามแผน)</th>
                <th class="text-center" style="width:1%;">โอนออก</th>
                <th class="text-center" style="width:1%;">โอนเข้า</th>
                <th class="text-center" style="width:1%;">คงเหลือ(ตามแผน)</th>
                <th class="text-center" style="width:1%;">ขออนุมัติใช้</th>
                <th class="text-center" style="width:1%;">เบิกจ่าย</th>
                <th class="text-center" style="width:1%;">คงเหลือจากหลักการ</th>
                <th class="text-center" style="width:1%;">
                  คงเหลือจากเบิกจ่ายจริง
                </th>
                <th class="text-center" style="width:1%;">หมายเหตุ</th>
                <th class="text-center" style="width:1%;">ผลการดำเนินงาน</th>
                <th class="text-center" style="width:1%;">
                  รายละเอียดผลการดำเนินงาน
                </th>
                <th class="text-center" style="width:1%;">ปัญหาอุปสรรค</th>
                <th class="text-center" style="width:1%;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in miniproject" :key="item.name" @click="detail=true">
                <td class="test" style="width:11%;">{{ item.name }}</td>
                <!-- Show miniproject's name -->
                <td class="test" style="width:1%; text-align: center;">
                  {{ item.strategicIssue }}
                </td>
                <!-- show miniproject's budget -->
                <td class="test" style="width:1%;">{{ item.stategic }}</td>
                <td class="test" style="width:1%;">{{ item.tactic }}</td>
                <td class="test" style="width:1%;">{{ item.measure }}</td>
                <td class="test" style="width:1%;">{{ item.targetPoint }}</td>
                <td class="test" style="width:1%;">{{ item.responsible }}</td>
                <td class="test" style="width:1%;">{{ item.budgetPlan }} บาท</td>
                <td class="test" style="width:1%;">{{ item.transfer }}บาท</td>
                <td class="test" style="width:1%;">{{ item.deposit }}บาท</td>
                <td class="test" style="width:1%;">{{ item.remainPlan }}บาท</td>
                <td class="test" style="width:1%;">{{ item.approval }}บาท</td>
                <td class="test" style="width:1%;">{{ item.expense }}</td>
                <td class="test" style="width:1%;">
                  {{ item.remainApproval }}
                </td>
                <td class="test" style="width:1%;">{{ item.remainExpense }}</td>
                <td class="test" style="width:1%;">{{ item.comment }}</td>
                <td class="test" style="width:1%;">{{ item.result }}</td>
                <td class="test" style="width:1%;">{{ item.resultDetail }}</td>
                <td class="test" style="width:1%;">{{ item.obstacle }}</td>
                <td><Edit></Edit></td>
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
    listofProject: [] //[{}]
  }),
  methods: {
    async loadData() {
      const ref = firebase.database().ref("department");
      const data = await ref.once("value");
      const projectData = data.val();
      for (let i in projectData) {
        // {department:coe,project}
        const miniData = { department: i, year: {} };
        for (let j in projectData[i].year) {
          const project = [];
          for (let k in projectData[i].year[j].mainProject) {
            //projectData['coe'].year[2563]
            let mainProject = {
              name: projectData[i].year[j].mainProject[k].project,
              budget: projectData[i].year[j].mainProject[k].budgetPlan,
              measure: projectData[i].year[j].mainProject[k].measure,
              strategicIssue: projectData[i].year[j].mainProject[k].strategicIssue,
              stategic: projectData[i].year[j].mainProject[k].stategic,
              tactic: projectData[i].year[j].mainProject[k].tactic,
              targetPoint: projectData[i].year[j].mainProject[k].targetPoint,
              responsible: projectData[i].year[j].mainProject[k].responsible,
              budgetPlan: projectData[i].year[j].mainProject[k].budgetPlan,
              transfer: projectData[i].year[j].mainProject[k].transfer,
              deposit: projectData[i].year[j].mainProject[k].deposit,
              remainPlan: projectData[i].year[j].mainProject[k].remainPlan,
              approval: projectData[i].year[j].mainProject[k].approval,
              expense: projectData[i].year[j].mainProject[k].expense,
              remainApproval: projectData[i].year[j].mainProject[k].remainApproval,
              remainExpense: projectData[i].year[j].mainProject[k].remainExpense,
              comment: projectData[i].year[j].mainProject[k].comment,
              result: projectData[i].year[j].mainProject[k].result,
              resultDetail: projectData[i].year[j].mainProject[k].resultDetail,
              obstacle: projectData[i].year[j].mainProject[k].obstacle
            };
            this.miniproject.push(mainProject);
            project.push(projectData[i].year[j].mainProject[k]);
          }
          miniData.year[j] = project;
        }
        this.departmentData.push(miniData);
      }
      console.log(this.departmentData);
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
      console.log(mainProject);
      this.miniproject = [];
      for (let i in mainProject.subProject) {
        let subProject = {
          name: mainProject.subProject[i].project,
          budget: mainProject.subProject[i].budgetPlan,
          measure: mainProject.subProject[i].measure,
          strategicIssue: mainProject.subProject[i].strategicIssue,
          stategic: mainProject.subProject[i].stategic,
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
td.test {
  text-align: left;
}
.test th {
  width: 500px;
}
</style>
