<template>
<body>
  <div class="topnav">
    <a class="active" href="#home">Account</a> <!-- Manage account -->
    <div class="dropdown">
      <button class="dropbtn">
        รายละเอียด
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content"> <!-- Move to faculty -->
        <a href="#">วิศวกรรมโยธา</a>
        <a href="#">วิศวกรรมไฟฟ้า</a>
        <a href="#">วิศวกรรมการเกษตร</a>
        <a href="#">วิศวกรรมอุตสาหการ</a>
        <a href="#">วิศวกรรมเครื่องกล</a>
        <a href="#">วิศวกรรมสิ่งแวดล้อม</a>
        <a href="#">วิศวกรรมคอมพิวเตอร์</a>
      </div>
    </div>
    <a href="#contact">หน้าหลัก</a> <!-- Move to Home -->
    <b>ระบบติดตามการใช้จ่ายตามแผนงบประมาณ</b>
  </div>
  <div class="banner" style="height: 50px;"></div>
  <div class="showbudget">
    <div class="showallbudget">
      <h3 style="text-align:center;">งบประมาณทั้งหมด</h3>
      <h3 id="allbudget" style="text-align:center">200,000</h3> <!-- Show All Budget -->
      <h3 style="text-align:center">บาท</h3>
    </div>
    <div class="showbudget">
      <div class="showallbudget">
        <h3 style="text-align:center;">เงินคงเหลือทั้งหมด</h3>
        <h3 id="remainbudget" style="text-align:center">100,000</h3> <!-- Show remain Budget -->
        <h3 style="text-align:center">บาท</h3>
      </div>
      <div class="showallbudget">
        <h3 style="text-align:center;">โครงการทั้งหมด</h3>
        <h3 id="allproject" style="text-align:center">10</h3> <!-- Show All Project -->
        <h3 style="text-align:center">โครงการ</h3>
      </div>
      <div class="showallbudget">
        <h3 style="text-align:center;">ดำเนินการสำเร็จ</h3>
        <h3 id="doneproject" style="text-align:center">10</h3> <!-- Show Complete Project -->
        <h3 style="text-align:center">โครงการ</h3>
      </div>
    </div>
  </div>
  <div style="clear: both;"></div>
  <div style="height: 50px"></div>
  <label id="searchmainproject"> โครงการใหญ่: </label>
  <select id="project"> <!-- Select Project for see detail -->
    <option href="#">John</option>
    <option href="#">Smith</option>
    <option href="#">koko</option>
  </select>
  <p style="height = 10px"></p>
  <table id = "inproject" style="text-align: center;"> <!-- Show Mini Project in BigProject -->
    <tr>
      <th>โครงการย่อย</th>
      <th>งบประมาณ</th>
    </tr>
  </table>
</body>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}
/* Show Program's name  */
.topnav b {
  float: left;
  padding: 14px 116px;
  font-size: 17px;
  color: #ddd;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
/* Drop down for faculty */
.dropdown {
  float: right;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.showallbudget {
  border-radius: 25px;
  padding: 20px;
  margin-left: 50px;
  background-color: #d3d3d3;
  width: 180px;
  height: 150px;
  float: left;
  display: table;
}
table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
.td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
