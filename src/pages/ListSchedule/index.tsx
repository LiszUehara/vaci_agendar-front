import {
    Heading,
    Text,
    Stack,
    Flex,
    IconButton,
    ListItem,
    ListIcon,
    List,
    useColorModeValue,
    useDisclosure,
  } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FiCheck, FiClock, FiEdit, FiFileText, FiGift, FiUser } from "react-icons/fi";
import fetcher from "../../services/api";
import { Schedule } from "../../types/list";
import { ModalEdit } from "../../components/ModalEdit";
import { AlertContext } from "../../components/contexts/alerts";
import { Select } from "../../components/Input/Select";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "../../components/Input";

const formatterDate = new Intl.DateTimeFormat("pt-br", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const formatterDateTime = new Intl.DateTimeFormat("pt-br", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: '2-digit',
  minute: '2-digit'
});

function getStatus(status: string | undefined){
  switch(status){
    case "completed": return "Concluido";
    case "cancelled": return "Cancelado";
    case "unrealized": return "Não Realizado";
    default: return "Outro";
  }
}
export const ListSchedule = () => {
  const { error } = useContext(AlertContext);
  const modalEditDisclosure = useDisclosure()
  const [list, setList] = useState<Schedule[]>([]);
  const [item, setItem] = useState<Schedule>({dateTime: new Date(), id: '', patient: { birthDate: new Date(), cpf: '', name: '', id: ''}});
  const { control, formState, register } = useForm({
   mode: "onBlur",
 });
 const [search, order] = useWatch({control, name: ['search', 'order'] });

  useEffect(()=>{
    if(!modalEditDisclosure.isOpen){
      setList(JSON.parse(localStorage.getItem('list') ?? ''))
      fetcher('/api/schedule')
      .then((res)=> {
        setList(res.items);
        localStorage.setItem('list', JSON.stringify(res.items));
      })
      .catch(res =>{
        error(res.cause)})
    }
  },[modalEditDisclosure.isOpen]);
  useEffect(()=>{
    if((order && order!=='asc') || search){
      fetcher(`/api/schedule?order=${order}&search=${search}`)
      .then((res)=> {
        setList(res.items);
      })
      .catch(res =>{
        error(res.cause)})
    } else {
      setList(JSON.parse(localStorage.getItem('list') ?? ''))
    fetcher('/api/schedule')
      .then((res)=> {
        setList(res.items)
        localStorage.setItem('list', JSON.stringify(res.items));
      })
      .catch(res =>{
        error(res.cause)})
    }
  },[order, search]);
  return (
    <>
      <Stack display={'grid'} gap={5} gridTemplateColumns={{lg: '4fr 1fr 1fr'}}>
        <span></span>
        <Select
          id="order"
          errors={formState.errors}
          register={register("order")}
          label="Ordenação"
          items={
            [
              {value: "asc", label: "Mais Antigos"},
              {value: "desc", label: "Mais Recentes"},
            ]}/>
        <Input
          id="search"
          errors={formState.errors}
          register={register("search")}
          label="Pesquisar por CPF"
        />
      </Stack>
      <Flex py={6} px={4} rowGap={8} justifyContent={"flex-start"} flexWrap={'wrap'} display={'flex'} columnGap={8}>
        {list.map(({id, patient, dateTime, status, note})=>(
          <Stack
            key={id} 
            width={320}
            padding={'32px'}
            borderRadius={'4px'}
            bgColor={useColorModeValue('white', 'gray.800')} 
            sx={{boxShadow: '0 0 5px 1px var(--chakra-colors-blue-500)'}}
            _hover={{boxShadow: '0 0 30px 1px var(--chakra-colors-blue-300)'}}>
              <Heading
                color={useColorModeValue('gray.600', 'gray.400')}
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
                  aria-label="botão de editar"
                  variant="link"
                  colorScheme="blue.900"
                  size="xl"
                  padding={1}
                  icon={<FiEdit />}
                  _hover={{ color: "blue.900" }}
                  onClick={()=> {
                    modalEditDisclosure.onOpen()
                    setItem({id, patient, dateTime, status, note})
                  }}
                />
              </Heading>
              <List spacing={3} >
                <ListItem>
                  <ListIcon as={FiUser} color='blue.600' fontSize={20} />
                  <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Nome</Text>
                  <Text>{patient.name}</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiFileText} color='blue.600' fontSize={20}/>
                  <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>CPF</Text>
                  <Text>{patient.cpf}</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiGift} color='blue.600' fontSize={20}/>
                  <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Data de Nascimento</Text>
                  <Text>{formatterDate.format(new Date(patient.birthDate))}</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiClock} color='blue.600' fontSize={20}/>
                  <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Data de Agendamento</Text>
                  <Text>{formatterDateTime.format(new Date(dateTime))}</Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={FiCheck} color='blue.600' fontSize={20}/>
                  <Text marginBottom={'2px'} color='blue.600' fontSize={20} fontWeight={700}>Status</Text>
                  <Text>{getStatus(status)}</Text>
                </ListItem>
              </List>
          </Stack>
        ))}
        <ModalEdit {...modalEditDisclosure} item={item} />
      </Flex>
    </>
  )
}