'use client';

import React, { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
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
        <ModalHeader className="flex flex-col gap-1">{modalType}</ModalHeader>
        <ModalBody>
          <p>Edit</p>
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
