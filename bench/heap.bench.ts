import { Heap } from '../heap/Heap';
import { isHigher } from '../helpers/comparator';
import { PopSortingQueue } from '../queue/PopSortingQueue';
import { JobType } from '../types';
import { benchmark } from './sanitycheck';

class ArrayQueue<T> {
  private arr: T[] = [];

  constructor(private isHigher: (a: T, b: T) => boolean) {}

  push(item: T) {
    this.arr.push(item);
  }

  sort() {
    this.arr.sort((a, b) => {
      if (this.isHigher(a, b)) return -1;
      if (this.isHigher(b, a)) return 1;
      return 0;
    });
  }
  pop(): T | null {
    if (this.arr.length === 0) return null;
    return this.arr.shift() ?? null;
  }
}

const N = 10000;

const jobs: JobType[] = Array.from({ length: N }, (_, i) => ({
  id: `${i}`,
  priority: (i * 11) % 100,
  createdAt: i,
  payload: '',
}));

benchmark('ArrayQueue', () => {
  const q = new ArrayQueue(isHigher);
  for (const job of jobs) q.push(job);
  q.sort();
  for (let i = 0; i < jobs.length; i++) q.pop();
});
benchmark('PopSortingQueue', () => {
  const q = new PopSortingQueue(isHigher);
  for (const job of jobs) q.push(job);
  for (let i = 0; i < jobs.length; i++) q.pop();
});

benchmark('Heap', () => {
  const h = new Heap(isHigher);
  for (const job of jobs) h.push(job);
  for (let i = 0; i < jobs.length; i++) h.pop();
});
