import { HeapType, Job } from '../types.js';

export class Heap implements HeapType<JobType> {
  // a must be closer to root than be for isPriority(a, b) === true
  isPriority: (a: Job, b: Job) => boolean;
  constructor(isPriority: (a: Job, b: Job) => boolean) {
    this.isPriority = isPriority;
  }
  private heapArray: Job[] = [];
  private swap(a: number, b: number): void {}
  private siftUp(a: number): void {}
  private siftDown(b: number): void {}

  push(job: Job) {}
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
