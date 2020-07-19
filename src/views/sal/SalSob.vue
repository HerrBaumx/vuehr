<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <el-button icon="el-icon-plus" type="primary" @click="showAddSalaryView">添加工资账套</el-button>
            <el-button icon="el-icon-refresh" type="success"></el-button>
        </div>
        <div style="margin-top: 10px">
            <el-table :data="salaries" border stripe>
                <el-table-column type="selection" width="30px"></el-table-column>
                <el-table-column width="120px" prop="name" label="账套名称"></el-table-column>
                <el-table-column width="70px" prop="basicSalary" label="基本工资"></el-table-column>
                <el-table-column width="70px" prop="trafficSalary" label="交通补助"></el-table-column>
                <el-table-column width="70px" prop="lunchSalary" label="午餐补助"></el-table-column>
                <el-table-column width="70px" prop="bonus" label="奖金"></el-table-column>
                <el-table-column width="100px" prop="createDate" label="启用时间"></el-table-column>
                <el-table-column label="养老金" align="center">
                    <el-table-column width="70px" prop="pensionPer" label="比率"></el-table-column>
                    <el-table-column width="70px" prop="pensionBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="医疗保险" align="center">
                    <el-table-column width="70px" prop="medicalPer" label="比率"></el-table-column>
                    <el-table-column width="70px" prop="medicalBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="公积金" align="center">
                    <el-table-column width="70px" prop="accumulationFundPer" label="比率"></el-table-column>
                    <el-table-column width="70px" prop="accumulationFundBase" label="基数"></el-table-column>
                </el-table-column>
                <el-table-column label="操作">
                    <template>
                        <el-button>编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                    title="添加工资账套"
                    :visible.sync="dialogVisible"
                    width="50%">
                <div style="display: flex;justify-content: space-around;align-items: center">
                    <el-steps direction="vertical" :active="activeItemIndex">
                        <el-step :title="itemName" v-for="(itemName,index) in salaryItemName" :key="index"></el-step>
                    </el-steps>
                    <el-input :placeholder="'请输入'+itemName+'...'" v-for="(itemName,index) in salaryItemName"
                              :key="index" v-show="activeItemIndex==index" style="width: 200px"></el-input>
                </div>
                <span slot="footer" class="dialog-footer ">
    <el-button @click="preStep">{{activeItemIndex==9?'取消':'上一步'}}</el-button>
    <el-button type="primary" @click="nextStep">{{activeItemIndex==9?'完成':'下一步'}}</el-button>
  </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SalSob",
        data() {
            return {
                salaries: [],
                activeItemIndex: 0,
                salaryItemName: [
                    '基本工资',
                    '交通补助',
                    '午餐补助',
                    '奖金',
                    '养老金比率',
                    '养老金基数',
                    '医疗保险比率',
                    '医疗保险基数',
                    '公积金比率',
                    '公积金基数'
                ],
                dialogVisible: false
            };
        },
        mounted() {
            this.initSalaries();
        },
        methods: {
            preStep() {
                if (this.activeItemIndex == 0) {
                    return;
                }else if (this.activeItemIndex == 9) {
                    this.activeItemIndex = 0;
                    this.dialogVisible = false;
                    return;

                }
                this.activeItemIndex--;
            },
            nextStep() {
                if (this.activeItemIndex == 9) {
                    alert('ok');
                    return;
                }
                this.activeItemIndex++;
            },
            showAddSalaryView() {
                this.dialogVisible = true;
            },
            initSalaries() {
                this.getRequest("/salary/sob/").then(resp => {
                    if (resp) {
                        this.salaries = resp;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>