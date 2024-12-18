import Layout from "@/components/Layout";
import { Field } from "@/components/ui/field";
import { toaster, Toaster } from "@/components/ui/toaster";
import { Button, Flex, HStack, Input, Table, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { URL_API } from "@/components/Api"

const url = `${URL_API}/regras`;

const RulesCrudPage = () => {

    interface RuleModel {
        id: string;
        nome: string;
        dataCriacao: string;
    }

    const defaultRule: RuleModel = {
        id: '',
        nome: '',
        dataCriacao: ''
    }

    const [rule, setRule] = useState<RuleModel>(defaultRule)

    const [rules, setRules] = useState([]);

    const fetchRules = async () => {
        const response = await fetch(url)
        setRules(await response.json());
    }

    function getUrl(id: string): string {
        if (id === null || id === '')
            return url
        return `${url}/${id}`
    }

    function getMethod(id: string): 'POST' | 'PUT' {
        if (id === null || id === '') return 'POST'
        return "PUT"
    }

    function handleRowDelete(id: string) {
        const requestUrl = getUrl(id)
        fetch(requestUrl, {
            method: "DELETE"
        }).then(async (response) => {
            if (!response.ok) {
                const responseJson = await response.json()
                toaster.create({ type: "error", description: responseJson['message'] })
            } else {
                toaster.create({ type: "info", description: "Regra deletada!" })
                setRule(defaultRule)
                fetchRules()
            }
        })
    }

    function handleRowUpdate(jsonBody: any) {
        const newRule = Object.assign({}, rule)
        newRule.nome = jsonBody['nome']
        newRule.id = jsonBody['id']
        setRule(newRule)
    }

    const renderCellAction = (rule: any) => {
        return (<>
            <HStack>
                <Button bg="blue.500" size="2xs" onClick={() => {
                    handleRowUpdate(rule)
                }}>
                    <HiOutlinePencil />
                </Button>
                <Button bg="red.500" size="2xs" onClick={() => { handleRowDelete(rule['id']) }}>
                    <HiOutlineTrash />
                </Button>
            </HStack>
        </>)
    }

    function getRuleSubmitMessage(id: string): string {
        return getMethod(id) === "POST" ? "Regra criada!" : "Regra Atualizada!"
    }

    const handleRuleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target)

        const formValue = {
            nome: formData.get('nome')
        }

        fetch(getUrl(rule.id), {
            method: getMethod(rule.id),
            body: JSON.stringify(formValue),
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (response) => {
            if (!response.ok) {
                const responseJson = await response.json()
                toaster.create({ type: "error", description: responseJson['message'] })
            } else {
                toaster.create({ type: "info", description: getRuleSubmitMessage(rule.id) })
                setRule(defaultRule)
                fetchRules()
            }
        })
    }

    useEffect(() => {
        fetchRules()
    }, [])

    return (<>
        <Layout title="Rules">
            <Flex direction="column" gap="6">
                <Table.ScrollArea borderWidth="1px" maxW="full">
                    <Table.Root size="sm" striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Id</Table.ColumnHeader>
                                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                                <Table.ColumnHeader>Data criação</Table.ColumnHeader>
                                <Table.ColumnHeader>Ações</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {rules.map((item) => (
                                <Table.Row key={item['id']}>
                                    <Table.Cell>
                                        <Text truncate> {item['id']}</Text>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Text truncate> {item['nome']}</Text>
                                    </Table.Cell>
                                    <Table.Cell>{item['createdAt']}</Table.Cell>
                                    <Table.Cell>{renderCellAction(item)}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
                <form onSubmit={handleRuleSubmit}>
                    <VStack gap="4" width="full">
                        <Input disabled name="id" value={rule.id} />
                        <Field label="Nome" required>
                            <Input name="nome" onChange={(e) => {
                                const newRule = Object.assign({}, rule)
                                newRule.nome = e.target.value
                                setRule(newRule)
                            }} variant="outline" value={rule.nome} />
                        </Field>
                        <HStack>
                            <Button type="submit">{getMethod(rule.id) === "POST" ? 'Salvar' : 'Atualizar'}</Button>
                            <Button onClick={() => { setRule(defaultRule) }}>Limpar</Button>
                        </HStack>
                    </VStack>
                </form>
            </Flex>
            <Toaster />
        </Layout>
    </>)
};

export default RulesCrudPage;