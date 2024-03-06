import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addTodo } from '../api/todos';
import { v4 as uuidv4 } from 'uuid';
import { styled } from 'styled-components';

const Input = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
      setTitle('');
      setContent('');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !content) {
      alert(`제목과 내용을 모두 입력해주세요.`);
      return;
    }

    const newTodo = {
        id: uuidv4(),
        title,
        content,
        isDone: false,
      };
    
      mutate(newTodo); 
      setTitle("");
      setContent("");
  };

  return (
    <>
    <StHeader>My TodoList</StHeader>
    <form onSubmit={handleSubmit}>
      <StInput
        type="text"
        placeholder="Title"
        value={title}
        maxLength={20}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StInput
        type="text"
        placeholder="Content"
        value={content}
        maxLength={30}
        onChange={(e) => setContent(e.target.value)}
      />
      <StBtn type="submit">추가하기</StBtn>
    </form>
    </>
  );
};

export default Input;

const StHeader = styled.h1`
  font-size: 30px;
  color: #5f9ea0;
  margin: 15px;
`;

const StInput = styled.input`
  border-radius: 10px;
  padding: 5px;
  margin-right: 3px;
  border: 2px solid #0000cd;
  background-color: 	#f0f8ff;

  &::placeholder {
    color: black;
  }
`;

const StBtn = styled.button`
  height: 30px;
  color: black;
  margin: 15px;
  border-radius: 10px;
  border: 2px solid #0000cd;
  cursor: pointer;
  background-color: 	#f0f8ff;

  &:hover {
    filter: contrast(0.9);
  }
`;