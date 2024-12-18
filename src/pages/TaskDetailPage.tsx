import Layout from "@/components/Layout"
import React, { useEffect } from "react"
import parse from 'html-react-parser'
import { useParams } from "react-router-dom"
import { Box, Button, Fieldset, Flex, Input, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"

import TaskTags from "@/components/TaskTags"
import Loader from "@/components/Loader"
import { withMask } from "use-mask-input"
import { URL_API } from "@/components/Api"

interface TaskProp {
  nomeTarefa: '',
  descricaoTarefa: '',
  recompensaTarefa: '',
  regras: []
}

const TaskDetailPage: React.FC = () => {
  const { id } = useParams()

  const [task, setTask] = React.useState<TaskProp | null>(null);

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });

  const fetchPublishedTask = async () => {
    const response = await fetch(`${URL_API}/tarefas/publicada/${id}`)
    const tasks = await response.json()
    setTask(tasks)
  }

  useEffect(() => {
    fetchPublishedTask()
  }, [])

  if (task === null) {
    return (
      <Layout title="Task Detail">
        <Loader text="Carregando tarefa" />
      </Layout>
    );
  }

  return (
    <Layout title="Task Detail">
      <Flex
        direction={flexDirection}
        p={4}
        gap={4}
        minHeight="90vh"
        justify="center"
        align="stretch">
        <Box
          flex={1}
          p={4}
          borderRadius="md"
        >
          <Text textStyle="5xl">{task['nomeTarefa']}</Text>
          <Text >{parse(task['descricaoTarefa'])}</Text>
          <Text fontWeight="bold" textStyle="3xl" >R$ {task['recompensaTarefa']}</Text>
          <TaskTags tags={task['regras']} size="lg" />
        </Box>
        <Box
          flex={1}
          p={4}
          borderRadius="md"
        >
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>Contact details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack>
            <Fieldset.Content>
              <Field label="Telefone">
                <Input name="phone" placeholder="(99) 99999-9999" ref={withMask("(99) 99999-9999")} />
              </Field>
            </Fieldset.Content>
            <Button type="submit" w="full" alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </Box>
      </Flex>
    </Layout>
  )
}

export default TaskDetailPage