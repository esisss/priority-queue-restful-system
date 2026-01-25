import { JobType, HeapType } from '../types';

export class PopSortingQueue implements HeapType<JobType> {
  isPriority: (a: JobType, b: JobType) => boolean;
  constructor(isPriority: (a: JobType, b: JobType) => boolean) {
    this.isPriority = isPriority;
  }

  private queueArray: JobType[] = [];
  sort() {
    this.queueArray.sort((a, b) => {
      if (this.isPriority(a, b)) return -1;
      if (this.isPriority(b, a)) return 1;
      return 0;
    });
  }
  push(job: JobType) {
    this.queueArray.push(job);
  }
  pop() {
    if (!this.queueArray.length) return null;
    if (this.queueArray.length === 1) return this.queueArray.pop()!;
    this.sort();
    const popped = this.queueArray[0];
    this.queueArray[0] = this.queueArray.pop()!;
    return popped!;
  }
  peek() {
    this.sort();
    return this.queueArray[0] ?? null;
  }
  size() {
    return this.queueArray.length;
  }
}
