import Input from '../components/Input'
import TodoList from '../components/TodoList'
import { styled } from 'styled-components'

function Home() {
  return (
    <Stdiv>
    <Input />
    <TodoList  />
    </Stdiv>
  )
}

export default Home

const Stdiv = styled.div`
   max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;