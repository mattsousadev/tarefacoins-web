import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AppBar: React.FC<{ title?: string }> = ({ title = 'App Title' }) => {

    const navigate = useNavigate();

    return (
        <Box bg="blue.500" px={4} py={2} color="white">
            <Flex align="center" justify="center">
                <Box w="full" marginRight="auto">
                    <Button onClick={() => { navigate('/') }} variant="ghost">Home</Button>
                    <Button onClick={() => { navigate('/rules') }} variant="ghost">Regras</Button>
                    <Button onClick={() => { navigate('/tasks') }} variant="ghost">Tarefas</Button>
                </Box>
                <Box w="full">
                    <Text fontSize="xl" fontFamily="sans-serif" fontWeight="bold">
                        {title}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default AppBar;