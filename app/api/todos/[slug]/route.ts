import { NextRequest, NextResponse } from 'next/server';
import { deleteTodo, editTodo, fetchTodo } from '@/data/firestore';

// 할 일 단일 조회
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('query');

  const fetchedTodo = await fetchTodo(params.slug);

  if (fetchedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: '단일 할 일 가져오기 성공!',
    data: fetchedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할 일 단일 삭제 id
export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  const deletedTodo = await deleteTodo(params.slug);

  if (deletedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: '단일 할 일 삭제 성공!',
    data: deletedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}

// 할 일 단일 수정 id
export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  const { title, isDone } = await request.json();

  const editedTodo = await editTodo(params.slug, { title, isDone });

  if (editedTodo === null) {
    return new Response(null, { status: 204 });
  }

  const response = {
    message: '단일 할 일 수정 성공!',
    data: editedTodo,
  };

  return NextResponse.json(response, { status: 200 });
}
