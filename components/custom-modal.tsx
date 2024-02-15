'use client';

import React, { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ModalHeader, ModalBody, ModalFooter, Modal, ModalContent, Input, Switch } from '@nextui-org/react';
import { VerticalDotsIcon } from './icons';
import { useRouter } from 'next/navigation';
import { FocusedTodoType, CustomModalType, Todo } from '@/types';

const CustomModal = ({
  focusedTodo,
  modalType,
  onClose,
}: {
  focusedTodo: Todo;
  modalType: CustomModalType;
  onClose: () => void;
}) => {
  // 로딩 상태
  const [isDone, setIsDone] = useState<Boolean>(false);

  const DetailModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">{modalType}</ModalHeader>
        <ModalBody>
          <p>Detail</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Action
          </Button>
        </ModalFooter>
      </>
    );
  };
  const EditModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">Edit</ModalHeader>
        <ModalBody>
          <p>
            <span className="font-bold">id :</span> {focusedTodo.id}
          </p>
          <Input autoFocus label="Todo" placeholder="Enter your Todo" variant="bordered" defaultValue={focusedTodo.title} />
          <div className="flex py-2 space-x-4">
            <span className="font-bold">finished : </span>
            <Switch defaultSelected={focusedTodo.isDone} aria-label="Automatic updates" />
          </div>
          <div className="flex py-1 space-x-4">
            <span className="font-bold">created at : </span>
            <p>{`${focusedTodo.createdAt}`}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Edit
          </Button>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </>
    );
  };
  const DeleteModal = () => {
    return (
      <>
        <ModalHeader className="flex flex-col gap-1">{modalType}</ModalHeader>
        <ModalBody>
          <p>Delete</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Action
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
