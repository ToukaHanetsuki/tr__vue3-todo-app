<template>
  <BaseTable
    :records="tasks"
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
    <template #td-deadlineAt="{ deadlineAt }">
      {{ formatDateTime(deadlineAt) }}
    </template>
    <template #td-createdAt="{ createdAt }">
      {{ formatDateTime(createdAt) }}
    </template>
    <template #td-completeAt="{ completeAt }">
      {{ formatDateTime(completeAt) }}
    </template>
    <template #td-status="{ status, id }">
      <select
        :value="status"
        @change="changeStatus($event, id)"
      >
        <option
          v-for="option in statusOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </template>

    <!-- after -->
    <template #td-after="{ record }">
      <button @click="deleteTask(record.id)">
        削除
      </button>
    </template>
  </BaseTable>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue';
import dayjs from 'dayjs';
import { TASK_STATUS, TASK_STATUS_LABEL } from '@/model/taskModel';
import { ref, computed } from 'vue';

export default {
  name: 'TaskTable',
  components: {
    BaseTable
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  emits: {
    deleteTask: null,
    changeStatus: null
  },
  setup(props, cxt) {
    /** テーブルヘッダー */
    const headers = ref([
      {key: 'name', label: 'タスク名'},
      {key: 'deadlineAt', label: '期日'},
      {key: 'createdAt', label: '作成日'},
      {key: 'completeAt', label: '完了日'},
      {key: 'status', label: '状態'}
    ]);

    return {
      headers,

      /** ヘッダーのキー配列の算出 */
      headerKeys: computed(() => headers.value.map(v => v.key)),

      /** ステータスの選択肢を算出 */
      statusOptions: computed(() => {
        return Object.entries(TASK_STATUS).map(([key, value]) => {
          return { value, label: TASK_STATUS_LABEL[key]};
        });
      }),

      /** 日付をフォーマット */
      formatDateTime: (date) => {
        // dateの存在チェック
        // undefinedだった場合はそのまま返す
        return date && dayjs(date).format('YYYY年MM月DD日 HH:mm');
      },

      /** 親コンポーネントに削除イベントを通知する */
      deleteTask: (targetId) => {
        cxt.emit('deleteTask', targetId);
      },

      /** 親コンポーネントにステータス変更を通知する */
      changeStatus: (event, id) => {
        // 第一引数: value
        // 第二引数: id
        cxt.emit('changeStatus', event.target.value, id);
      }
    };
  }
};
</script>