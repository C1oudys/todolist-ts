import React from "react";
import axios from "axios";

export const getTodos = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_JSON_SERVER_URL}/todos`
    );
    return response.data  ;
  } catch (error) {
    console.error(`데이터 불러오기 실패`, error);
  }
};

export const addTodo = async (text: string) => {
  try{
    const response = await axios.post(
    `${process.env.REACT_APP_JSON_SERVER_URL}/todos`, { text, done: false }
  );
  return response.data;
  } catch (error) {
    console.error(`할 일 추가 실패:`, error);
  }
};