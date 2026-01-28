import { describe, expect, test } from 'vitest';
import QueueManager from '../../QueueManager/QueueManager';
import { isHigher } from '../../helpers/comparator';
import { HeapPriorityQueue } from '../../heap/Heap';

const arrOfQueueNames = new Array(10).fill(null).map((el, index) => `queue-${index}`);
const jobs = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  priority: (i % 3) + 1,
  payload: `job-${i + 1}`,
  createdAt: i + 1,
}));

describe('QueueManager', () => {
  // For now, QueueManager only creates Heap based Priotity Queues, the possibility to pass Queue type as parameter could be analyzed in the future.
  test('addQueue creates a new heap and returns it', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((queueName) => {
      const heap = queueManager.addQueue(queueName, isHigher);
      expect(heap).toBeInstanceOf(HeapPriorityQueue);
    });
  });
  test('addQueue throws error on attempt to add a duplicated name', () => {
    const queueManager = new QueueManager();
    queueManager.addQueue('testingduplicates', isHigher);
    expect(() => queueManager.addQueue('testingduplicates', isHigher)).toThrowError();
  });
  test('getQueueNames must return array of names in the inserted order', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    const queueNames = queueManager.getQueuesNames();
    queueNames.forEach((name, index) => {
      expect(name).toEqual(arrOfQueueNames[index]);
    });
  });
  test('deleteQueueByName deletes the queue with the given name', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    queueManager.deleteQueueByName('queue-5');
    const queueNames = queueManager.getQueuesNames();
    expect(queueNames).not.toContain('queue-5');
  });
  test('deleteQueueByName throws error on attempt to delete a non-existent queue', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    expect(() => queueManager.deleteQueueByName('non-existent')).toThrowError();
  });
  test('queueJob to an existing queue should return the job', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    const job = {
      priority: 1,
      payload: '',
      id: '1',
      createdAt: Date.now(),
    };
    const queueResponse = queueManager.queueJob('queue-1', job);
    expect(queueResponse).toEqual(job);
  });
  test('queueJob to a non-existent queue should throw an error', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    expect(() =>
      queueManager.queueJob('non-existent', {
        priority: 1,
        payload: '',
        id: '1',
        createdAt: Date.now(),
      })
    ).toThrowError();
  });
  test('dequeueJob from an existing queue should return the job', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    const job = queueManager.queueJob('queue-1', {
      priority: 1,
      payload: '',
      id: '1',
      createdAt: Date.now(),
    });
    const dequeuedJob = queueManager.dequeueJob('queue-1');
    expect(dequeuedJob).toEqual(job);
  });
  test('dequeueJob from a non-existent queue should throw an error', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    expect(() => queueManager.dequeueJob('non-existent')).toThrowError();
  });
  test('dequeueJob from an empty queue should throw an error', () => {
    const queueManager = new QueueManager();
    arrOfQueueNames.forEach((name) => {
      queueManager.addQueue(name, isHigher);
    });
    expect(() => queueManager.dequeueJob('queue-1')).toThrowError();
  });
  test('Queue manager preserve ordering stability of comparator', () => {
    const queueManager = new QueueManager();
    queueManager.addQueue('testing-order', isHigher);
    jobs.forEach((job) => {
      queueManager.queueJob('testing-order', job);
    });
    const testedQueue = queueManager.getQueueByName('testing-order');
    const orderedJobs = [...jobs].sort((a, b) => (isHigher(a, b) ? -1 : 1));
    const dequeuedJobs = [];
    if (!testedQueue) {
      throw Error('Tested queue is not defined');
    }
    while (testedQueue.size() > 0) {
      dequeuedJobs.push(queueManager.dequeueJob('testing-order'));
    }
    expect(dequeuedJobs).toEqual(orderedJobs);
  });
});
