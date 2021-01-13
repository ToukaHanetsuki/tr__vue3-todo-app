<template>
  <form @submit.prevent="submit">
    <p>
      <label>
        タスク名
        <input
          v-model="internalName"
          type="text"
          required
        >
      </label>
    </p>
    <p>
      <label>
        期日
        <input
          v-model="internalDeadlineAt"
          type="datetime-local"
          :min="minDeadlineAt"
          required
        >
      </label>
    </p>
    <p>
      <input
        type="submit"
        value="作成"
      >
    </p>
  </form>
</template>

<script>
import dayjs from 'dayjs';
import { computed } from 'vue';

export default {
  name: 'InputTaskForm',
  props: {
    name: {
      type: String,
      required: true
    },
    deadlineAt: {
      type: String,
      required: true
    },
    minDeadlineAt: {
      type: String,
      default: dayjs().format('YYYY-MM-DDTHH:mm')
    }
  },
  emits: {
    'update:name': null,
    'update:deadlineAt': null,
    'submit': null
  },
  setup(props, ctx) {
    return {
      /** タスク名 */
      internalName: computed({
        get: () => props.name,
        set: (v) => ctx.emit('update:name', v)
      }),
      /** 期日 */
      internalDeadlineAt: computed({
        get: () => props.deadlineAt,
        set: (v) => ctx.emit('update:deadlineAt', v)
      }),
      /** 親コンポーネントに入力値を送る */
      submit: () => ctx.emit('submit')
    };
  }
};
</script>
