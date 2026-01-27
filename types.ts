export interface JobType {
  priority: number;
  payload: string;
  createdAt: number;
  id: string;
}
export type PriorityQueue<T> = {
  push(item: T): void;
  peek(): T | null;
  pop(): T | null;
  size(): number;
};
