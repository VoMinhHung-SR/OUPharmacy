import { useState } from "react";

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  getLength() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

const useQueueState = (initialQueue = []) => {
  const [queue, setQueue] = useState(() => {
    const q = new Queue();
    initialQueue.forEach((item) => q.enqueue(item));
    return q;
  });

  const enqueue = (item) => {
    setQueue((prevQueue) => {
      const q = new Queue();
      prevQueue.items.forEach((i) => q.enqueue(i));
      q.enqueue(item);
      return q;
    });
  };

  const dequeue = () => {
    setQueue((prevQueue) => {
      const q = new Queue();
      prevQueue.items.forEach((item) => q.enqueue(item));
      q.dequeue();
      return q;
    });
  };

  const front = () => {
    return queue.front();
  };

  const getLength = () => {
    return queue.getLength();
  };

  const isEmpty = () => {
    return queue.isEmpty();
  };

  return { queue: queue.items, enqueue, dequeue, front, getLength, isEmpty };
};
export default useQueueState;
