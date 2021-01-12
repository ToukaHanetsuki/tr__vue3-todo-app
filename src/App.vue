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

/** タスクリストを保存するストレージのKEY */
const STORAGE_KEY = 'tasks';

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
    /** ローカルストレージからタスクリストを取得する */
    fetchTasksToStorage() {
      // ローカルストレージからリストを取得
      const tasks = localStorage.getItem(STORAGE_KEY);

      // リストの存在確認
      if (tasks) {
        // 取得したリストをdataに上書き
        this.tasks = JSON.parse(tasks);
      }
    },
    /** ローカルストレージにタスクリストを保存する */
    saveTasksToStorage() {
      // ローカルストレージにタスクリストを保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    }
  }
};
</script>

<style scoped>
  h1 {
    text-align: center;
  }
</style>
