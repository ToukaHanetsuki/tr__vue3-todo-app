import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export class TaskModel {
  constructor({
    name,
    deadlineAt
  }) {
    this.id = uuid(); // 固有ID
    this.name = name; // タスク名
    this.status = 0; // タスクステータス
    this.deadlineAt = deadlineAt; // 締め切り日
    this.completeAt = undefined; // 完了時刻
    this.createdAt = dayjs().format('YYYY-MM-DDTHH:mm'); // 現在時刻
  }
}