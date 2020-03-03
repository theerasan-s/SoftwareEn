<template>
  <div>
    <v-app-bar color="#3E3C3C" dense dark>
<<<<<<< HEAD
      <v-toolbar-title style="margin-top: 0px">ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="#3E3C3C" style="margin-top: 0px">หน้าหลัก</v-btn>
=======
      <v-toolbar-title>ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#3E3C3C">หน้าหลัก</v-btn>
>>>>>>> f28fb23cd991c48e5542bc49d1132251e76d7902
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="#3E3C3C" dark v-on="on" style="margin-top: 0px">รายละเอียดโครงการ</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item) in departmentselect" :key="item">
              <v-list-item-content>
                <v-list-item-action>{{ item }}</v-list-item-action>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-spacer></v-spacer>
      <v-avatar color="black">
        <v-btn icon style="margin-top: 0px">
          <v-icon>mdi-account-circle</v-icon>
          <!-- Manage Account -->
        </v-btn>
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    departmentselect: [
      "วิศวกรรมโยธา",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมการเกษตร",
      "วิศวกรรมอุตสาหการ",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมสิ่งแวดล้อม",
      "วิศวกรรมคอมพิวเตอร์"
    ] /* All Department variable */
  })
};
</script>