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

              <v-card-text style="text-align: center;" class="texta">
                <p>{{ allbudget }}</p>
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

              <v-card-text style="text-align: center;" class="texta">
                <p>{{ remainbudget }}</p>
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

              <v-card-text style="text-align: center;" class="texta">
                <p>{{ allproject }}</p>
                <!-- Show all Project -->
                <p>โครงการ</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">ดำเนินการ</v-card-title>
              <v-card-text style="text-align: center;" class="texta">
                <p>{{ completedproject }}</p>
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
    allbudget: 'loading' /* All Budget variable*/,
    remainbudget: 'loading' /* Remain Budget variable*/,
    allproject: 'loading' /* All Project variable*/,
    completedproject: 'loading' /* Completed Project variable */,
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
    selectDepartment:null,
    projectYear:[],
    selectYear:null,
    selectProject:null,
    projectList:[],
    listofProject:[],//[{}]
    latestDepartment:null
  }),
  methods: {
    async loadData(){
      console.log(this.isLoaded)
      this.isLoaded = true
      const ref = firebase.database().ref('department')
      const data = await ref.once('value')
      const projectData = data.val()
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
      console.log(this.departmentData)
      this.departmentData.push(mainData)
    }
    },
    departmentSelector(){
      //console.log(this.selectDepartment)
      this.selectYear = undefined
      this.selectProject = undefined

      if(this.selectDepartment == 'วิศวกรรมโยธา'){
        this.loadYear('ce')
        this.latestDepartment ='ce'
      }
      else if(this.selectDepartment == 'วิศวกรรมไฟฟ้า'){
        this.loadYear('ee')
        this.latestDepartment ='ee'
      }
      else if(this.selectDepartment == 'วิศวกรรมการเกษตร'){
        this.loadYear('ae')
        this.latestDepartment ='ae'
      }
      else if(this.selectDepartment == 'วิศวกรรมอุตสาหการ'){
        this.loadYear('ie')
        this.latestDepartment ='ie'
      }
      else if(this.selectDepartment == 'วิศวกรรมเครื่องกล'){
        this.loadYear('me')
        this.latestDepartment ='me'
      }
      else if(this.selectDepartment == 'วิศวกรรมสิ่งแวดล้อม'){
        this.loadYear('envi')
        this.latestDepartment ='envi'
      }
      else if(this.selectDepartment == 'วิศวกรรมคอมพิวเตอร์'){
        this.loadYear('coe')
        this.latestDepartment ='coe'
      }
      else if(this.selectDepartment =='วิศวกรรมเคมี'){
        this.loadYear('chem')
        this.latestDepartment ='chem'
      }

    },
    loadYear(selectDepartment){
      this.projectYear = []
      console.log(selectDepartment)
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

    loadSubProject(){
      console.log(this.selectProject)
      const mainProject = this.listofProject.find(({project}) => project == this.selectProject)
      console.log(mainProject)
      this.miniproject =[]
      for(let i in mainProject.subProject){
        let subProject = {
          name:mainProject.subProject[i].project,
          budget:mainProject.subProject[i].budgetPlan
          }
        this.miniproject.push(subProject)
      }
    },
    async sumTotal(){
      const vm = this
      vm.allbudget = 0
      vm.remainbudget = 0
      vm.allproject = 0
      vm.completedproject=0
      for(let i in this.departmentData){
        //console.log(this.departmentData[i])
        for(let j in this.departmentData[i].year){
          for(let k in this.departmentData[i].year[j]){
            vm.allbudget+=parseInt(this.departmentData[i].year[j][k].budgetPlan)
            vm.remainbudget+=parseInt(this.departmentData[i].year[j][k].remainPlan)
            vm.allproject += 1
            //console.log(this.departmentData[i].year[j][k].subProject)
            for(let t in this.departmentData[i].year[j][k].subProject){
              vm.allproject+=1
              console.log(this.departmentData[i].year[j][k].subProject[t].result)
              if(this.departmentData[i].year[j][k].subProject[t].result.trim() !== ''){
                vm.completedproject+=1

              }
            }

          }
        }

      }

    }
  },
  async mounted() {
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
      
      if(vm.selectDepartment != null){
        console.log(vm.latestDepartment)
        vm.loadYear(vm.latestDepartment)
        if(vm.selectYear != null){
          vm.loadProject(vm.latestDepartment,vm.selectYear)
          if(vm.selectProject != null){
            vm.loadSubProject()
            }
          }
        }
        vm.sumTotal()



            }

        )    
  

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
