<template>
  <form @submit.prevent="submit">
    <p>
      <label>
        タスク名
        <input
          v-model="form.taskName"
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

/** 現在の時刻を取得 */
const getCurrentAt = () => dayjs().format('YYYY-MM-DDTHH:mm');

/** 入力フォームの初期値を作成 */
const initializeForm = () => ({
  taskName: '',
  deadlineAt: getCurrentAt()
});

export default {
  name: 'InputTaskForm',
  emits: {
    submit: null
  },
  data: () => ({
    form: initializeForm() // 入力フォーム
  }),
  computed: {
    /** 締め切り日の最小値の算出 */
    minDeadlineAt() {
      return getCurrentAt();
    }
  },
  methods: {
    /** 親コンポーネントに入力値を送る */
    submit() {
      // 親コンポーネントに入力値を送る
      this.$emit('submit', this.form);

      // 入力値の初期化
      this.form = initializeForm();
    }
  }
};
</script>
