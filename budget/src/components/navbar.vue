<template>
  <div>
    <v-app-bar color="#3E3C3C" dense dark>
      <v-toolbar-title>ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="#3E3C3C">หน้าหลัก</v-btn>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="#3E3C3C" dark v-on="on">รายละเอียดโครงการ</v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-spacer></v-spacer>

      <v-avatar color="black">
      <v-btn icon>
          <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-avatar>
    </v-app-bar>
  </div>
</template>