import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

interface LoaderProps {
    text?:string
}

const Loader: React.FC<LoaderProps> = ({text}) => {
    return <>
        <Center h="full">
            <VStack>
                <Spinner size="xl" />
                <Text textStyle="2xl" fontWeight="bold" letterSpacing="tight" mt="2">
                    {text}
                </Text>
            </VStack>
        </Center>
    </>
}

export default Loader;