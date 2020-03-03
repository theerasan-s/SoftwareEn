<template>
  <div>
    <v-app-bar color="#3E3C3C" dense dark>
      <v-toolbar-title style="margin-top: 0px">ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</v-toolbar-title>
      <v-spacer></v-spacer>
      <a style="color:white" class="mr-5">หน้าหลัก</a>
        <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <a v-on="on" style="color:white" class="mr-3">รายละเอียดโครงการ</a>
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