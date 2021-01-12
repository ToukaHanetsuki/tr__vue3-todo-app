<template>
  <h1>Vue3 TODO APP</h1>

  <h2>登録フォーム</h2>
  <InputTaskForm @submit="addTask" />

  <h2>タスクテーブル</h2>
  <TaskTable
    :tasks="tasks"
    @deleteTask="deleteTask"
  />
</template>

<script>
import InputTaskForm from '@/components/InputTaskForm.vue';
import TaskTable from '@/components/TaskTable.vue';
import { StorageService } from '@/service/storageService';
import { TaskModel } from '@/model/taskModel';

export default {
  name: 'App',
  components: {
    InputTaskForm,
    TaskTable
  },
  data: () => ({
    tasks: [] // タスクリスト
  }),
  created() {
    // タスクリストの取得
    this.fetchTasksToStorage();
  },
  methods: {

    /** リストにタスクを追加する */
    addTask(params) {
      // 入力値を元にタスクを作成する
      const task = new TaskModel(params);

      // リストにタスクを追加する
      this.tasks.push(task);

      // ローカルストレージにタスクリストを保存
      StorageService.saveTasks(this.tasks);
    },

    /** リストからタスクを削除する */
    deleteTask(targetId) {
      // 対象のID以外を抽出して反映
      this.tasks = this.tasks.filter(v => v.id !== targetId);

      // ローカルストレージにタスクリストを保存
      StorageService.saveTasks(this.tasks);
    },

    /** タスクリストを取得する */
    fetchTasksToStorage() {
      // 取得したリストをdataに反映
      this.tasks = StorageService.fetchTasks();
    }
  }
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
