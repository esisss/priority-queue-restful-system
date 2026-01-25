import { HeapType, JobType } from '../types.js';

export class Heap implements HeapType<JobType> {
  // a must be closer to root than be for isPriority(a, b) === true
  isPriority: (a: JobType, b: JobType) => boolean;
  constructor(isPriority: (a: JobType, b: JobType) => boolean) {
    this.isPriority = isPriority;
  }
  private heapArray: JobType[] = [];
  private swap(a: number, b: number): void {
    const temp = this.heapArray[a];
    this.heapArray[a] = this.heapArray[b];
    this.heapArray[b] = temp;
  }
  private siftUp(a: number): void {
    while (a > 0) {
      const parentIndex = Math.floor((a - 1) / 2);
      const parent = this.heapArray[parentIndex];
      if (this.isPriority(this.heapArray[a], parent)) {
        this.swap(a, parentIndex);
        a = parentIndex;
      } else {
        break;
      }
    }
  }
  private siftDown(b: number): void {
    while (b <= this.heapArray.length / 2 - 1) {
      const left = b * 2 + 1;
      const right = b * 2 + 2;
      const child = this.heapArray[right]
        ? this.isPriority(this.heapArray[left], this.heapArray[right])
          ? left
          : right
        : left;
      if (this.isPriority(this.heapArray[child], this.heapArray[b])) {
        this.swap(child, b);
        b = child;
      } else {
        break;
      }
    }
  }

  push(job: JobType) {
    this.heapArray.push(job);
    if (this.heapArray.length > 1) {
      this.siftUp(this.heapArray.length - 1);
    }
  }
  pop() {
    if (!this.heapArray.length) return null;
    this.swap(0, this.heapArray.length - 1);
    const popped = this.heapArray.pop();
    this.siftDown(0);
    return popped!;
  }
  peek() {
    return this.heapArray[0] ?? null;
  }
  size() {
    return this.heapArray.length;
  }
}
