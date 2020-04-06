<template>
      <v-card>
        <v-row justify="center">
           <v-card-title class="application cardHeader mt-4 mb-4">แก้ไขรายละเอียดโครงการ</v-card-title>
        </v-row>
          <v-container class="ml-2">
            <v-row>
              <v-col cols="12">
                <span>โครงการหลัก : </span>
                <span> {{mainProject}} </span>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">โครงการย่อย :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field  label="โครงการย่อย" type="text" outlined required v-bind:value=subProject v-model="editSubProject"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">ประเด็นยุทธศาสตร์ :</v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="ประเด็นยุทธศาสตร์" type="number" outlined v-bind:value=strategicIssue v-model="editStrategicIssue"></v-text-field>             
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">แผนยุทธศาสตร์ :</v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="แผนยุทธศาสตร์" type="number" outlined v-bind:value=strategic v-model="editStrategic"></v-text-field>             
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">กลยุทธ์:</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="กลยุทธ์" type="number" outlined v-bind:value=tactic v-model="editTactic"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ตัวชี้วัด :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="ตัวชี้วัด" outlined v-bind:value=measure v-model="editMeasure"></v-text-field>              
              </v-col>
              <v-col cols="12" md="5">
                <v-subheader class="application">ค่าเป้าหมายของตัวชี้วัด :</v-subheader>
              </v-col> 
              <v-col cols="12" md="5">
                <v-text-field label="ค่าเป้าหมายของตัวชี้วัด" outlined v-bind:value=targetPoint v-model="editTargetPoint"></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ผู้รับผิดชอบ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ผู้รับผิดชอบ" outlined v-bind:value=responsible v-model="editResponsible"></v-textarea>              
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">งบประมาณตามแผน :</v-subheader>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="งบประมาณตามแผน" type="number" outlined v-bind:value=budgetPlan v-model="editBudgetPlan"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ขออนุมัติใช้ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="ขออนุมัติใช้"  type="number" outlined v-bind:value=approval v-model="editApproval"></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">เบิกจ่าย : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="เบิกจ่าย" type="number" outlined v-bind:value=expense v-model="editExpense"></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">หมายเหตุ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="หมายเหตุ" outlined v-bind:value=comment v-model="editComment"></v-textarea>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ผลดำเนินการ : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ผลดำเนินการ" outlined v-bind:value=result v-model="editResult"></v-textarea>              
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">รายละเอียดผลดำเนินการ :</v-subheader>
              </v-col>
              <v-col cols="12" md="7">
                <v-textarea rows="3" label="รายละเอียดผลดำเนินการ" outlined v-bind:value=resultDetail v-model="editResultDetail"></v-textarea>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ปัญหาอุปสรรค :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ปัญหาอุปสรรค" outlined v-bind:value=obstacle v-model="editObstacle"></v-textarea>              
              </v-col>             
            </v-row>
          </v-container>          
        <v-card-actions>
            <v-row justify="center">
              <v-col cols="12">
                  <div style="text-align:center">
                    <v-btn class="mx-auto" rounded color="primary" @click="transfering" light width="40%">โอนย้าย</v-btn>
                  </div>
              </v-col>
              <v-btn large class="ma-2" color="error"  light @click="cancelEditing">
                ยกเลิก
                <v-icon right>mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-btn large class="ma-2" color="success" @click="updateProject" light>
                ยืนยัน
                <v-icon right>mdi-check-circle-outline</v-icon>
                </v-btn>
            </v-row>
        </v-card-actions>
      </v-card>
</template>

