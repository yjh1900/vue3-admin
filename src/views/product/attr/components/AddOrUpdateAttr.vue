<template>
  <div>
    <el-card class="mt-20">
      <el-form>
        <el-form-item label="属性名">
          <el-input
            v-model="attrFormData.attrName"
            style="width: 250px"
            placeholder="请输入属性名"
          ></el-input>
        </el-form-item>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addAttrValue"
          :disabled="!attrFormData.attrName"
          >添加属性值</el-button
        >
        <el-table
          border
          class="mt-20"
          :data="attrFormData.attrValueList"
          :loading="loading"
        >
          <el-table-column
            label="序号"
            type="index"
            width="60"
            align="center"
          />
          <el-table-column label="属性值名称" prop="valueName">
            <!-- 
                场景：点击添加按钮后，向一个表格中添加一行数据。新增一行默认显示输入框，并且光标聚焦。数据内容在表格的input输入框中填写，失去焦点保存数据并隐藏输入框，显示文本。单击文本单元格进入编辑状态，输入框显示，文本隐藏。

                实现：使用input标签和p标签绑定数据，默认显示p文本，双击单元格进入编辑状态，显示input标签，并且获取光标焦点

                控制切换标签方法：v-if和v-show:

                - v-if：每次切换input和p元素的时候，dom元素重新挂载和销毁
                        给input标签的ref绑定inputRef对象，每次添加数据和双击修改数据时，在页面数据渲染完成后执行inputRef.value.focus()

                - v-show：每次显示隐藏时，input和div并没有销毁，
                          隐藏只是是控制css样式的display:none;
                          这里再使用上面v-if的方法存在一个问题，点击p标签后input输入框显示，但是光标并不能直接聚焦，只有点击最后一行数据的光标能够直接聚焦。
                          原因：
                          在添加操作时inputRef绑定上了最后一项，所以点击div时只有最后一项能够直接获得焦点。ref本身是作为渲染函数的结果来创建的，必须等待组件挂载后才能对它进行访问。而使用v-show并不会使组件销毁，因此也不会重新挂载，所以inputRef的值一直是最后一个添加的input元素的dom节点。
                          解决方法：
                          1.修改成v-if和v-else
                          2.将inputRef定义成一个数组，把每一项input都绑定上自己的ref值，每次添加数据和双击修改时，在页面数据渲染完成后执行inputRef.value[index].focus()

                推荐使用v-show，数据项很多的时候可以大程度的提升性能，减少组件挂载销毁频率

                总结：v-show显示隐藏只是控制css样式的display，v-if显示隐藏会使dom元素重新挂载和销毁。ref本身是作为渲染函数的结果来创建的，必须等待组件挂载后才能对它进行访问。
            -->
            <!-- :ref="(input) => (inputRef[$index] = input)" -->
            <!-- ref="inputRef" -->

            <template v-slot="{ row, $index }">
              <el-input
                :ref="(input:any) => (inputRef[$index] = input)"
                size="small"
                v-model="row.valueName"
                v-show="row.isEdit"
                @blur="editDone(row, $index)"
              ></el-input>
              <div v-show="!row.isEdit" @click="editName(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                :title="`确认删除${scope.row.valueName}吗`"
                @confirm="deleteFormList(scope.row, scope.index)"
              >
                <template #reference>
                  <el-button
                    :icon="Delete"
                    type="danger"
                    size="small"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-form-item class="mt-20">
          <el-button
            type="primary"
            @click="saveHandle"
            :disabled="!attrFormData.attrName"
            >保存</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "AddOrUpdateAttr",
};
</script>

<script lang="ts" setup>
import { reactive, ref, nextTick, onMounted } from "vue";
// input标签的实例对象
import type { InputInstance } from "element-plus";
import { Delete, Plus } from "@element-plus/icons-vue";
import type { AttrListData, AttrItem } from "@/api/product/model/attrModel";
import { addAttrValueListApi } from "@/api/product/attr";
import { useCategoryStore } from "@/stores/category";

const inputRef = ref<InputInstance[]>([]);

const attrFormData = reactive<AttrListData>({
  attrName: "",
  attrValueList: [],
});
const loading = ref(false);

// 点击新增属性值
const addAttrValue = async () => {
  attrFormData.attrValueList.push({
    isEdit: true, // 编辑模式和显示模式
    valueName: "", // 属性值名称
  });
  // 让input获取焦点
  // 当DOM元素渲染完成，再触发回调函数

  /*
    const resolvedPromise = Promise.resolve();
    let currentFlushPromise = null;
    function nextTick(fn) {
      // p是一个成功状态的promise对象
      const p = currentFlushPromise || resolvedPromise;
      return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    Promise.resolve().then(fn) // fn是异步执行
    nextTick将要执行的代码，添加到异步队列（将来异步执行，通过Promise.then方法添加到异步队列的）
  */
  // nextTick(() => {
  //   inputRef.value.focus();
  // });
  // 当DOM元素渲染完成，变成成功状态，继续执行下面代码
  await nextTick();
  //   inputRef.value.focus();
  //   不能使用inputRef.value.length判断，因为删除操作时删除了列表项数据，
  //   inputRef.value绑定的input的ref数组数据没有被删除
  inputRef.value[attrFormData.attrValueList.length - 1].focus();
};
// 提交表单数据，添加属性
const saveHandle = async () => {
  const { attrName, attrValueList } = attrFormData;
  await addAttrValueListApi({
    attrName,
    attrValueList,
    categoryId: useCategoryStore().category3Id,
    categoryLevel: 3,
    id: props.attrRow?.id,
  });
  emit("setShowAttrList", true);
};
// 删除属性值
const deleteFormList = (row: AttrItem, index: number) => {
  attrFormData.attrValueList.splice(index, 1);
};
// 编辑完成
const editDone = (row: AttrItem, index: number) => {
  if (!row.valueName.trim()) {
    attrFormData.attrValueList.splice(index, 1);
    return;
  }
  row.isEdit = false;
};
// 点击编辑
const editName = async (row: AttrItem, index: number) => {
  row.isEdit = true;
  await nextTick();
  inputRef.value[index].focus();
};

// 自定义事件setShowAttrList
const emit = defineEmits(["setShowAttrList"]);

// setShowAttrList
const cancel = () => {
  emit("setShowAttrList", true);
};

const props = defineProps(["attrRow"]);

onMounted(() => {
  if (!props.attrRow) return;
  attrFormData.attrValueList = props.attrRow.attrValueList;
  attrFormData.attrName = props.attrRow.attrName;
});
</script>

<style scoped></style>
