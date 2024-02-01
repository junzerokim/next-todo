'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { Todo } from '@/types';
import { useRouter } from 'next/navigation';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할 일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState(false);

  // 입력된 할 일
  const [newTodoInput, setNewTodoInput] = useState('');

  const router = useRouter();

  const addTodoHandler = async (title: string) => {
    if (!todoAddEnable) return;

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
      }),
      cache: 'no-store',
    });
    console.log(`할 일 추가 완료 : ${newTodoInput}`);
    router.refresh(); // POST 요청 후 페이지 새로고침
  };

  const disabledTodoAddButton = () => {
    return (
      <Popover placement="top">
        <PopoverTrigger className="h-14">
          <Button>Add</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">🫥</div>
            <div className="text-tiny">Please enter your task</div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

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
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="To Do"
          value={newTodoInput}
          onValueChange={(changedInput) => {
            setNewTodoInput(changedInput);
            setTodoAddEnable(changedInput.length > 0);
          }}
        />
        {todoAddEnable ? (
          <Button
            color="secondary"
            className="h-14"
            onPress={async () => {
              await addTodoHandler(newTodoInput);
            }}
          >
            Add
          </Button>
        ) : (
          disabledTodoAddButton()
        )}
      </div>
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
    </>
  );
};

export default TodosTable;
