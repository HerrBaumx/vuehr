<template>
    <div>
        <div>
            <el-table :data="emps" border stripe size="mini">
                <el-table-column type="selection" align="left" width="55px"></el-table-column>
                <el-table-column prop="name" label="姓名" align="left" width="120px" fixed></el-table-column>
                <el-table-column prop="workID" label="工号" align="left" width="120px"></el-table-column>
                <el-table-column prop="email" label="电子邮件" align="left" width="180px"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="left" width="120px"></el-table-column>
                <el-table-column prop="department.name" label="所属部门" align="left" width="120px"></el-table-column>
                <el-table-column label="所属部门" align="center" width="180px">
                    <template slot-scope="scope">
                        <el-tooltip placement="right" v-if="scope.row.salary">
                            <div slot="content">
                                <table>
                                    <tr>
                                        <td>基本工资</td>
                                        <td>{{scope.row.salary.basicSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>交通补助</td>
                                        <td>{{scope.row.salary.trafficSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>午餐补助</td>
                                        <td>{{scope.row.salary.lunchSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>奖金</td>
                                        <td>{{scope.row.salary.bonus}}</td>
                                    </tr>
                                    <tr>
                                        <td>养老金比率</td>
                                        <td>{{scope.row.salary.pensionPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>养老金基数</td>
                                        <td>{{scope.row.salary.pensionBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>医疗保险比率</td>
                                        <td>{{scope.row.salary.medicalPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>医疗保险基数</td>
                                        <td>{{scope.row.salary.medicalBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>公积金比率</td>
                                        <td>{{scope.row.salary.accumulationFundPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>公积金基数</td>
                                        <td>{{scope.row.salary.accumulationFundBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>启用时间</td>
                                        <td>{{scope.row.salary.createDate}}</td>
                                    </tr>
                                </table>
                            </div>
                            <el-tag>{{scope.row.salary.name}}</el-tag>
                        </el-tooltip>

                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180px">
                    <template slot-scope="scope">
                        <el-popover
                                placement="left"
                                title="修改工资账套"
                                width="200"
                                @show="showPop(scope.row.salary)"
                                trigger="click">
                            <div>
                                <el-select v-model="currentSalary" placeholder="请选择" size="mini">
                                    <el-option
                                            v-for="item in salaries"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button slot="reference" type="danger">修改工资账套</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SalSobCfg",
        data() {
            return {
                currentSalary: -1,
                emps: [],
                salaries: []
            };
        },
        mounted() {
            this.initEmps();
            this.initSalaries();
        },
        methods: {
            showPop(data) {
                this.currentSalary = data.id;
            },
            initSalaries() {
                this.getRequest("/salary/sobcfg/salaries").then(resp => {
                    if (resp) {
                        this.salaries = resp;
                    }
                });
            },
            initEmps() {
                this.getRequest("/salary/sobcfg/").then(resp => {
                    if (resp) {
                        this.emps = resp.data;
                    }
                });
            }
        }

    }
</script>

<style scoped>

</style>