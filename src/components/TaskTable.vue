<template>
  <BaseTable
    :tasks="tasks"
    :keys="headerKeys"
    :after="true"
  >
    <!-- thead -->
    <template
      v-for="header in headers"
      #[`th-${header.key}`]
    >
      {{ header.label }}
    </template>

    <!-- tbody -->
    <template #td-deadlineAt="{ task }">
      {{ formatDateTime(task.deadlineAt) }}
    </template>
    <template #td-createdAt="{ task }">
      {{ formatDateTime(task.createdAt) }}
    </template>
    <template #td-completeAt="{ task }">
      {{ formatDateTime(task.completeAt) }}
    </template>

    <!-- after -->
    <template #td-after="{ task }">
      <button @click="deleteTask(task.id)">
        削除
      </button>
    </template>
  </BaseTable>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import dayjs from 'dayjs';

export default {
  name: 'TaskTable',
  components: {
    BaseTable
  },
  props: {
    tasks: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  emits: {
    deleteTask: null
  },
  data: () => ({
    headers: [
      {key: 'name', label: 'タスク名'},
      {key: 'deadlineAt', label: '期日'},
      {key: 'createdAt', label: '作成日'},
      {key: 'completeAt', label: '完了日'},
      {key: 'status', label: '状態'}
    ] // テーブルヘッダー
  }),
  computed: {
    /** ヘッダーのキー配列の算出 */
    headerKeys() {
      return this.headers.map(v => v.key);
    }
  },
  methods: {
    /** 日付をフォーマット */
    formatDateTime(date) {
      // dateの存在チェック
      // undefinedだった場合はそのまま返す
      return date && dayjs(date).format('YYYY年MM月DD日 HH:mm');
    },

    deleteTask(targetId) {
      this.$emit('deleteTask', targetId);
    }
  }
};
</script>