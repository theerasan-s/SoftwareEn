<template>
 <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Edit</v-btn>
      </template>
      <v-card class="v-card__text">
        <v-card-title >
          <span class="headline">แก้ไขรายละเอียดโครงการ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text class="title font-black">โครงการหลัก : </v-text>
              </v-col>              
              <v-col cols="12">
                <v-text-field class="title" label="โครงการย่อย" type="text" outlined required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea class="title" rows="3" label="จุดประสงค์" type="text" outlined required></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-select label="แผนยุทธศาสตร์" outlined></v-select>              
              </v-col>
              <v-col cols="12">
                <v-select label="กลศาสตร์" outlined></v-select>              
              </v-col>
              <v-col cols="12">
                <v-text-field label="ตัวชี้วัด" outlined></v-text-field>              
              </v-col>
              <v-col cols="12">
                <v-text-field label="ค่าเป้าหมายของตัวชี้วัด" outlined></v-text-field>              
              </v-col>
              <v-col cols="12">
                <v-textarea rows="3" label="ผู้รับผิดชอบ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12" >
                <v-text-field label="งบประมาณตามแผน" outlined></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field label="ขออนุมัติใช้" outlined></v-text-field>              
              </v-col>
              <v-col cols="12">
                <v-text-field label="เบิกจ่าย" outlined></v-text-field>              
              </v-col>
              <v-col cols="12">
                <v-textarea rows="3" label="หมายเหตุ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12">
                <v-textarea rows="3" label="ผลดำเนินการ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12">
                <v-textarea rows="3" label="รายละเอียดผลดำเนินการ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12">
                <v-textarea rows="3" label="ปัญหาอุปสรรค" outlined></v-textarea>              
              </v-col>             
              
            </v-row>
          </v-container>          
        </v-card-text>
        <v-card-actions>
          
            <v-row justify="center">
              <v-col cols="12">
                  <div style="text-align:center">
                    <v-btn class="mx-auto" outlined color="indigo" @click="dialog = false">โอน</v-btn>
                  </div>
              </v-col>
              <v-btn large class="ma-2" color="error" @click="dialog = false">ยกเลิก</v-btn>
              <v-btn large class="ma-2" color="primary" @click="dialog = false">ยืนยัน</v-btn>
            </v-row>
            
          
          
           
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
   export default {
    data: () => ({
      dialog: false,
    }),
  }
</script>
  
<style>
button{
  margin-top: 50px;
}

.v-text-field label{
    font-size: 20px;
    color: black;
  }
.v-card__text {
  padding: 0;
}
.v-col{
  padding: 8px;

}
.v-card__actions{
  padding: 0px;
}
.container{
  padding: 0px 24px 0px 0px;
}
</style>



