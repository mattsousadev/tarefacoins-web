import { Button, HStack, Table, Text } from "@chakra-ui/react"
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi"

interface CrudTableProps {
    headers: string[]
    dataHeaders: string[]
    data: any[],
    idHeader: string,
    onRowUpdate(rowData: any): void,
    onRowDelete(id: string): void
}

const CrudTable: React.FC<CrudTableProps> = ({ headers, dataHeaders, data, idHeader, onRowUpdate, onRowDelete }) => {

    function handleRowUpdate(rowData: any) {
        onRowUpdate(rowData)
    }

    function handleRowDelete(id: string) {
        onRowDelete(id)
    }

    const renderCellAction = (id: string, rowData: any) => {
        return (<>
            <HStack gap="8">
                <Button bg="blue.500" size="2xs" onClick={() => {
                    handleRowUpdate(rowData)
                }}>
                    <HiOutlinePencil />
                </Button>
                <Button bg="red.500" size="2xs" onClick={() => {
                    handleRowDelete(id)
                }}>
                    <HiOutlineTrash />
                </Button>
            </HStack>
        </>)
    }

    function renderTableCell(data: any) {
        if (typeof data === 'boolean') {
            return (<Table.Cell>
                <Text truncate> {data ? 'Sim' : 'Não'}</Text>
            </Table.Cell>)
        }
        return (
            <Table.Cell>
                <Text truncate> {data}</Text>
            </Table.Cell>
        )
    }

    const renderTableRow = () => {
        return data.map((dataRow, index) => {
            return (<Table.Row key={index}>
                {dataHeaders.map((header) => (<>
                    {renderTableCell(dataRow[header])}
                </>
                ))}
                <Table.Cell>
                    {renderCellAction(dataRow[idHeader], dataRow)}
                </Table.Cell>
            </Table.Row>)
        })
    }

    return (
        <Table.ScrollArea borderWidth="1px" maxW="full">
            <Table.Root size="sm" striped>
                <Table.Header>
                    <Table.Row>
                        {headers.map((item) => <Table.ColumnHeader>{item}</Table.ColumnHeader>)}
                        <Table.ColumnHeader>Ações</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {renderTableRow()}
                </Table.Body>
            </Table.Root>
        </Table.ScrollArea>
    )
}

export default CrudTable