import { NextRequest, NextResponse } from 'next/server';
import dummyTodos from '@/data/dummy.json';
import { fetchTodos, addTodo } from '@/data/firestore';

// 모든 할 일 목록 조회
export async function GET(request: NextRequest) {
  const fetchedTodos = await fetchTodos();
  const response = {
    message: '모든 할 일 목록 가져오기 성공!',
    data: fetchedTodos,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할 일 추가
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  if (title === undefined || title === '') {
    const errorMessage = {
      message: '항 일을 작성해주세요.',
    };
    return NextResponse.json(errorMessage, { status: 422 });
  }
  const addedTodo = await addTodo({ title });

  const response = {
    message: '할 일 추가 성공!',
    data: addedTodo,
  };

  return NextResponse.json(response, { status: 201 });
}
