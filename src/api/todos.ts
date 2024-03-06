import axios from "axios";

export type Todo = {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>(
      `${process.env.REACT_APP_JSON_SERVER_URL}/todos`
    );
    console.log("받아온 데이터", response.data);
    return response.data;
  } catch (error) {
    console.log(`데이터 불러오기 실패`, error);
    return [];
  }
};

export const addTodo = async (newTodo: Todo) => {
  try {
    if (!window.confirm(`추가하시겠습니까?`)) return;
    await axios.post(`${process.env.REACT_APP_JSON_SERVER_URL}/todos`, newTodo);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    if (!window.confirm(`삭제하시겠습니까?`)) return;
    await axios.delete(`${process.env.REACT_APP_JSON_SERVER_URL}/todos/${id}`);
  } catch (error) {
    console.log("삭제 실패", error);
  }
};

export const updateTodo = async (id: string, isDone: boolean) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_JSON_SERVER_URL}/todos/${id}`, { isDone });
    return response.data;
  } catch (error) {
    console.error(`할 일 상태 업데이트 실패:`, error);
  }
};
