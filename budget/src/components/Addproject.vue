<template>
  <v-row justify="center">
      <v-card> 
        <v-card-title>
          <span style="background-color:#ffdede;border-radius:0.1em" class="px-2 ml-5">เพิ่มโครงการ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select v-model.lazy="selectDepartment" :items="departments" label="เลือกสาขาวิชา / ฝ่าย*" outlined required @change="departmentSelector"></v-select>
              </v-col>
              <div v-if="addProjectChoice" style="width:100%">
                <v-col cols="12">
                  <v-combobox v-model="selectYear" :items="projectYear" label="ปีการศึกษา*" outlined required type="number" @change="yearSelector"></v-combobox>
              </v-col>
                <v-col cols="12">
                  <v-text-field
                  label="ชื่อโครงการหลัก"
                  outlined
                  full-width
                  required
                  v-model="mainProject"></v-text-field>
                </v-col>
              </div>
              <div v-else style="width:100%">
                <v-col cols="12">
                  <v-select v-model="selectYear" :items="projectYear" label="ปีการศึกษา*" outlined required @change="yearSelector"></v-select>
              </v-col>
                <v-col cols="12">
                  <v-select v-model="selectProject" :items="projectList" label="เลือกโครงการหลัก*" outlined required></v-select>
                </v-col>
                <v-col cols="12">
                <v-text-field label="ชื่อโครงการย่อย" outlined dense required v-model="subProject"></v-text-field>
              </v-col>
              </div>
              <v-col cols="12">
                <v-text-field label="ประเด็นยุทธศาสตร์" outlined dense required type ="number" v-model="strategicIssue"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ยุทธศาสตร์" outlined dense required type="number" v-model="strategic"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="กลยุทธ์" outlined dense required type="number" v-model="tactic"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ตัวชี้วัด" outlined dense required v-model="measure"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ค่าเป้าหมาย" outlined dense required v-model="targetPoint"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="ผู้รับผิดชอบ" outlined dense required v-model="responsible"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="งบประมาณ(บาท)" outlined dense required type="number" v-model="budgetPlan"></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field label="หมายเหตุ" outlined dense  v-model="comment"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" class="mr-4" @click="startAddProject">ตกลง</v-btn>
          <v-btn color="error" @click="dialog = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>

  </v-row>
</template>



<style>
  .myFont{
    font-family: "Prompt", sans-serif;
  }
</style>


<script>
import firebase from "firebase"
import { mapGetters } from 'vuex';
export default {
  name: "Addproject",

  data() {
    return {
      comment:'',
      mainProject:'',
      listofProject: [],
      projectYear: [],
      projectList: [],
      selectYear: "",
      selectProject: "",
      selectDepartment:null,
      selectedMain :null,
      mainProjects:[],
      departments:["วิศวกรรมโยธา",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมการเกษตร",
      "วิศวกรรมอุตสาหการ",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมสิ่งแวดล้อม",
      "วิศวกรรมเคมี",
      "วิศวกรรมคอมพิวเตอร์"],
      dialog: false,
      ชื่อโครงการย่อย: "",
      subProject:"",
      strategicIssue:"",
      strategic: "",
      tactic: "",
      measure: "",
      targetPoint: "",
      responsible: "",
      budgetPlan: "",
      remainPlan: "",
      year:"",
    };
  },
  methods: {
    submit: function() {
      var newPostRef = firebase.database().ref('department/ce/year/2563/mainProject/'+this.selectedMain+'/subProject').push();
        newPostRef.set({
     project:this.project,
    strategicIssue: parseInt(this.strategicIssue),
    strategic: parseInt(this.strategic),
    tactic: parseInt(this.tactic),
    measure: this.measure,
    targetPoint: this.targetPoint,
    responsible: this.responsible,
    budgetPlan: parseInt(this.budgetPlan),
    remainPlan: parseInt(this.budgetPlan),           
    });
          alert('เพิ่มโครงการย่อย (โครงการหลัก:'+ this.selectedMain+')');
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
    },loadYear(selectDepartment) {
      this.projectYear = [];
      //console.log(selectDepartment)
      let selectedDepartment = this.projectData.find(
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
      let departmentProject = this.projectData.find(
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
    startAddProject(){
      console.log('startAddProject')
      if (this.selectDepartment == "วิศวกรรมโยธา") {
        this.addProject("ce", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมไฟฟ้า")
        this.addProject("ee", this.selectYear);
      else if (this.selectDepartment == "วิศวกรรมการเกษตร") {
        this.addProject("ae", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมอุตสาหการ") {
        this.addProject("ie", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมเครื่องกล") {
        this.addProject("me", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมสิ่งแวดล้อม") {
        this.addProject("envi", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมคอมพิวเตอร์") {
        this.addProject("coe", this.selectYear);
      } else if (this.selectDepartment == "วิศวกรรมเคมี") {
        this.addProject("chem", this.selectYear);
      }

    },

    async addProject(department,year){
      console.log('addProject:' + department+year)   
      if(this.addProjectChoice){
        console.log('pass')
        console.log('mainProject:' + this.mainProject)
        console.log('year: '+year)
        console.log('budgetPlan: '+this.budgetPlan)
        if(this.mainProject.length != 0 && year.length != 0 && this.budgetPlan.length != 0){
          console.log('pass2')
          this.$store.commit({
            type: 'setLoading',
            loading: true
          })
           let dbRef = firebase.database().ref('department/'+department+'/year/'+year+'/mainProject')
           await dbRef.push().set({
             project: this.mainProject,
             strategicIssue: this.strategicIssue,
             stategic: this.strategic,
             tactic: this.tactic,
             measure: this.measure,
             targetPoint: this.targetPoint,
             responsible: this.responsible,
             budgetPlan: this.budgetPlan,
             transfer: 0,
             deposit: 0,
             remainPlan: this.budgetPlan,
             approval: 0,
             expense:0,
             remainApproval:0,
             remainExpense:0,
             comment: this.comment,
             result: '',
             resultDetail:'',
             obstacle:''
             })
            this.$store.commit({
            type: 'setLoading',
            loading: false
            })
            
            }
      
      } else {
        if(this.selectProject.length !=0 && year.length !=0 && this.subProject.length !=0 ) {
          this.$store.commit({
            type: 'setLoading',
            loading: true
          })
          let mainProject = this.listofProject.find(({project}) => project == this.selectProject)
          let dbRef = firebase.database().ref('department/' + department 
          +'/year/' + year + '/mainProject/' + mainProject.key + '/subProject')
          await dbRef.push().set({
            project: this.subProject,
            strategicIssue: this.strategicIssue,
            stategic: this.strategic,
            tactic: this.tactic,
            measure: this.measure,
            targetPoint: this.targetPoint,
            responsible: this.responsible,
            budgetPlan: this.budgetPlan,
            transfer: 0,
            deposit: 0,
            remainPlan: this.budgetPlan,
            approval: 0,
            expense:0,
            remainApproval:0,
            remainExpense:0,
            comment: this.comment,
            result: '',
            resultDetail:'',
            obstacle:''
          })
          this.$store.commit({
            type: 'setLoading',
            loading: false
          })
        }
        

      }
    }
  },
  computed: {
    ...mapGetters({
      addProjectChoice: 'getAddProjectChoice',
      projectData: 'getProjectData'
    }),
  
  },
  created(){

    //   this.dbMain= firebase.database().ref().child().once('value').then((snapshot)=>{
    //       snapshot.forEach(function(data){
              
    //       })
    //   })

},
mounted(){
      var id = this
      
     
}
}
  
</script>
