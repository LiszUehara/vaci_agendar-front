import {
    Box,
    Heading,
    Text,
    Stack,
    Flex,
    IconButton,
    InputGroup,
    InputRightElement,
    ListItem,
    UnorderedList,
    ListIcon,
    List,
    useColorModeValue,
  } from "@chakra-ui/react";
import { FiCheck, FiClock, FiEdit, FiFileText, FiGift, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
  const formatter = new Intl.DateTimeFormat("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  export const ListSchedule = () => {
    return (
      <Flex py={6} px={4} rowGap={8} justifyContent={"flex-start"} flexWrap={'wrap'} display={'flex'} columnGap={8}>
        <Stack width={320} padding={'32px'} borderRadius={'4px'} bgColor={useColorModeValue('white', 'gray.800')} 
        sx={{boxShadow: '0 0 5px 1px var(--chakra-colors-blue-500)'}}
        _hover={{boxShadow: '0 0 30px 1px var(--chakra-colors-blue-300)'}}>
          <Heading
            color={"gray.400"}
            fontSize={"2xl"}
            fontFamily={"body"}
            display={"flex"}
            borderBottom={'1px solid'}
            paddingBottom={2}
            borderColor={'white'}
            justifyContent={"space-between"}
          >
              Agendamento
              <IconButton
                as={Link}
                variant="link"
                colorScheme="blue.900"
                size="xl"
                padding={1}
                icon={<FiEdit />}
                _hover={{ color: "blue.900" }}
                to={`discipline/edit?id=`}
              />
            </Heading>
        <List spacing={3}  >
          <ListItem>
            <ListIcon as={FiUser} color='blue.600' fontSize={20} />
            <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Nome</Text>
            <Text>Ianca Lisandra</Text>
          </ListItem>
          <ListItem>
            <ListIcon as={FiFileText} color='blue.600' fontSize={20}/>
            <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>CPF</Text>
            <Text>123.123.123-00</Text>
          </ListItem>
          <ListItem>
            <ListIcon as={FiGift} color='blue.600' fontSize={20}/>
            <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Data de Nascimento</Text>
            <Text>04/02/2007</Text>
          </ListItem>
          <ListItem>
            <ListIcon as={FiClock} color='blue.600' fontSize={20}/>
            <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Data de Agendamento</Text>
            <Text>19/07/2024 - 10:00</Text>
          </ListItem>
          <ListItem>
            <ListIcon as={FiCheck} color='blue.600' fontSize={20}/>
            <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Status</Text>
            <Text>Aberto</Text>
          </ListItem>
        </List>
        </Stack>

      </Flex>
    )
}