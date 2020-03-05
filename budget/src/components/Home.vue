<template>
  <v-app>
    <navbar></navbar>
    <div class="banner" style="height: 50px;"></div>

    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">งบประมาณทั้งหมด</v-card-title>

              <v-card-text style="text-align:center " class="texta">
                <p>{{allbudget}}</p>
                <!-- Show all budget -->
                <p>บาท</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">เงินคงเหลือทั้งหมด</v-card-title>

              <v-card-text style="text-align:center" class="texta">
                <p>{{remainbudget}}</p>
                <!-- Show remain budget -->
                <p>บาท</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">จำนวนโครงการทั้งหมด</v-card-title>

              <v-card-text style="text-align:center" class="texta">
                <p>{{allproject}}</p>
                <!-- Show all Project -->
                <p>โครงการ</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">ดำเนินการสำเร็จ</v-card-title>
              <v-card-text style="text-align:center" class="texta">
                <p>{{completedproject}}</p>
                <!-- Show completed project -->
                <p>โครงการ</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
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
            single-line></v-select>
          <!-- Select Department -->
        </v-col>
        <v-col cols="12" md="3">
          <label for="year" class="mr-5">ปีการศึกษา :</label>
<<<<<<< HEAD
          <v-select
            v-model="selectYear"
            :items="projectYear"
            @change="yearSelector"
            menu-props="auto"
            label="ปีการศึกษา"
            hide-details
            single-line></v-select>
=======
          <v-menu>
            <template>
                <v-select v-on="on" class="my-2" items=""></v-select>
              </template>
              <v-date-picker v-model="date" type="month" width="290" class="mt-4" id="date"></v-date-picker>
          </v-menu>
          <!-- Change to pick from calendar -->
>>>>>>> 7e9be73320753332c313efdcc6dba7a1e1155c59
        </v-col>
        <v-col cols="12" md="3">
          <label for="project" class="mr-5">โครงการ :</label>
          <v-select
<<<<<<< HEAD
            v-model="selectProject"
            :items="projectList"
            menu-props="auto"
            label="โครงการ"
            hide-details
            @change="loadSubProject"
            single-line></v-select>
=======
            id="project"
            class="my-2"
            :items="mainpro"
            label="โครงการ"
            target="#dropdown-example"
            style="display:inline-block" 
          ></v-select>
