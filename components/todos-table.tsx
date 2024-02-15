'use client';

import React, { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { VerticalDotsIcon } from './icons';
import { useRouter } from 'next/navigation';
import { FocusedTodoType, CustomModalType, Todo } from '@/types';
import CustomModal from './custom-modal';

const TodosTable = ({ todos }: { todos: Todo[] }) => {
  // 할 일 추가 가능 여부
  const [todoAddEnable, setTodoAddEnable] = useState<Boolean>(false);

  // 입력된 할 일
  const [newTodoInput, setNewTodoInput] = useState('');

  // 로딩 여부
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // 띄우는 모달 여부
  const [currentModalData, setCurrentModalData] = useState<FocusedTodoType>({
    focusedTodo: null,
    modalType: 'detail' as CustomModalType,
  });

  const router = useRouter();

  const addTodoHandler = async (title: string) => {
    if (!todoAddEnable) return;
    setTodoAddEnable(false); // 중복 클릭 방지
    setIsLoading(true);
    setTimeout(() => {
      console.log('첫번째 메시지');
    }, 5000);
    await new Promise((f) => setTimeout(f, 1000));
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
      }),
      cache: 'no-store',
    });
    inputInit();
    notifyTodoAddedEvent('할 일이 성공적으로 추가되었습니다.');
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
        <TableCell>{todo.id.slice(0, 3).toUpperCase()}</TableCell>
        <TableCell>{todo.title}</TableCell>
        <TableCell>{todo.isDone ? '✅' : '📌'}</TableCell>
        <TableCell>{`${todo.createdAt}`}</TableCell>
        <TableCell>
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  console.log(`todo.id: ${todo.id} key: ${key}`);
                  setCurrentModalData({ focusedTodo: todo, modalType: key as CustomModalType });
                  onOpen();
                }}
              >
                <DropdownItem key="detail">Detail</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const notifyTodoAddedEvent = (message: string) => toast.success(message);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const ModalComponent = () => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) =>
            currentModalData.focusedTodo && (
              <CustomModal focusedTodo={currentModalData.focusedTodo} modalType={currentModalData.modalType} onClose={onClose} />
            )
          }
        </ModalContent>
      </Modal>
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <ModalComponent />
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
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
          <TableColumn>ACTION</TableColumn>
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
