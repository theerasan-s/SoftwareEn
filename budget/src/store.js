import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Project Detail 
        mainProject: null,  
        project: null,
        approval:null,
        budgetPlan:null,
        comment:null,
        deposit:null,
        expense:null,
        measure:null,
        obstacle:null,
        remainApproval:null,
        remainExpense:null,
        remainPlan:null,
        responsible:null,
        result:null,
        resultDetail:null,
        strategic:null,
        strategicIssue:null,
        tactic:null,
        targetPoint:null,
        transfer:null,
        year:null,
        //////////////////////////////////////////////////////////////////////
        addProjectChoice:false, // true = โปรเจคหลัก , false = โปรเจคย่อย  
        projectData:null,   //allProjectData
        loading:false,
        username:null,
        mainKey:null,
        subKey:null,
        currentUser:null,
        currentDepartment:null,
        role:null,
        transfering:false,
        addProject:false,
        editProject:false
    },
    getters: {
        getMainProject(state){
            return state.mainProject
        },
        getProject(state){
            return state.project
        },
        getApproval(state){
            return state.approval
        },
        getBudgetPlan(state){
            return state.budgetPlan
        },
        getComment(state){
            return state.comment
        },
        getDeposit(state){
            return state.deposit
        },
        getExpense(state){
            return state.expense
        },
        getMeasure(state){
            return state.measure
        },
        getObstacle(state){
            return state.obstacle
        },
        getRemainApproval(state){
            return state.remainApproval
        },
        getRemainExpense(state){
            return state.remainExpense
        },
        getRemainPlan(state){
            return state.remainPlan
        },
        getResponsible(state){
            return state.responsible
        },
        getResult(state){
            return state.result
        },
        getResultDetail(state){
            return state.resultDetail
        },
        getStrategic(state){
            return state.strategic
        },
        getStrategicIssue(state){
            return state.strategicIssue
        },
        getTactic(state){
            return state.tactic
        },
        getTargetPoint(state){
            return state.targetPoint
        },
        getTransfer(state){
            return state.transfer
        },
        getAddProjectChoice(state){
            return state.addProjectChoice
        },
        getProjectData(state){
            return state.projectData
        },
        getLoading(state){
            return state.loading
        },
        getUserdataname(state){
            return state.username
        },
        getYear(state){
            return state.year
        },
        getMainKey(state){
            return state.mainKey
        },
        getSubKey(state){
            return state.subKey
        },
        getCurrentUser(state){
            return state.currentUser
        },
        getCurrentDepartment(state){
            return state.currentDepartment
        },
        getRole(state){
            return state.role
        },
        getTransfering(state){
            return state.transfering
        },
        getAddProject(state){
            return state.addProject
        },
        getEditProject(state){
            return state.editProject
        }
           
    },
    mutations : {
        setEditProject(state ,payload){
            state.editProject = payload.editProject
        },
        setCurrentUserData(state,payload){
            state.currentUser = payload.currentUser
            state.currentDepartment = payload.currentDepartment
            state.role = payload.role
        },
        setDetail(state,payload){
            state.mainProject = payload.mainProject
            state.project = payload.project
            state.approval = payload.approval
            state.budgetPlan = payload.budgetPlan
            state.comment = payload.comment
            state.deposit = payload.deposit
            state.expense = payload.expense
            state.measure = payload.measure
            state.obstacle = payload.obstacle
            state.remainApproval = payload.remainApproval
            state.remainExpense = payload.remainExpense
            state.remainPlan = payload.remainPlan
            state.responsible = payload.responsible
            state.result = payload.result
            state.resultDetail = payload.resultDetail
            state.strategic = payload.strategic
            state.strategicIssue = payload.strategicIssue
            state.tactic = payload.tactic
            state.targetPoint = payload.targetPoint
            state.transfer = payload.transfer
            state.year = payload.year
            state.mainKey  = payload.mainKey
            state.subKey = payload.subKey
        },
        setAddProjectChoice(state,payload){
            state.addProjectChoice = payload.choice
        },
        setProjectData(state,payload){
            state.projectData = payload.projectData
        },
        setLoading(state,payload){
            state.loading = payload.loading
        },
        setUserdataname(state,payload){
            state.username = payload.username
        },
        setMainKey(state,payload){
            state.mainKey = payload.mainKey
        },
        setTransfering(state,payload){
            state.transfering = payload.transfering
        },
        setAddProject(state,payload){
            state.addProject = payload.addProject
        }
        
    }
})