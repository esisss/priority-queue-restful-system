import { HeapPriorityQueue } from '../heap/Heap';
import { PriorityQueue, JobType } from '../types';

interface QueueRecord {
  queue: PriorityQueue<JobType>;
}
export default class QueueManager {
  private queues: Map<string, QueueRecord>;

  constructor() {
    this.queues = new Map<string, QueueRecord>();
  }

  addQueue(name: string, comparator: (a: JobType, b: JobType) => boolean): PriorityQueue<JobType> {
    if (this.queues.has(name)) throw new Error(`Queue with name ${name} already exists`);
    const newHeapQueueRecord: QueueRecord = {
      queue: new HeapPriorityQueue(comparator),
    };
    this.queues.set(name, newHeapQueueRecord);
    return newHeapQueueRecord.queue;
  }

  getQueuesNames(): string[] {
    return Array.from(this.queues.keys());
  }

  getQueueByName(name: string): PriorityQueue<JobType> | undefined {
    const queueRecord = this.queues.get(name);
    return queueRecord?.queue;
  }

  deleteQueueByName(name: string): void {
    if (!this.queues.delete(name)) throw new Error(`Queue with name ${name} does not exist`);
  }

  queueJob(queueName: string, job: JobType): JobType {
    const queue = this.getQueueByName(queueName);
    if (!queue) throw new Error(`Queue with name ${queueName} does not exist`);
    queue.push(job);
    return job;
  }
  dequeueJob(queueName: string): JobType {
    const queue = this.getQueueByName(queueName);
    if (!queue) throw new Error(`Queue with name ${queueName} does not exist`);
    const job = queue.pop();
    if (job === null) throw new Error(`Queue with name ${queueName} is empty`);
    return job;
  }
}
