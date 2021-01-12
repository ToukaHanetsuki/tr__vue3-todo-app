import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

/** タスクステータスのvalue値 */
export const TASK_STATUS = {
  READY: 1,
  DOING: 2,
  DONE: 3
};

/** タスクステータスのラベル */
export const TASK_STATUS_LABEL = {
  READY: '未着手',
  DOING: '着手中',
  DONE: '完了'
};

export class TaskModel {
  constructor({
    name,
    deadlineAt
  }) {
    this.id = uuid(); // 固有ID
    this.name = name; // タスク名
    this.status = TASK_STATUS.READY; // タスクステータス
    this.deadlineAt = deadlineAt; // 締め切り日
    this.completeAt = undefined; // 完了時刻
    this.createdAt = dayjs().format('YYYY-MM-DDTHH:mm'); // 現在時刻
  }
}