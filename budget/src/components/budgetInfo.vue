<template>
  <v-data-table :headers="headers" :items="details" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title
          >คำของบประมาณโครงการ/กิจกรรมตามหลักสูตร</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        edit
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        delete
      </v-icon>
    </template>
    
  </v-data-table>
</template>

<script>
//import HelloWorld from './components/HelloWorld';

export default {
  name: "App",

  components: {
    //HelloWorld,
  },

  data: () => ({
    search: "",
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
      { text: "ปัญหาอุปสรรค", value: "obstacle" }
    ],
    detail: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    mainProject: "ใหญ่มากๆๆๆ"
  })
};
</script>
