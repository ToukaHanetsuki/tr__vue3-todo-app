<template>
  <form @submit.prevent="submit">
    <p>
      <label>
        タスク名
        <input
          v-model="form.name"
          type="text"
          required
        >
      </label>
    </p>
    <p>
      <label>
        期日
        <input
          v-model="form.deadlineAt"
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
import { ref, computed } from 'vue';

export default {
  name: 'InputTaskForm',
  emits: {
    submit: null
  },
  setup(props, ctx) {
    /** 入力フォーム */
    const form = ref(initializeForm());

    /** 入力フォームの初期値を作成 */
    const initializeForm = () => ({
      name: '',
      deadlineAt: getCurrentAt()
    });

    /** 現在の時刻を取得 */
    const getCurrentAt = () => dayjs().format('YYYY-MM-DDTHH:mm');

    return {
      form,
      /** 締め切り日の最小値の算出 */
      minDeadlineAt: computed(() => getCurrentAt()),
      /** 親コンポーネントに入力値を送る */
      submit: () => {
        // 親コンポーネントに入力値を送る
        ctx.emit('submit', form.value);

        // 入力値の初期化
        form.value = initializeForm();
      }
    };
  }
};
</script>
