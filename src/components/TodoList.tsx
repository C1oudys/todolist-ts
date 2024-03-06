import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTodos, updateTodo, deleteTodo } from '../api/todos';
import { Todo } from '../api/todos';
import { styled } from 'styled-components';

const TodoList = () => {
  const { data: todos, isLoading, error } = useQuery<Todo[]>('todos', getTodos);
  const queryClient = useQueryClient();

  const { mutate: mutateUpdate } = useMutation((data: { id: string; isDone: boolean }) => updateTodo(data.id, data.isDone), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const { mutate: mutateDelete } = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  const toggleTodo = (id: string, isDone: boolean) => {
    mutateUpdate({ id, isDone: !isDone });
  };

  const handleDelete = (id: string) => {
    mutateDelete(id); 
  };

  const filterTodos = (isDone: boolean) => todos?.filter(todo => todo.isDone === isDone) || [];

  return (
    <StContainer>
      <StSection>진행 중인 할 일</StSection>
      <TodoContainer>
      {filterTodos(false).map((todo: Todo) => (
        <StTodo key={todo.id}>
          <StTitle>{todo.title}</StTitle>
          <StContent>{todo.content}</StContent>
          <StButtonContainer>
          <StToggleBtn onClick={() => toggleTodo(todo.id, todo.isDone)}>
            {todo.isDone ? '취소' : '완료'}
          </StToggleBtn>
          <StDeleteBtn onClick={() => handleDelete(todo.id)}>삭제</StDeleteBtn>
          </StButtonContainer>
        </StTodo>
      ))}
      </TodoContainer>

      <StSection>완료된 할 일</StSection>
      <TodoContainer>
      {filterTodos(true).map((todo: Todo) => (
        <StTodo key={todo.id}>
          <StTitle>{todo.title}</StTitle>
          <StContent>{todo.content}</StContent>
          <StButtonContainer>
          <StToggleBtn onClick={() => toggleTodo(todo.id, todo.isDone)}>
            {todo.isDone ? '취소' : '완료'}
          </StToggleBtn>
          <StDeleteBtn onClick={() => handleDelete(todo.id)}>삭제</StDeleteBtn>
          </StButtonContainer>
        </StTodo>
      ))}
      </TodoContainer>
    </StContainer>
  );
};

export default TodoList;

const StContainer = styled.div`
  width: 800px;
  margin-top: 10px;
  border-top: 3px solid #00008b;
`;

const StSection = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  margin-top: 15px;
  color: #5f9ea0;
`;

const TodoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px;
`;

const StTodo = styled.div`
  position: relative;
  width: 250px;
  height: 150px;
  margin-top: 10px;
  border-radius: 10px;
  background-color:#f0f8ff;
  border: 2px	solid #0000cd;
  padding: 10px;
`;

const StTitle = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 10px;
`;

const StContent = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const StToggleBtn = styled.button`
  background-color: #32cd32;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const StDeleteBtn = styled.button`
  margin-left: 10px;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ff4500;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const StButtonContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;