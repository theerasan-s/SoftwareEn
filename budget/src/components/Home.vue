<template>
  <v-app>
    <navbar></navbar>
    <div class="banner" style="height: 50px;"></div>

    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">งบประมาณทั้งหมด</v-card-title>

              <v-card-text style="text-align:center " class="texta">
                <p>{{allbudget}}</p>
                <!-- Show all budget -->
                <p>บาท</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">เงินคงเหลือทั้งหมด</v-card-title>

              <v-card-text style="text-align:center" class="texta">
                <p>{{remainbudget}}</p>
                <!-- Show remain budget -->
                <p>บาท</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">จำนวนโครงการทั้งหมด</v-card-title>

              <v-card-text style="text-align:center" class="texta">
                <p>{{allproject}}</p>
                <!-- Show all Project -->
                <p>โครงการ</p>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="mx-auto">
            <v-row justify="center">
              <v-card-title class="headline">ดำเนินการสำเร็จ</v-card-title>

              <v-card-text style="text-align:center" class="texta">
                <p>{{completedproject}}</p>
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
        <v-col cols="3">
          <label for="department" class="mr-5">สาขาวิชา :</label>
          <v-select
            :items="departmentselect"
            menu-props="auto"
            label="สาขาวิชา"
            hide-details
            single-line></v-select>
          <!-- Select Department -->
        </v-col>
        <v-col cols="2">
          <label for="year" class="mr-5">ปีการศึกษา :</label>
          <v-menu>
            <template v-slot:activator="{ on }">
                <v-text-field v-on="on" class="my-2" items=""></v-text-field>
              </template>
              <v-date-picker v-model="date" type="month" width="290" class="mt-4" id="date"></v-date-picker>
          </v-menu>
          <!-- Change to pick from calendar -->
        </v-col>
        <v-col cols="3">
          <label for="project" class="mr-5">โครงการ :</label>
          <v-overflow-btn
            id="project"
            class="my-2"
            :items="mainpro"
            label="โครงการ"
            target="#dropdown-example"
            style="display:inline-block" 
          ></v-overflow-btn>
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
import navbar from "./navbar";
export default {
  name: "home",
  components: { navbar },
  data: () => ({
    date: new Date().toISOString().substr(0, 7),
    allbudget: 10 /* All Budget variable*/,
    remainbudget: 20 /* Remain Budget variable*/,
    allproject: 30 /* All Project variable*/,
    completedproject: 40 /* Completed Project variable */,
    departmentselect: [
      "วิศวกรรมโยธา",
      "วิศวกรรมไฟฟ้า",
      "วิศวกรรมการเกษตร",
      "วิศวกรรมอุตสาหการ",
      "วิศวกรรมเครื่องกล",
      "วิศวกรรมสิ่งแวดล้อม",
      "วิศวกรรมคอมพิวเตอร์"
    ] /* All Department variable */,
    miniproject: /* All miniproject in main project */ /* 2 variable: name,budget */ [
      {
        name: "Frozen Yogurt",
        budget: 159
      },
      {
        name: "Ice cream sandwich",
        budget: 237
      },
      {
        name: "Eclair",
        budget: 262
      },
      {
        name: "Cupcake",
        budget: 305
      },
      {
        name: "Gingerbread",
        budget: 356
      },
      {
        name: "Jelly bean",
        budget: 375
      },
      {
        name: "Lollipop",
        budget: 392
      },
      {
        name: "Honeycomb",
        budget: 408
      },
      {
        name: "Donut",
        budget: 452
      },
      {
        name: "KitKat",
        budget: 518
      }
    ]
  })
};
</script>

<style>
.texta {
  font-size: 23px; /* Card's fontsize */
}

.cardt {
  background-color: #d3d3d3;
}
</style>
