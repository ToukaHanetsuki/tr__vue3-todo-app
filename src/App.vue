<template>
  <h1>Vue3 TODO APP</h1>

  <h2>登録フォーム</h2>
  <InputTaskForm @submit="addToTasks" />
  <pre><code>{{ tasks }}</code></pre>
</template>

<script>
import InputTaskForm from '@/components/InputTaskForm.vue';
import { StorageService } from '@/service/storageService';
import { TaskModel } from '@/model/TaskModel';

export default {
  name: 'App',
  components: {
    InputTaskForm
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
    addToTasks(params) {
      // 入力値を元にタスクを作成する
      const task = new TaskModel(params);

      // リストにタスクを追加する
      this.tasks.push(task);

      // タスクリストの保存
      this.saveTasksToStorage();
    },
    /** タスクリストを取得する */
    fetchTasksToStorage() {
      // 取得したリストをdataに反映
      this.task = StorageService.fetchTasks();
    },
    /** タスクリストを保存する */
    saveTasksToStorage() {
      // ローカルストレージにタスクリストを保存
      StorageService.saveTasks(this.tasks);
    }
  }
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
