# Priority Queue RESTful System

This project implements a simple, in-memory **priority queue service** exposed via a RESTful API.

The service is **data-agnostic**: producers can enqueue arbitrary JSON payloads with an associated priority, and consumers can dequeue jobs in a predictable priority-based order. Internally, the system uses a heap to efficiently select the next job to dispatch.

The service focuses on **scheduling and delivery semantics only**. It does not execute jobs or interpret their payloads.

---

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Vitest

---

## Core guarantees

### Ordering Guarantees
Jobs are dequeued according to the following rules:

1. Jobs with a **higher priority** are dequeued first.
2. Jobs with the **same priority** are dequeued in **FIFO order** (earlier enqueued first).

## Queues

- The system supports **multiple named queues**.
- Queue names are user-defined strings.
- Each queue is isolated: jobs from one queue are never dequeued from another.

---

## Data Storage

- All jobs are stored **in memory**.
- If the process restarts, all queued jobs are lost.
- Durability and persistence are explicitly out of scope for v1.

---

## Concurrency Model

- The service runs as a **single Node.js process**.
- No clustering or distributed coordination is implemented.
- The system is designed to behave correctly under concurrent HTTP requests within a single process.

---

## Testing

The project includes automated tests covering:
- Heap ordering correctness
- FIFO behavior for equal priorities
- Queue isolation
- API behavior under concurrent dequeue requests

---

## Non-goals

This project intentionally does **not** include:
- Job execution or workers
- Business logic or payload validation
- Authentication or multi-tenancy
- Distributed queues or persistence

These may be explored in future versions.
