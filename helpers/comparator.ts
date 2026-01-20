import { JobType } from '../types.js';

export function isHigher(a: JobType, b: JobType): boolean {
  if (a.priority === b.priority) {
    return a.createdAt < b.createdAt;
  } else {
    return a.priority > b.priority;
  }
}
