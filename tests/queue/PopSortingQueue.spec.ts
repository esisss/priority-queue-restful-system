import { describe, expect, test } from 'vitest';
import { PopSortingQueue } from '../../queue/PopSortingQueue';
import { isHigher } from '../../helpers/comparator';

const jobs = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  priority: (i % 3) + 1,
  payload: `job-${i + 1}`,
  createdAt: i + 1,
}));
describe('PopSortingQueue', () => {
  test('pop on empty queue returns null', () => {
    const Queue = new PopSortingQueue(isHigher);
    expect(Queue.pop()).toBe(null);
  });
  test('peek on empty heap returns null', () => {
    const Queue = new PopSortingQueue(isHigher);
    expect(Queue.peek()).toBe(null);
  });
  test('push then pop returns the same item', () => {
    const Queue = new PopSortingQueue(isHigher);
    Queue.push(jobs[0]);
    const poppedJob = Queue.pop();
    expect(poppedJob).toEqual(jobs[0]);
  });
  test('push then peek returns the same item', () => {
    const Queue = new PopSortingQueue(isHigher);
    Queue.push(jobs[0]);
    const peekedJob = Queue.peek();
    expect(peekedJob).toEqual(jobs[0]);
  });
  test('Higher priority wins', () => {
    const Queue = new PopSortingQueue(isHigher);
    const low = { id: 'low', priority: 1, createdAt: 1, payload: '' };
    const mid = { id: 'mid', priority: 2, createdAt: 2, payload: '' };
    const high = { id: 'high', priority: 3, createdAt: 3, payload: '' };
    Queue.push(low);
    Queue.push(mid);
    Queue.push(high);
    const poppedJob = Queue.pop();
    expect(poppedJob).toEqual(high);
    const peekedJob = Queue.peek();
    expect(peekedJob).toEqual(mid);
  });
  test('FIFO ordering for equal priority', () => {
    const Queue = new PopSortingQueue(isHigher);
    const jobs = Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      priority: 1,
      payload: `job-${i + 1}`,
      createdAt: i + 1,
    }));
    const list = [jobs[2], jobs[1], jobs[0], jobs[5], jobs[4], jobs[3]];
    const expectedOrder = [jobs[0], jobs[1], jobs[2], jobs[3], jobs[4], jobs[5]];
    list.forEach((job) => Queue.push(job));
    for (let i = 0; i < list.length; i++) {
      const poppedJob = Queue.pop();
      expect(poppedJob).toEqual(poppedJob);
    }
  });
  test('mixed priority + FIFO ordering', () => {
    const Queue = new PopSortingQueue(isHigher);
    const list = [jobs[2], jobs[1], jobs[0], jobs[3], jobs[4], jobs[5]];
    const expectedOrder = [jobs[2], jobs[5], jobs[1], jobs[4], jobs[0], jobs[3]];
    list.forEach((job) => Queue.push(job));
    for (let i = 0; i < list.length; i++) {
      const poppedJob = Queue.pop();
      expect(poppedJob).toEqual(expectedOrder[i]);
    }
  });
  test('Pop-all matches reference sort', () => {
    const Queue = new PopSortingQueue(isHigher);
    let jobs = Array.from({ length: 100 }, (_, i) => ({
      id: `${i + 1}`,
      priority: (i * 11) % 100,
      payload: `job-${i + 1}`,
      createdAt: i + 1,
    }));
    jobs.forEach((job) => Queue.push(job));
    jobs = jobs.sort((a, b) => {
      if (isHigher(a, b)) return -1;
      if (isHigher(b, a)) return 1;
      return 0;
    });
    jobs.forEach((job) => {
      const lastPop = Queue.pop();
      expect(lastPop).toEqual(job);
    });
    expect(Queue.pop()).toBe(null);
    expect(Queue.peek()).toBe(null);
    expect(Queue.size()).toBe(0);
  });
  test('Pop-all matches reference sort', () => {
    const Queue = new PopSortingQueue(isHigher);
    let jobs = Array.from({ length: 1000 }, (_, i) => ({
      id: `${i + 1}`,
      priority: (i * 11) % 1000,
      payload: `job-${i + 1}`,
      createdAt: i + 1,
    }));
    jobs.forEach((job) => Queue.push(job));
    jobs = jobs.sort((a, b) => {
      if (isHigher(a, b)) return -1;
      if (isHigher(b, a)) return 1;
      return 0;
    });
    jobs.forEach((job) => {
      const lastPop = Queue.pop();
      expect(lastPop).toEqual(job);
    });
    expect(Queue.pop()).toBe(null);
    expect(Queue.peek()).toBe(null);
    expect(Queue.size()).toBe(0);
  });
});
