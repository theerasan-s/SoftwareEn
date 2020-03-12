<template>

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" dark v-on="on">เพิ่มโครงการย่อย</v-btn>
        
      </template>
      

      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มโครงการ</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select v-model.lazy="selectedDepartment" :items="departments" label="เลือกสาขาวิชา / ฝ่าย*" outlined required></v-select>
              </v-col>
              <v-col cols="12">
                <v-select v-model.lazy="selectedMain" :items="mainProjects" label="เลือกโครงการหลัก*" outlined required></v-select>
              </v-col>
              <v-col cols="4">
                <v-subheader>ชื่อโครงการย่อย</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required v-model="project"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-subheader>ประเด็นยุทธศาสตร์</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required type ="number" v-model="strategicIssue"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-subheader>ยุทธศาสตร์</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required type="number" v-model="strategic"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-subheader>กลยุทธ์</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required type="number" v-model="tactic"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-subheader>ตัวชี้วัด</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required v-model="measure"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-subheader>ค่าเป้าหมายตัวชี้วัด</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required v-model="targetPoint"></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-subheader>ผู้รับผิดชอบ</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required v-model="responsible"></v-text-field>
              </v-col>
   <v-col cols="4">
                <v-subheader>งบประมาณ (บาท)</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field label outlined dense required type="number" v-model="budgetPlan"></v-text-field>
              </v-col>
          
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" class="mr-4" @click="submit">ตกลง</v-btn>
          <v-btn color="error" @click="dialog = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import firebase from "firebase"
export default {
  name: "Addproject",

  data() {
    return {
      selectedDepartment:null,
      selectedMain :null,
      mainProjects:[],
      departments:[],
      dialog: false,
      ชื่อโครงการย่อย: "",
    selectedMain:null,
    project:null,
    strategicIssue:null,
    strategic: null,
    tactic: null,
    measure: null,
    targetPoint: null,
    responsible: null,
    budgetPlan: null,
    remainPlan: null,

    };
  },
  methods: {
    submit: function() {
      var newPostRef = firebase.database().ref('department/ce/year/2563/mainProject/'+this.selectedMain+'/subProject').push();
        newPostRef.set({
     project:this.project,
    strategicIssue: parseInt(this.strategicIssue),
    strategic: parseInt(this.strategic),
    tactic: parseInt(this.tactic),
    measure: this.measure,
    targetPoint: this.targetPoint,
    responsible: this.responsible,
    budgetPlan: parseInt(this.budgetPlan),
    remainPlan: parseInt(this.budgetPlan),           
    });
          alert('เพิ่มโครงการย่อย (โครงการหลัก:'+ this.selectedMain+')');

    }
  },
  created(){

    //   this.dbMain= firebase.database().ref().child().once('value').then((snapshot)=>{
    //       snapshot.forEach(function(data){
              
    //       })
    //   })

},
mounted(){
      var id = this
      this.db = firebase.database().ref('department').once('value').then((snapshot)=>{
          snapshot.forEach(function(data){
              
              id.departments.push(data.key)
              
      }) 
    //  this.db = firebase.database().ref('department/ce/year/2563/mainProject').on('value').then((snapshot)=>{
    //      snapshot.forEach(function(data){
    //          const d = {
    //              ...doc.data(),
    //              'text': doc.data().project,
    //              'value': doc.id
    //          }
    //          id.mainProjects.push(d)
    //      })
    //  })  


        this.db = firebase.database().ref('department/ce/year/2563/mainProject').once('value',function(snapshot){

                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        // ...
                        console.log(childData.project)
                        const dataList = {
                            'text': childData.project,
                            'value': childKey
                        }
                        id.mainProjects.push(dataList)
                    });
        })
  })
     
}
}
  
</script>
