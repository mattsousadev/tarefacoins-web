import { URL_API } from "@/components/Api";
import CrudTable from "@/components/CrudTable";
import Layout from "@/components/Layout";
import { Field } from "@/components/ui/field";
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input";
import { Switch } from "@/components/ui/switch";
import { toaster, Toaster } from "@/components/ui/toaster";
import { Button, Flex, HStack, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const url = `${URL_API}/tarefas`;


interface TaskFormModel {
    id: string
    nome: string
    descricao: string
    ativo: boolean
    publicar: boolean
    recompensa: string
}

const defaultFormModel: TaskFormModel = {
    id: ''
    , nome: ''
    , descricao: ''
    , ativo: true
    , publicar: false
    , recompensa: '1'
}

const taskTableHeaders = ['ID', 'Nome', 'Descrição', 'Ativo', 'Data Criação']
const taskModelHeaders = ['id', 'nome', 'descricao', 'ativo', 'createdAt']

export const TasksCrudPage = () => {

    const [tasks, setTasks] = useState<TaskFormModel[]>([])

    const [formTask, setFormTask] = useState<TaskFormModel>(defaultFormModel)

    function getUrl(id: string): string {
        if (id === null || id === '')
            return url
        return `${url}/${id}`
    }

    function getMethod(id: string): 'POST' | 'PUT' {
        if (id === null || id === '') return 'POST'
        return "PUT"
    }

    function getRuleSubmitMessage(id: string): string {
        return getMethod(id) === "POST" ? "Tarefa criada!" : "Tarefa Atualizada!"
    }

    function handleUpdateRow(rowData: any) {
        setFormTask(rowData)
    }

    function handleDeleteRow(id: string) {
        const requestUrl = getUrl(id)
        fetch(requestUrl, {
            method: "DELETE"
        }).then(async (response) => {
            if (!response.ok) {
                const responseJson = await response.json()
                toaster.create({ type: "error", description: responseJson['message'] })
            } else {
                toaster.create({ type: "info", description: "Tarefa'' deletada!" })
                setFormTask(defaultFormModel)
                fetchTasks()
            }
        })
    }

    function onTaskSubmit(e: any) {
        e.preventDefault();
        const formData = new FormData(e.target)

        const formValue = {
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            ativo: formData.get('ativo')
        }

        fetch(getUrl(formTask.id), {
            method: getMethod(formTask.id),
            body: JSON.stringify(formValue),
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (response) => {
            if (!response.ok) {
                const responseJson = await response.json()
                toaster.create({ type: "error", description: responseJson['message'] })
            } else {
                toaster.create({ type: "info", description: getRuleSubmitMessage(formTask.id) })
                setFormTask(defaultFormModel)
                fetchTasks()
            }
        })
    }

    function onTaskClear() {
        setFormTask(defaultFormModel)
    }

    const TaskCrudTable = () => {
        return (
            <CrudTable
                data={tasks}
                headers={taskTableHeaders}
                idHeader="id"
                dataHeaders={taskModelHeaders}
                onRowUpdate={handleUpdateRow}
                onRowDelete={handleDeleteRow}
            />
        )
    }

    async function fetchTasks() {
        const response = await fetch(url)
        setTasks(await response.json());
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    return (<Layout title="Tasks">
        <Flex direction="column" gap="6">
            <TaskCrudTable />
            <form onSubmit={onTaskSubmit}>
                <VStack gap="4" width="full">
                    <Input disabled name="id" value={formTask.id} />
                    <Field label="Nome" required>
                        <Input name="nome" onChange={(e) => {
                            const newFormTask = Object.assign({}, formTask)
                            newFormTask.nome = e.target.value
                            setFormTask(newFormTask)
                        }} variant="outline" value={formTask.nome} />
                    </Field>
                    <Field label="Descrição" required>
                        <Input name="descricao" onChange={(e) => {
                            const newFormTask = Object.assign({}, formTask)
                            newFormTask.descricao = e.target.value
                            setFormTask(newFormTask)
                        }} variant="outline" value={formTask.descricao} />
                    </Field>
                    <Switch
                        checked={formTask.ativo}
                        onCheckedChange={(checked) => {
                            const newFormTask = Object.assign({}, formTask)
                            newFormTask.ativo = checked.checked
                            setFormTask(newFormTask)
                        }}>Ativo?</Switch>
                    <Switch
                        disabled={formTask.id !== ''}
                        checked={formTask.publicar}
                        onCheckedChange={(checked) => {
                            const newFormTask = Object.assign({}, formTask)
                            newFormTask.publicar = checked.checked
                            setFormTask(newFormTask)
                        }}>Publicar?</Switch>
                    <NumberInputRoot
                        w="full"
                        disabled={!formTask.publicar}
                        value={formTask.recompensa}
                        onValueChange={(e) => {
                            const newFormTask = Object.assign({}, formTask)
                            newFormTask.recompensa = e.value
                            setFormTask(newFormTask)
                        }}
                        defaultValue={defaultFormModel.recompensa}
                        min={1}>
                        <NumberInputField />
                    </NumberInputRoot>
                    <HStack>
                        <Button type="submit">{getMethod(formTask.id) === "POST" ? 'Salvar' : 'Atualizar'}</Button>
                        <Button onClick={onTaskClear}>Limpar</Button>
                    </HStack>
                </VStack>
            </form>
            <Toaster />
        </Flex>
    </Layout>)
}

export default TasksCrudPage;