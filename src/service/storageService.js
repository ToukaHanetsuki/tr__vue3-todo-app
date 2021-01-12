/** タスクリストを保存するストレージのKEY */
const STORAGE_KEY = 'tasks';

export class StorageService {

  /** ローカルストレージからタスクリストを取得する */
  static fetchTasks() {
    // ローカルストレージからリストを取得
    const tasks = localStorage.getItem(STORAGE_KEY);

    // リストがあればパースして返す。なければ空配列を返す
    return tasks ? JSON.parse(tasks) : [];
  }

  /** ローカルストレージにタスクリストを保存する */
  static saveTasks(tasks) {
    // ローカルストレージにタスクリストを保存
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}