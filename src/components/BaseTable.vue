<template>
  <table>
    <thead>
      <tr>
        <th v-if="before">
          <slot name="th-before" />
        </th>
        <th
          v-for="key in keys"
          :key="key"
        >
          <slot
            :key="key"
            :name="`th-${key}`"
          >
            {{ key }}
          </slot>
        </th>
        <th v-if="after">
          <slot name="th-after" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="task in tasks"
        :key="task.id"
      >
        <th v-if="before">
          <slot
            name="td-before"
            :task="task"
          />
        </th>
        <td
          v-for="key in keys"
          :key="key"
        >
          <slot
            :task="task"
            :name="`td-${key}`"
          >
            {{ task[key] }}
          </slot>
        </td>
        <td v-if="after">
          <slot
            name="td-after"
            :task="task"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    before: {
      type: Boolean,
      require: true
    },
    after: {
      type: Boolean,
      require: true
    },
    keys: {
      type: Array,
      require: true,
      default: () => []
    },
    tasks: {
      type: Array,
      require: true,
      default: () => []
    }
  }
};
</script>