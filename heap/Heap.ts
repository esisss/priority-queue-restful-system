import { HeapType, JobType } from '../types.js';

export class Heap implements HeapType<JobType> {
  // a must be closer to root than be for isPriority(a, b) === true
  isPriority: (a: JobType, b: JobType) => boolean;
  constructor(isPriority: (a: JobType, b: JobType) => boolean) {
    this.isPriority = isPriority;
  }
  private heapArray: JobType[] = [];
  private swap(a: number, b: number): void {}
  private siftUp(a: number): void {}
  private siftDown(b: number): void {}

  push(job: JobType) {}
  peek() {
    return null;
  }
  pop() {
    return null;
  }
  size() {
    return 0;
  }
}
