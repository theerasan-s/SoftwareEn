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
          <v-overflow-btn
            id="department"
            class="my-2"
            :items="dropdown_font"
            label="สาขาวิชา"
            target="#dropdown-example"
            style="display:inline-block"
          ></v-overflow-btn>
        </v-col>
        <v-col cols="3">
          <label for="year" class="mr-5">ปีการศึกษา :</label>
          <v-overflow-btn
            id="year"
            class="my-2"
            :items="dropdown_font"
            label="ปีการศึกษา"
            target="#dropdown-example"
            style="display:inline-block"
          ></v-overflow-btn>
        </v-col>
        <v-col cols="3">
          <label for="project" class="mr-5">โครงการ :</label>
          <v-overflow-btn
            id="project"
            class="my-2"
            :items="dropdown_font"
            label="โครงการ"
            target="#dropdown-example"
            style="display:inline-block"
          ></v-overflow-btn>
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
              <tr v-for="item in desserts" :key="item.name">
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.calories }} บาท</td>
         
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
    allbudget: 10,
    remainbudget: 20,
    allproject: 30,
    completedproject: 40,
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        year: 10
      },
      {
        name: "Ice cream sandwich",
        calories: 237
      },
      {
        name: "Eclair",
        calories: 262
      },
      {
        name: "Cupcake",
        calories: 305
      },
      {
        name: "Gingerbread",
        calories: 356
      },
      {
        name: "Jelly bean",
        calories: 375
      },
      {
        name: "Lollipop",
        calories: 392
      },
      {
        name: "Honeycomb",
        calories: 408
      },
      {
        name: "Donut",
        calories: 452
      },
      {
        name: "KitKat",
        calories: 518
      }
    ]
  })
};
</script>

<style>
.texta {
  font-size: 20px;
}

.cardt {
  background-color: #d3d3d3;
}
</style>
