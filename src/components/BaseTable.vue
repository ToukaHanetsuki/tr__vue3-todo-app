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
        v-for="record in records"
        :key="record.id"
      >
        <th v-if="before">
          <slot
            name="td-before"
            :record="record"
          />
        </th>
        <td
          v-for="key in keys"
          :key="key"
        >
          <slot
            v-bind="record"
            :name="`td-${key}`"
          >
            {{ record[key] }}
          </slot>
        </td>
        <td v-if="after">
          <slot
            name="td-after"
            :record="record"
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
      required: true
    },
    after: {
      type: Boolean,
      required: true
    },
    keys: {
      type: Array,
      required: true
    },
    records: {
      type: Array,
      required: true
    }
  }
};
</script>