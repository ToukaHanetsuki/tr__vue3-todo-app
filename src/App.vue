<template>
  <h1>Vue3 TODO APP</h1>

  <h2>登録フォーム</h2>
  <InputTaskForm @submit="addToTasks" />
  <pre><code>{{ tasks }}</code></pre>
</template>

<script>
import InputTaskForm from '@/components/InputTaskForm.vue';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { StorageService } from '@/service/storageService';

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
      const task = this.createTask(params);

      // リストにタスクを追加する
      this.tasks.push(task);

      // タスクリストの保存
      this.saveTasksToStorage();
    },
    /** 引数を元にタスクを作成する */
    createTask(params) {
      return {
        id: uuid(), // 固有ID
        createdAt: dayjs().format('YYYY-MM-DDTHH:mm'), // 現在時刻
        compuleteAt: null, // 完了時刻
        status: 0, // タスクステータス
        ...params // スプレッド演算子で引数を分解
      };
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
