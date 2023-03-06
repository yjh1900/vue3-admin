<template>
  <el-card>
    <!-- 
      普通数据使用props通信
        title\value
      标签数据使用插槽通信
        body\footer

        最重要的内容优先考虑默认插槽，其他插槽用具名
     -->
    <div class="card-title">今日销售额</div>
    <div class="card-data">30346799</div>

    <div class="card-container"><slot /></div>
    <div class="card-footer"><slot name="footer"></slot></div>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "CommonCart",
};
</script>

<script lang="ts" setup></script>

<style scoped>
.card-title {
  font-size: 12px;
}
.card-data {
  font-size: 24px;
  padding: 5px 0;
}
.card-container {
  height: 50px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.card-footer {
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 12px;
}
</style>
