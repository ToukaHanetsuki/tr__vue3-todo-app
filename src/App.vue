<template>
  <h1>Vue3 TODO APP</h1>

  <h2>登録フォーム</h2>
  <InputTaskForm @submit="addTask" />

  <h2>タスクテーブル</h2>
  <TaskTable
    :tasks="tasks"
    @deleteTask="deleteTask"
    @changeStatus="changeStatus"
  />
</template>

<script>
import InputTaskForm from '@/components/InputTaskForm.vue';
import TaskTable from '@/components/TaskTable.vue';
import { StorageService } from '@/service/storageService';
import { TaskModel } from '@/model/taskModel';
import { ref, onBeforeMount } from 'vue';

export default {
  name: 'App',
  components: {
    InputTaskForm,
    TaskTable
  },
  setup() {
    /** タスクリスト */
    const tasks = ref([]);

    /** タスクリストを取得する */
    const fetchTasksToStorage = () => {
      // 取得したリストをdataに反映
      tasks.value = StorageService.fetchTasks();
    };

    onBeforeMount(() => {
      // タスクリストの取得
      fetchTasksToStorage();
    });

    return {
      tasks,
      /** リストにタスクを追加する */
      addTask: (params) => {
        // 入力値を元にタスクを作成する
        const task = new TaskModel(params);

        // リストにタスクを追加する
        tasks.value.push(task);

        // ローカルストレージにタスクリストを保存
        StorageService.saveTasks(tasks.value);
      },
      /** リストからタスクを削除する */
      deleteTask: (targetId) => {
        // 対象のID以外を抽出して反映
        tasks.value = tasks.value.filter(v => v.id !== targetId);

        // ローカルストレージにタスクリストを保存
        StorageService.saveTasks(tasks.value);
      },
      /** タスクのステータスを変更 */
      changeStatus: (newStatus, targetId) => {
        // 対象のIDのタスクを検索
        const target = tasks.value.find(v => v.id === targetId);

        // ステータスを更新
        target.status = newStatus;

        // ローカルストレージにタスクリストを保存
        StorageService.saveTasks(tasks.value);
      }
    };
  }
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
