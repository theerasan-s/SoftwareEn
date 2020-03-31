import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // Project Detail 
        mainProject: 'Tee',  
        project: 'TeeLek',
        approval:10,
        budgetPlan:10,
        comment:'ff',
        deposit:0,
        expense:0,
        measure:'tee',
        obstacle:'no',
        remainApproval:10,
        remainExpense:10,
        remainPlan:10,
        responsible:'tee',
        result:'very good',
        resultDetail:'555+',
        strategic:'tt',
        strategicIssue:'no',
        tactic:'tee',
        targetPoint:25,
        transfer:0      
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
        }
    }
})