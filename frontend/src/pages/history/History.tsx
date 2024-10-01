import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Text, Flex, Spacer, HStack, Center, VStack } from "@chakra-ui/react";
import { useFetchSWR } from "../../api";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface Item {
    approach: string;
    gpt_model: string;
    user: string;
    tokens: number;
    input: string;
    response: string;
    _ts: number;
}
// interface approach

const ApproachTag: React.FC<{ approach: string }> = ({ approach }) => {
    return (
        <Center
            borderRadius={"lg"}
            color="white"
            bg={approach == "chat" ? "blue.300" : "purple.400"}
            fontSize={"xs"}
            px={1}
            py={0.5}
            w={approach == "chat" ? "80px" : "120px"}
        >
            {approach == "chat" ? "チャット" : "ドキュメント検索"}
        </Center>
    );
};

const History: React.FC = () => {
    const userData = "kobayashi@ms.iss2tf.com";
    const items = useFetchSWR(`http://localhost:6055/get-history?username=${userData}`);

    // 日本の日時に変換
    const formattedDate = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "yyyy/MM/dd HH:mm:ss", { locale: ja });
    };

    return (
        // <Box flex="1" display="flex" flexDirection="column" mt="40px" >
        <Box mx={20} my={12}>
            <Accordion allowToggle>
                {items.data.map((item: Item, index: number) => (
                    <AccordionItem key={index} borderRadius={"10px"} bg="white" my={2}>
                        <h2>
                            <AccordionButton boxShadow={"sm"}>
                                <Box flex="1" textAlign="left">
                                    <HStack spacing={4}>
                                        <Text>{formattedDate(item._ts)}</Text>
                                        <ApproachTag approach={item.approach} />
                                    </HStack>
                                    <Text mt={2} fontSize="md">
                                        {item.input}
                                    </Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <VStack alignItems={"flex-start"} spacing={2}>
                                <Text fontSize="md">{item.response}</Text>

                                <Box display="flex" justifyContent="flex-end" alignItems="flex-end" h="50px" w="100%">
                                    <HStack spacing={1} mr={6}>
                                        <Text fontSize={"sm"}>モデル：</Text>
                                        <Text fontSize={"sm"}>{item.gpt_model}</Text>
                                    </HStack>

                                    <HStack spacing={1}>
                                        <Text fontSize={"sm"}>消費Token：</Text>
                                        <Text fontSize={"sm"}>{item.tokens}</Text>
                                    </HStack>
                                </Box>
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
        // </Box>
    );
};

export default History;
