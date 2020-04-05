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
                <v-text-field  label="โครงการย่อย" type="text" outlined required v-model="subProject" ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">ประเด็นยุทธศาสตร์ :</v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="ประเด็นยุทธศาสตร์" type="number" outlined v-model="strategicIssue"></v-text-field>             
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">แผนยุทธศาสตร์ :</v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="แผนยุทธศาสตร์" type="number" outlined v-model="strategic"></v-text-field>             
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">กลยุทธ์:</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="กลยุทธ์" type="number" outlined v-model="tactic"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ตัวชี้วัด :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="ตัวชี้วัด" outlined v-model="measure"></v-text-field>              
              </v-col>
              <v-col cols="12" md="5">
                <v-subheader class="application">ค่าเป้าหมายของตัวชี้วัด :</v-subheader>
              </v-col> 
              <v-col cols="12" md="5">
                <v-text-field label="ค่าเป้าหมายของตัวชี้วัด" outlined v-model="targetPoint"></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ผู้รับผิดชอบ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ผู้รับผิดชอบ" outlined v-model="responsible"></v-textarea>              
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">งบประมาณตามแผน :</v-subheader>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="งบประมาณตามแผน" type="number" outlined v-model="budgetPlan"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ขออนุมัติใช้ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="ขออนุมัติใช้"  type="number" outlined v-model="approval"></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">เบิกจ่าย : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="เบิกจ่าย" type="number" outlined v-model="expense"></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">หมายเหตุ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="หมายเหตุ" outlined v-model="comment"></v-textarea>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ผลดำเนินการ : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ผลดำเนินการ" outlined v-model="result"></v-textarea>              
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">รายละเอียดผลดำเนินการ :</v-subheader>
              </v-col>
              <v-col cols="12" md="7">
                <v-textarea rows="3" label="รายละเอียดผลดำเนินการ" outlined v-model="resultDetail"></v-textarea>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ปัญหาอุปสรรค :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ปัญหาอุปสรรค" outlined v-model="obstacle"></v-textarea>              
              </v-col>             
            </v-row>
          </v-container>          
        <v-card-actions>
            <v-row justify="center">
              <v-col cols="12">
                  <div style="text-align:center">
                    <v-btn class="mx-auto" rounded color="primary" @click="dialog = false" light width="40%">โอนย้าย</v-btn>
                  </div>
              </v-col>
              <v-btn large class="ma-2" color="error" @click="dialog = false" light>
                ยกเลิก
                <v-icon right>mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-btn large class="ma-2" color="success" @click="dialog = false" light>
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
      
    }),
    methods: {
      updateProject(){
        //const dbRef = firebase.database().ref('department/'+)
      }
    },
    computed: {
      ...mapGetters({
        mainProject: 'getMainProject',
        subProject: 'getProject',
        strategic: 'getStrategic',
        strategicIssue: 'getStrategicIssue',
        tactic: 'getTactic',
        measure: 'getMeasure',
        targetPoint: 'getTargetPoint',
        responsible: 'getResponsible',
        budgetPlan: 'getBudgetPlan',
        approval: 'getApproval',
        expense: 'getExpense',
        comment: 'getComment',
        result: 'getResult',
        resultDetail: 'getResultDetail',
        obstacle: 'getObstacle'
      })
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



