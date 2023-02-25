<template>
  <div>
    <CategorySelector />
    <!-- 
      切换显示组件：AttrList / AddOrUpdateAttr

      isShowAttrList = $event

        isShowAttrList = 触发事件传递的第一个参数

      $event
        简单理解：是event对象
        真正理解：代表触发事件传递的第一个参数
          过去，绑定原生DOM事件（click），事件回调函数的第一个参数event对象，所以$event的值就是event对象
          现在，绑定自定义事件，触发自定义事件传递参数，此时$event的值就是触发事件传递的第一个参数
     -->
    <AttrList
      v-if="isShowAttrList"
      @setShowAttrList="isShowAttrList = $event"
    />
    <AddOrUpdateAttr v-else @setShowAttrList="isShowAttrList = $event" />
  </div>
</template>

<script lang="ts">
export default {
  name: "Attr",
};
</script>

<script lang="ts" setup>
import CategorySelector from "@/components/CategorySelector/index.vue";
import AddOrUpdateAttr from "./components/AddOrUpdateAttr.vue";
import AttrList from "./components/AttrList.vue";
import { ref } from "vue";

const isShowAttrList = ref(true);
</script>

<style scoped></style>
