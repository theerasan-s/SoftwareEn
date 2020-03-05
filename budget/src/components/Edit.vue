<template>
 <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
         <v-icon right  small v-on="on">mdi-pencil</v-icon>
      </template>
      <v-card>
        <v-row justify="center">
           <v-card-title class="application cardHeader mt-4 mb-4">แก้ไขรายละเอียดโครงการ</v-card-title>
        </v-row>
          <v-container class="ml-2">
            <v-row>
              <v-col cols="5" md="3" class="ml-4">
                <v-card-text class="application">โครงการหลัก : </v-card-text>
              </v-col>
              <v-col cols="4" md="8" class="mb-5">
                <v-card-text class="application"> {{mainProject}} </v-card-text>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">โครงการย่อย :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field class="title" label="โครงการย่อย" type="text" outlined required></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">จุดประสงค์ : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea class="title" rows="3" label="จุดประสงค์" type="text" outlined required></v-textarea>
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">แผนยุทธศาสตร์ :</v-subheader>
              </v-col>
              <v-col cols="12" md="6">
                <v-select label="แผนยุทธศาสตร์" outlined></v-select>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">กลศาสตร์ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-select label="กลศาสตร์" outlined></v-select>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ตัวชี้วัด :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="ตัวชี้วัด" outlined></v-text-field>              
              </v-col>
              <v-col cols="12" md="5">
                <v-subheader class="application">ค่าเป้าหมายของตัวชี้วัด :</v-subheader>
              </v-col> 
              <v-col cols="12" md="5">
                <v-text-field label="ค่าเป้าหมายของตัวชี้วัด" outlined></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ผู้รับผิดชอบ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ผู้รับผิดชอบ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">งบประมาณตามแผน :</v-subheader>
              </v-col>
              <v-col cols="12" md="7">
                <v-text-field label="งบประมาณตามแผน" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ขออนุมัติใช้ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="ขออนุมัติใช้" outlined></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">เบิกจ่าย : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field label="เบิกจ่าย" outlined></v-text-field>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">หมายเหตุ :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="หมายเหตุ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ผลดำเนินการ : </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ผลดำเนินการ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12" md="4">
                <v-subheader class="application">รายละเอียดผลดำเนินการ :</v-subheader>
              </v-col>
              <v-col cols="12" md="7">
                <v-textarea rows="3" label="รายละเอียดผลดำเนินการ" outlined></v-textarea>              
              </v-col>
              <v-col cols="12" md="3">
                <v-subheader class="application">ปัญหาอุปสรรค :</v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea rows="3" label="ปัญหาอุปสรรค" outlined></v-textarea>              
              </v-col>             
            </v-row>
          </v-container>          
        <v-card-actions>
          
            <v-row justify="center">
              <v-col cols="12">
                  <div style="text-align:center">
                    <v-btn class="mx-auto" rounded color="primary" @click="dialog = false" light width="40%">โอนย้าย</v-btn>
                  </div>
              </v-col>
              <v-btn large class="ma-2" color="error" @click="dialog = false" light>
                ยกเลิก
                <v-icon right>mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-btn large class="ma-2" color="success" @click="dialog = false" light>
                ยืนยัน
                <v-icon right>mdi-check-circle-outline</v-icon>
                </v-btn>
            </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
   import firebase from 'firebase'
   export default {
    data: () => ({
      dialog: false,
      mainProject: 'ส่งลุงตู่กลับบ้าน'
    }),
<<<<<<< HEAD
     
     
=======

>>>>>>> 5a62ac94c4c63644066894ac9c44673895cad495
  }
</script>
  
<style>


.application{
  font-family: "Prompt", sans-serif;
}
.cardHeader{
  background-color: #F0E69D;
  border-radius: 25px;
  
}

</style>



