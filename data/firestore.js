import { initializeApp } from 'firebase/app';
import {
  collection,
  getDocs,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  getFirestore,
  Timestamp,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 모든 할 일 가져오기
export async function fetchTodos() {
  const todosRef = collection(db, 'todos');
  const descQuery = query(todosRef, orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(descQuery);

  if (querySnapshot.empty) return [];

  const fetchedTodos = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());

    const Todo = {
      id: doc.id,
      title: doc.data()['title'],
      isDone: doc.data()['isDone'],
      createdAt: doc.data()['createdAt'].toDate(),
    };
    // toLocaleTimeString('ko')
    fetchedTodos.push(Todo);
  });

  return fetchedTodos;
}

// 할 일 추가
export async function addTodo({ title }) {
  const newTodoRef = doc(collection(db, 'todos'));

  const createdAtTimestamp = Timestamp.fromDate(new Date());

  const newTodoData = {
    id: newTodoRef.id,
    title,
    isDone: false,
    createdAt: createdAtTimestamp.toDate(),
  };

  await setDoc(newTodoRef, newTodoData);

  return newTodoData;
}

// 단일 할 일 조회
export async function fetchTodo(id) {
  if (!id) return null;

  const todoDocRef = doc(db, 'todos', id);
  const todoDocSnap = await getDoc(todoDocRef);

  if (todoDocSnap.exists()) {
    console.log('Document data:', todoDocSnap.data());

    const fetchedTodo = {
      id: todoDocSnap.id,
      title: todoDocSnap.data()['title'],
      isDone: todoDocSnap.data()['isDone'],
      createdAt: todoDocSnap.data()['createdAt'].toDate(),
    };

    return fetchedTodo;
  } else {
    // docSnap.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }
}

// 단일 할 일 삭제
export async function deleteTodo(id) {
  const fetchedTodo = await fetchTodo(id);

  if (fetchedTodo === null) {
    return null;
  }
  await deleteDoc(doc(db, 'todos', id));

  return fetchedTodo;
}

// 단일 할 일 수정
export async function editTodo(id, { title, isDone }) {
  const fetchedTodo = await fetchTodo(id);

  if (fetchedTodo === null) {
    return null;
  }

  const todoRef = doc(db, 'todos', id);

  const updatedTodo = await updateDoc(todoRef, {
    title: title,
    isDone: isDone,
  });

  // 수정된 데이터 출력해줌
  return {
    id: id,
    title: title,
    isDone: isDone,
    createdAt: fetchedTodo.createdAt,
  };
}

module.exports = { fetchTodos, addTodo, fetchTodo, deleteTodo, editTodo };
