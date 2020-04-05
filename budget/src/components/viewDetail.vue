<template>
    <v-card width="450px">
      <v-container class="mx-auto">
        <v-row justify="center">
          <v-card-title class="title cardHeader mt-4 mb-4">รายละเอียดโครงการ</v-card-title>
        </v-row>
        <v-container class="mx-10">
        <v-row class="mt-5">
            <span class="mr-5">โครงการใหญ่ :</span>
            <span>{{mainProject}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">โครงการย่อย :</span>
            <span>{{project}}</span>
        </v-row>
        <v-row class="mt-5">
            <span  class="mr-5">ประเด็นยุทธศาสตร์ :</span>
            <span>{{strategicIssue}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ยุทธศาสตร์ :</span>
            <span>{{strategic}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">กลยุทธ์ :</span>
            <span>{{tactic}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ตัวชี้วัด :</span>
            <span>{{measure}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ค่าเป้าหมายของตัวชี้วัด :</span>
            <span>{{targetPoint}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ผู้รับผิดชอบ :</span>
            <span>{{responsible}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">งบประมาณตามแผน :</span>
            <span>{{budgetPlan}} บาท</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">โอนออก :</span>
            <span>{{transfer}} บาท </span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">โอนเข้า :</span>
            <span>{{deposit}} บาท</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">คงเหลือตามแผน :</span>
            <span>{{remainPlan}} บาท</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ขออนุมัติใช้ :</span>
            <span>{{approval}} บาท</span>
        </v-row>
        <v-row class="mt-5"> 
            <span class="mr-5">เบิกจ่าย :</span>
            <span>{{expense}} บาท</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">คงเหลือจากหลักการ :</span>
            <span>{{remainApproval}} บาท</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">คงเหลือจากเบิกจ่ายจริง :</span>
            <span>{{remainExpense}} บาท</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">หมายเหตุ :</span>
            <span>{{comment}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ผลการดำเนินงาน :</span>
            <span>{{result}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">รายละเอียดผลการดำเนินงาน :</span>
            <span>{{resultDetail}}</span>
        </v-row>
        <v-row class="mt-5">
            <span class="mr-5">ปัญหาอุปสรรค :</span>
            <span>{{obstacle}}</span>
        </v-row>
        </v-container>
      </v-container>
    </v-card>
</template>

<style scoped>
  .title{
    font-family: "Prompt", sans-serif;
  }
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dialog: false
    };
  },
  computed: {
     ...mapGetters({
       mainProject: 'getMainProject',
       project: 'getProject',
       approval: 'getApproval',
       budgetPlan: 'getBudgetPlan',
       comment: 'getComment',
       deposit: 'getDeposit',
       expense: 'getExpense',
       measure: 'getMeasure',
       obstacle: 'getObstacle',
       remainApproval: 'getRemainApproval',
       remainExpense: 'getRemainExpense',
       remainPlan: 'getRemainPlan',
       responsible: 'getResponsible',
       result: 'getResult',
       resultDetail: 'getResultDetail',
       strategic: 'getStrategic',
       strategicIssue: 'getStrategicIssue',
       tactic: 'getTactic',
       targetPoint: 'getTargetPoint',
       transfer: 'getTransfer',
       })
  },
};
</script>
