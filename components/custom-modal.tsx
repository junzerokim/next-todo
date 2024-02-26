'use client';

import React, { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  ModalContent,
  Input,
  Switch,
  CircularProgress,
} from '@nextui-org/react';
import { VerticalDotsIcon } from './icons';
import { useRouter } from 'next/navigation';
import { FocusedTodoType, CustomModalType, Todo } from '@/types';

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
  onEdit,
  onDelete,
}: {
  focusedTodo: Todo;
  modalType: CustomModalType;
  onClose: () => void;
  onEdit: (id: string, title: string, isDone: boolean) => void;
  onDelete: (id: string) => void;
}) => {
  // 수정된 선택
  const [isDone, setIsDone] = useState(focusedTodo.isDone);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 수정된 입력
  const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">Todo Detail</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id :</span> {focusedTodo.id}
          </p>
          <p>
            <span className="font-bold">todo :</span> {focusedTodo.title}
          </p>
          <div className="flex py-2 space-x-4">
            <span className="font-bold">finished : </span>
            {`${focusedTodo.isDone ? '완료' : '미완료'}`}
          </div>
          <div className="flex py-1 space-x-4">
            <span className="font-bold">created at : </span>
            <p>{`${focusedTodo.createdAt}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </>
    );
  };
  const EditModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">Todo Edit</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id :</span> {focusedTodo.id}
          </p>
          <Input
            autoFocus
            label="Todo"
            placeholder="Enter your Todo"
            variant="bordered"
            isRequired
            defaultValue={focusedTodo.title}
            value={editedTodoInput}
            onValueChange={setEditedTodoInput}
          />
          <div className="flex py-2 space-x-4">
            <span className="font-bold">finished : </span>
            <Switch
              color="secondary"
              defaultSelected={focusedTodo.isDone}
              onValueChange={setIsDone}
              aria-label="Automatic updates"
            />
            {isDone ? '완료' : '미완료'}
          </div>
          <div className="flex py-1 space-x-4">
            <span className="font-bold">created at : </span>
            <p>{`${focusedTodo.createdAt}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onEdit(focusedTodo.id, editedTodoInput, isDone);
            }}
          >
            {isLoading ? <CircularProgress size="sm" color="secondary" aria-label="Loading..." /> : '수정'}
          </Button>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </>
    );
  };
  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">Todo Delete</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id :</span> {focusedTodo.id}
          </p>
          <p>
            <span className="font-bold">todo :</span> {focusedTodo.title}
          </p>
          <div className="flex py-2 space-x-4">
            <span className="font-bold">finished : </span>
            {`${focusedTodo.isDone ? '완료' : '미완료'}`}
          </div>
          <div className="flex py-1 space-x-4">
            <span className="font-bold">created at : </span>
            <p>{`${focusedTodo.createdAt}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              setIsLoading(true);
              onDelete(focusedTodo.id);
            }}
          >
            {isLoading ? <CircularProgress size="sm" color="danger" aria-label="Loading..." /> : 'Delete'}
          </Button>
          <Button color="default" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </>
    );
  };

  const getModal = (type: CustomModalType) => {
    switch (type) {
      case 'detail':
        return DetailModal();
      case 'edit':
        return EditModal();
      case 'delete':
        return DeleteModal();
      default:
        break;
    }
  };

  return <>{getModal(modalType)}</>;
};

export default CustomModal;
