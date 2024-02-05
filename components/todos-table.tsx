'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  Spinner,
} from '@nextui-org/react';
import { Todo } from '@/types';
import { useRouter } from 'next/navigation';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할 일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState<Boolean>(false);

  // 입력된 할 일
  const [newTodoInput, setNewTodoInput] = useState('');

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const router = useRouter();

  const addTodoHandler = async (title: string) => {
    if (!todoAddEnable) return;
    setTodoAddEnable(false); // 중복 클릭 방지
    setIsLoading(true);
    setTimeout(() => {
      console.log('첫번째 메시지');
    }, 5000);
    await new Promise((f) => setTimeout(f, 3000));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
      }),
      cache: 'no-store',
    });
    inputInit();
    console.log(`할 일 추가 완료 : ${newTodoInput}`);
  };

  const inputInit = () => {
    setNewTodoInput('');
    router.refresh(); // POST 요청 후 페이지 새로고침
    setIsLoading(false);
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

  const notify = () => toast('Wow so easy!');

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
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
      {isLoading && <Spinner size="md" color="secondary" />}
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
    </div>
  );
};

export default TodosTable;
