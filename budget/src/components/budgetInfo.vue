<template>
  <v-data-table
    :headers="headers"
    :items="details"
    class="elevation-1 mytable"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title
          >คำของบประมาณโครงการ/กิจกรรมตามหลักสูตร</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ on }">
      <Edit v-on="on"/>
    
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>

</template>

<script>
import Edit from "./Edit.vue";
export default {
    name: 'App',
    components:{ Edit},
    data: () => ({
    dialog: false,
    headers: [
      {
        text: "ที่",
        align: "start",
        sortable: false,
        value: "number"
      },
      { text: "ประเด็นยุทธศาสตร์", value: "strategicIssue" },
      { text: "ยุทธศาสตร์", value: "strategic" },
      { text: "กลยุทธ์", value: "tactic" },
      { text: "โครงการ / กิจกรรมย่อย", value: "project" },
      { text: "ตัวชี้วัด", value: "measure" },
      { text: "ค่าเป้าหมาย", value: "targetpoint" },
      { text: "ผู้รับผิดชอบ", value: "responsible" },
      { text: "งบประมาณ(ตามแผน)", value: "budgetPlan" },
      { text: "โอนออก", value: "transfer" },
      { text: "โอนเข้า", value: "deposit" },
      { text: "คงเหลือ(ตามแผน)", value: "remainPlan" },
      { text: "ขออนุมัติใช้", value: "approval" },
      { text: "เบิกจ่าย", value: "expense" },
      { text: "คงเหลือจากหลักการ", value: "remainApproval" },
      { text: "คงเหลือจากเบิกจ่ายจริง", value: "remainExpense" },
      { text: "หมายเหตุ", value: "comment" },
      { text: "ผลการดำเนินงาน", value: "result" },
      { text: "รายละเอียดผลการดำเนินงาน", value: "resultDetail;" },
      { text: "ปัญหาอุปสรรค", value: "obstacle" },
      { text: "Actions", value: "action", sortable: false }
    ],
    details: [
      {
        number: "1",
        strategicIssue: 1,
        stategic: 1,
        tactic: 1,
        project: "1.ส่งเสริมให้นักศึกษามีภาวะผู้นำ และคิดวิเคราะห์",
        measure: "ร้อยละนักศึกษาที่ได้ร่วมส่งลุงตู่",
        targetPoint: "ร้อยละ95",
        responsible: "วิศวกรรมคอมพิวเตอร์",
        budgetPlan: 163470,
        transfer: 0,
        deposit: 0,
        remainPlan: 163470,
        approval: 107340,
        expense: 8777,
        remainApproval: 56130,
        remainExpense: 154693,
        comment: "",
        result: "",
        resultDetail: "",
        obstacle: ""
        }
    ]
  })
};
</script>

<style>

  
</style>
