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
        <v-col cols="12" md="2" class="mt-9">
          <v-btn color="success" @click="selectChoice = true"
            >เพิ่มโครงการ</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container style="max-width: 1650px;">
      <v-btn style="margin-left: 85%;" color="#C8E6C9" @click="onExport"
        >Export<v-icon right dark>mdi-cloud-upload</v-icon></v-btn
      >
      <h2 class="mb-2">ข้อมูลโครงการใหญ่</h2>
      <v-card>
        <v-data-table :headers="headers" :items="displayMain"></v-data-table>
      </v-card>
    </v-container>

    <v-container style="max-width: 1650px;">
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
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.name }}
                </td>
                <!-- show miniproject's budget -->
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.responsible }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.budgetPlan }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.transfer }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.deposit }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.remainPlan }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.approval }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.expense }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.remainApproval }}
                </td>
                <td class="text-center" @click="setDetailCard(item, true)">
                  {{ item.remainExpense }}
                </td>
                <td class="text-center">
                  <v-icon right small @click="setDetailCard(item, false)"
                    >mdi-pencil</v-icon
                  >
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
                <v-btn x-large color="warning" @click="projectChoice(true)"
                  >โครงการหลัก</v-btn
                >
              </v-col>
              <v-col cols="12" md="4">
                <v-btn x-large color="success" @click="projectChoice(false)"
                  >โครงการย่อย</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="addProject" max-width="600px">
        <addProject />
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="edit" max-width="600px">
        <Edit />
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog justify="center" v-model="loading" max-width="400" persistent>
        <v-card>
          <v-card-title class="headline">รอสักครู่</v-card-title>
          <div
            class="text-center"
            style="padding-top: 25px; padding-bottom: 50px;"
          >
            <v-progress-circular
              indeterminate
              color="green"
            ></v-progress-circular>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import XLSX from "xlsx"; // import xlsx
