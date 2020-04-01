<template>
    <v-card width="600px">
      <v-container class="text-center">
        <v-row justify="center">
          <v-card-title class="title cardHeader mt-4 mb-4">รายละเอียดโครงการ</v-card-title>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>โครงการใหญ่ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{mainProject}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>โครงการย่อย :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{project}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>ประเด็นยุทธศาสตร์ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{strategicIssue}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>ยุทธศาสตร์ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{strategic}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>กลยุทธ์ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{tactic}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>ตัวชี้วัด :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{measure}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <span>ค่าเป้าหมายของตัวชี้วัด :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{targetPoint}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>ผู้รับผิดชอบ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{responsible}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <span>งบประมาณตามแผน :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{budgetPlan}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>โอนออก :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{transfer}} บา </span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>โอนเข้า :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{deposit}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>คงเหลือตามแผน :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{remainPlan}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>ขออนุมัติใช้ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{approval}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>เบิกจ่าย :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{expense}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <span>คงเหลือจากหลักการ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{remainApproval}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <span>คงเหลือจากเบิกจ่ายจริง :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{remainExpense}} บาท</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>หมายเหตุ :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{comment}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <span>ผลการดำเนินงาน :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{result}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="5">
            <span>รายละเอียดผลการดำเนินงาน :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{resultDetail}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <span>ปัญหาอุปสรรค :</span>
          </v-col>
          <v-col cols="12" md="3">
            <span>{{obstacle}}</span>
          </v-col>
        </v-row>
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
