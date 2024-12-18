import { Box, SimpleGrid, Text, Button, Card } from '@chakra-ui/react'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import TaskTags from '@/components/TaskTags'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { URL_API } from '@/components/Api'
interface TaskProps {
  title: string
  text: string
  cost: string
  id: string
  tags: string[]
}

const Task = ({ id, title, text, cost, tags }: TaskProps) => {
  const navigate = useNavigate();

  const handleDetalheClick = (id: string) => {
    navigate('/task/' + id)
  }

  return (
    <Card.Root>
      <Card.Body gap="2">
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {parse(text)}
        </Card.Description>
        <TaskTags tags={tags} size="sm" />
        <Text textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="2">
          {cost}
        </Text>
      </Card.Body>
      <Card.Footer
        flexWrap="wrap">
        <Button w="full" variant="solid" onClick={() => { handleDetalheClick(id) }}>Detalhes</Button>
      </Card.Footer>
    </Card.Root>
  )
}

function TaskPage() {

  const [tasks, setTasks] = useState([]);

  const fetchPublishedTasks = async () => {
    const response = await fetch(`${URL_API}/tarefas/publicadas`)
    const tasks = await response.json()
    setTasks(tasks)
  }

  useEffect(() => {
    fetchPublishedTasks()
  }, [])


  return <>
    <Box p={4} h="full">
      {
        tasks.length === 0 ? (
          <Loader text='Carregando as tarefas' />
        ) : (
          <SimpleGrid
            autoFlow="row dense"
            columns={{ base: 1, md: 3 }}
            gap="8vh"
          >
            {
              tasks.map((task, index) => {
                return <Task
                  key={index}
                  id={task['idTarefa']}
                  title={task['nomeTarefa']}
                  text={task['descricaoTarefa']}
                  cost={`R$ ${task['recompensaTarefa']}`}
                  tags={task['regras']}
                />
              })}
          </SimpleGrid>
        )
      }
    </Box>
  </>
}

export default TaskPage