>>>>>>> 7e9be73320753332c313efdcc6dba7a1e1155c59
          <!-- Select main project -->
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-card>
        <v-simple-table fixed-header height="300px" w>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">โครงการย่อย</th>
                <th class="text-center">งบประมาณ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in miniproject" :key="item.name">
                <td class="text-center">{{ item.name }}</td>
                <!-- Show miniproject's name -->
                <td class="text-center">{{ item.budget }} บาท</td>
                <!-- show miniproject's budget -->
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import navbar from "./navbar"
import firebase from 'firebase'
export default {
  name: "home",
  components: { navbar },
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    allbudget: 10 /* All Budget variable*/,
    remainbudget: 20 /* Remain Budget variable*/,
    allproject: 30 /* All Project variable*/,
    completedproject: 40 /* Completed Project variable */,
    departmentData:[],//[{department:'coe',year:{2563:[{mainproject}]}}]
    mainpro:[],
    departmentselect: [ /* All Department variable */
      "วิศวกรรมโยธา",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมการเกษตร",
      "วิศวกรรมอุตสาหการ",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมสิ่งแวดล้อม",
      "วิศวกรรมเคมี",
      "วิศวกรรมคอมพิวเตอร์"
    ],
    miniproject:[],/* All miniproject in main project */ /* 2 variable: name,budget [name:,budget:}]*/ 
    selectDepartment:'',
    projectYear:[],
    selectYear:'',
    selectProject:'',
    projectList:[],
    listofProject:[]//[{}]
    
  }),
  methods: {
    async loadData(){
      const ref = firebase.database().ref('department')
      const data = await ref.once('value')
      const projectData = data.val()
      for(let i in projectData){ // {department:coe,project}
        const miniData = {department:i,year:{}}
        for(let j in projectData[i].year){
          const project = []
          for(let k in projectData[i].year[j].mainProject){//projectData['coe'].year[2563]
              let mainProject = {
                name:projectData[i].year[j].mainProject[k].project,
                budget:projectData[i].year[j].mainProject[k].budgetPlan
                }
              this.miniproject.push(mainProject)
              project.push(projectData[i].year[j].mainProject[k])
            }
          miniData.year[j] = project
      }
      this.departmentData.push(miniData)
    }
    console.log(this.departmentData)
    },
    departmentSelector(){
      //console.log(this.selectDepartment)
      this.selectYear = undefined
      this.selectProject = undefined
      
      if(this.selectDepartment == 'วิศวกรรมโยธา'){
        this.loadYear('ce')
      }
      else if(this.selectDepartment == 'วิศวกรรมไฟฟ้า')
        this.loadYear('ee')
      else if(this.selectDepartment == 'วิศวกรรมการเกษตร'){
        this.loadYear('ae')
      }
      else if(this.selectDepartment == 'วิศวกรรมอุตสาหการ'){
        this.loadYear('ie')
      }
      else if(this.selectDepartment == 'วิศวกรรมเครื่องกล'){
        this.loadYear('me')
      }
      else if(this.selectDepartment == 'วิศวกรรมสิ่งแวดล้อม'){
        this.loadYear('envi')
      }
      else if(this.selectDepartment == 'วิศวกรรมคอมพิวเตอร์'){
        this.loadYear('coe')
      }
      else if(this.selectDepartment =='วิศวกรรมเคมี'){
        this.loadYear('chem')
      }
      
    },
    loadYear(selectDepartment){
      this.projectYear = []
      //console.log(selectDepartment)
      let selectedDepartment = this.departmentData.find(({department})=> department==selectDepartment)
      //console.log(selectedDepartment)
      let departmentYear = []
      for(let i in selectedDepartment.year){
        departmentYear.push(i)
      }
      console.log(departmentYear)
      this.projectYear = departmentYear
    },
    yearSelector(){
      if(this.selectDepartment == 'วิศวกรรมโยธา'){
        this.loadProject('ce',this.selectYear)
      }
      else if(this.selectDepartment == 'วิศวกรรมไฟฟ้า')
        this.loadProject('ee',this.selectYear)
      else if(this.selectDepartment == 'วิศวกรรมการเกษตร'){
        this.loadProject('ae',this.selectYear)
      }
      else if(this.selectDepartment == 'วิศวกรรมอุตสาหการ'){
        this.loadProject('ie',this.selectYear)
      }
      else if(this.selectDepartment == 'วิศวกรรมเครื่องกล'){
        this.loadProject('me',this.selectYear)
      }
      else if(this.selectDepartment == 'วิศวกรรมสิ่งแวดล้อม'){
        this.loadProject('envi',this.selectYear)
      }
      else if(this.selectDepartment == 'วิศวกรรมคอมพิวเตอร์'){
        this.loadProject('coe',this.selectYear)
      }
      else if(this.selectDepartment =='วิศวกรรมเคมี'){
        this.loadProject('chem',this.selectYear)
      }

    },

    loadProject(selectDepartment,selectYear){
      let departmentProject = this.departmentData.find(({department})=>department==selectDepartment)
      let allProject
      this.projectList = []
      for(let i in departmentProject.year){
        if(i == selectYear){
          console.log('yes')
          allProject = departmentProject.year[i]
          break
        }
      }
      this.listofProject = allProject
      for(let i in allProject){
        this.projectList.push(allProject[i].project)
      }
    },

    loadSubProject(selectedProject){
      const mainProject = this.listofProject.find(({project}) => project = selectedProject)
      console.log(mainProject)
      this.miniproject =[]
      for(let i in mainProject.subProject){
        let subProject = {
          name:mainProject.subProject[i].project,
          budget:mainProject.subProject[i].budgetPlan
          }
        this.miniproject.push(subProject)
      }
    }
  },
  async created() {
    await this.loadData()
    
  },
  
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