import Edit from "./Edit";
import firebase from "firebase";
import navbar from "./navbar";
import detailCard from "./viewDetail";
import addProject from "./Addproject";
import { mapGetters } from "vuex";
export default {
  name: "budgetInfo",
  components: { Edit, navbar, detailCard, addProject },
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
        text: "งบประมาณ(ตามแผน)",
        align: "center",
        value: "budgetPlan",
      },
      {
        text: "โอนออก",
        align: "center",
        value: "transfer",
      },
      {
        text: "โอนเข้า",
        align: "center",
        value: "deposit",
      },
      {
        text: "คงเหลือ(ตามแผน)",
        align: "center",
        value: "remainPlan",
      },
      {
        text: "ขออนุมัติใช้",
        align: "center",
        value: "approval",
      },
      {
        text: "เบิกจ่าย",
        align: "center",
        value: "expense",
      },
      {
        text: "คงเหลือจากหลักการ",
        align: "center",
        value: "remainApproval",
      },
      {
        text: "คงเหลือจากเบิกจ่ายจริง",
        align: "center",
        value: "remainExpense",
      },
    ],
    json: [
      {
        โครงการหรือกิจกรรมย่อย: "approval",
        ผู้รับผิดชอบ:
          "คณะกรรมการบริหารหลักสูตรปรัชญาดุษฎีบัณฑิต และหลักสูตรวิศวกรรมศาสตรมหาบัณฑิต ",
        งบประมาณตามแผน: "380000",
        โอนออก: "0",
        โอนเข้า: "0",
        คงเหลือตามแผน: "380000",
        ขออนุมัติใช้: "20000",
        เบิกจ่าย: "0",
        คงเหลือจากหลักการ: "360000",
      },
      {
        โครงการหรือกิจกรรมย่อย: "ด้านการวิจัย",
        ผู้รับผิดชอบ:
          "คณะกรรมการบริหารหลักสูตรปรัชญาดุษฎีบัณฑิต และหลักสูตรวิศวกรรมศาสตรมหาบัณฑิต ",
        งบประมาณตามแผน: "380000",
        โอนออก: "0",
        โอนเข้า: "0",
        คงเหลือตามแผน: "380000",
        ขออนุมัติใช้: "20000",
        เบิกจ่าย: "0",
        คงเหลือจากหลักการ: "360000",
      },
    ],
    displayMain: [],
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
      "วิศวกรรมคอมพิวเตอร์",
    ],
    miniproject: [] /* 2 variable: name,budget [name:,budget:}]*/ /* All miniproject in main project */,
    selectDepartment: "",
    projectYear: [],
    selectYear: null,
    selectProject:null,
    projectList: [],
    listofProject: [], //[{}]
    mainName: "",
  }),
  methods: {
    editProject(item) {
      this.$store.commit({
        type: "setDetail",
        mainProject: this.mainName,
        project: this,
      });
    },
    onExport() {
      const dataWS = XLSX.utils.json_to_sheet(this.testExportProject);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, dataWS);
      XLSX.writeFile(wb, "รายละเอียดโครงการ.xlsx"  );
    },
    async loadData() {
      const ref = firebase.database().ref("department");
      const data = await ref.once("value");
      const projectData = data.val();
      for (let i in projectData) {
        // {department:coe,project}
        const mainData = { department: i, year: {} };
        for (let j in projectData[i].year) {
          const project = []; // mainProject data
          for (let k in projectData[i].year[j].mainProject) {
            //projectData['coe'].year[2563]
            //console.log(projectData[i].year[j].mainProject[k])
            let dbProject = projectData[i].year[j].mainProject[k];
            let mainProject = {
              project: dbProject.project,
              strategicIssue: dbProject.strategicIssue,
              strategic: dbProject.stategic,
              tactic: dbProject.tactic,
              measure: dbProject.measure,
              targetPoint: dbProject.targetPoint,
              responsible: dbProject.responsible,
              budgetPlan: dbProject.budgetPlan,
              transfer: dbProject.transfer,
              deposit: dbProject.deposit,
              remainPlan: dbProject.remainPlan,
              approval: dbProject.approval,
              expense: dbProject.expense,
              remainApproval: dbProject.remainApproval,
              remainExpense: dbProject.remainExpense,
              comment: dbProject.comment,
              result: dbProject.result,
              resultDetail: dbProject.resultDetail,
              obstacle: dbProject.obstacle,
              subProject: dbProject.subProject,
              key: k,
            };
            project.push(mainProject);
          }

          mainData.year[j] = project;
          //console.log(miniData)
        }
        this.departmentData.push(mainData);
      }
      await this.$store.commit({
        type: "setProjectData",
        projectData: this.departmentData,
      });
      //console.log(this.departmentData)
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

    loadSubProject(selectedProject) {
      console.log(selectedProject);
      const mainProject = this.listofProject.find(
        ({ project }) => project == selectedProject
      );
      console.log(mainProject);
      this.key = mainProject.key;
      //display mainProject Data in data-table

      this.mainName = mainProject.project;
      console.log(mainProject.budgetPlan);
      this.displayMain = [
        {
          projectName: mainProject.project,
          responsible: mainProject.responsible,
          budgetPlan: mainProject.budgetPlan,
          transfer: mainProject.transfer,
          deposit: mainProject.deposit,
          remainPlan: mainProject.remainPlan,
          approval: mainProject.approval,
          expense: mainProject.expense,
          remainApproval: mainProject.remainApproval,
          remainExpense: mainProject.remainExpense,
        },
      ];

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
        this.miniproject.push(subProject);
      }

      //export to excel
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

    setDetailCard(item, decision) {
      this.$store.commit({
        type: "setDetail",
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
      });
      // decision: true = detailCard,false:edit
      if (decision) {
        this.detail = true;
      } else {
        this.edit = true;
      }
    },
    projectChoice(decision) {
      this.addProject = true;
      if (decision) {
        this.$store.commit({
          type: "setAddProjectChoice",
          choice: true,
        });
      } else {
        this.$store.commit({
          type: "setAddProjectChoice",
          choice: false,
        });
      }
    },
  },

  computed: {
    ...mapGetters({
      loading: "getLoading",
    }),
  },

  async created() {
    const vm = this;
    await this.loadData();
    firebase
      .database()
      .ref("department")
      .on("value", function () {
        vm.loadData;
      });
  },
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