<script>
   import firebase from 'firebase'
  import { mapGetters } from 'vuex'
    export default {
      data: () => ({
        dialog: false,
        editSubProject:'',
        editStrategicIssue:'',
        editStrategic:'',
        editTactic:'',
        editMeasure:'',
        editTargetPoint:'',
        editResponsible:'',
        editBudgetPlan:0,
        editApproval:0,
        editExpense:0,
        editComment:'',
        editResult:'',
        editResultDetail:'',
        editObstacle:'',
        editRemainPlan:0,
        editTransfer:0,
        editDeposit:0

      
    }),
    methods: {
      async updateProject(){
        //console.log(this.projectData)
        //const departmentProject = this.projectData.find(({department}) => department =='coe')
        //const mainProject = projectYear.find(({project})=>project==this.mainProject)
        //console.log(mainProject)
        console.log(this.mainKey)
        console.log(this.department)
        this.$store.commit({
            type: 'setLoading',
            loading: true
          })
          console.log('department/'+this.department+'/year/'
        + this.year +'/mainProject/'+this.mainKey+'/subProject/'+this.subKey)
        const dbRef = firebase.database().ref('department/'+this.department+'/year/'
        + this.year +'/mainProject/'+this.mainKey+'/subProject/'+this.subKey)
        console.log(this.editApproval)
        console.log(this.editExpense)
        await dbRef.update({
          strategicIssue:this.editStrategicIssue,
          stategic:this.editStrategic,
          tactic:this.editTactic,
          measure:this.editMeasure,
          targetPoint:this.editTargetPoint,
          responsible:this.editResponsible,
          budgetPlan:this.editBudgetPlan,
          remainPlan: parseInt(this.editBudgetPlan) - parseInt(this.editTransfer) + parseInt(this.editDeposit),
          approval: this.editApproval,
          expense: this.editExpense,
          remainApproval: parseInt(this.editBudgetPlan) - parseInt(this.editTransfer) + parseInt(this.editDeposit) - parseInt(this.editApproval),
          remainExpense:parseInt(this.editBudgetPlan) - parseInt(this.editTransfer) + parseInt(this.editDeposit) - parseInt(this.editExpense),
          comment:this.editComment,
          result:this.editResult,
          resultDetail:this.editResultDetail,
          obstacle:this.editObstacle,
        })
        this.$store.commit({
            type: 'setLoading',
            loading: false
          })
        this.$store.commit({
          type: 'setEditProject',
          editProject: false
        })
      },
      transfering(){
        this.$store.commit({
          type: 'setTransfering',
          transfering: true
        })
      },
      cancelEditing(){
        this.$store.commit({
          type: 'setEditProject',
          editProject: false
        })
      },
    },
    computed: {
      ...mapGetters({
        mainProject: 'getMainProject',
        subProject: 'getProject',
        strategic: 'getStrategic',
        strategicIssue: 'getStrategicIssue',
        tactic: 'getTactic',
        measure: 'getMeasure',
        remainPlan: 'getRemainPlan',
        targetPoint: 'getTargetPoint',
        responsible: 'getResponsible',
        budgetPlan: 'getBudgetPlan',
        approval: 'getApproval',
        expense: 'getExpense',
        comment: 'getComment',
        result: 'getResult',
        resultDetail: 'getResultDetail',
        obstacle: 'getObstacle',
        transfer: 'getTransfer',
        deposit: 'getDeposit',
        projectData: 'getProjectData',
        mainKey: 'getMainKey',
        subKey: 'getSubKey',
        year: 'getYear',
        department:'getCurrentDepartment'
      })
      
    },
    
    mounted() {
        this.editSubProject = this.subProject
        this.editStrategic = this.strategic
        this.editStrategicIssue = this.strategicIssue
        this.editTactic = this.tactic
        this.editMeasure = this.measure
        this.editRemainPlan = this.remainPlan
        this.editTargetPoint = this.targetPoint
        this.editResponsible = this.responsible
        this.editBudgetPlan = this.budgetPlan
        this.editApproval = this.approval
        this.editExpense = this.expense
        this.editComment = this.comment
        this.editResult = this.result
        this.editResult = this.editResult
        this.editObstacle = this.obstacle
        this.editTransfer = this.transfer
        this.editDeposit = this.deposit
    }
  }
</script>

<style>


.application{
  font-family: "Prompt", sans-serif;
}
.cardHeader{
  background-color: #F0E69D;
  border-radius: 25px;
  
}

</style>



