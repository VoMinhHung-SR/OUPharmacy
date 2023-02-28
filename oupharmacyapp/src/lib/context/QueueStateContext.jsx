import { createContext, useState } from "react";
import useQueueState from "../hooks/useQueueState";

export const QueueStateContext = createContext({});

export const QueueStateProvider = ({ children }) => {
  // TODO fetch list examination here 
  const { dequeue, front, enqueue, getLength, isEmpty, queue } = useQueueState([1, 2, 3,]);
  return (
    <QueueStateContext.Provider
      value={{ front, getLength, isEmpty, dequeue, enqueue, items:queue }}
    >
      {children}
    </QueueStateContext.Provider>
  );
};
