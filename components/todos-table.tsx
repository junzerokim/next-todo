'use client';

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Todo } from '@/types';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  const TodoRow = (todo: Todo) => {
    return (
      <TableRow key={todo.id}>
        <TableCell>{todo.id.slice(0, 4)}</TableCell>
        <TableCell>{todo.title}</TableCell>
        <TableCell>{todo.isDone ? '✅' : '📌'}</TableCell>
        <TableCell>{`${todo.createdAt}`}</TableCell>
      </TableRow>
    );
  };
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>TODO</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>TIME</TableColumn>
      </TableHeader>
      <TableBody emptyContent={'No rows to display.'}>
        {todos &&
          todos.map((todo: Todo) => {
            return TodoRow(todo);
          })}
      </TableBody>
    </Table>
  );
};

export default TodosTable;
