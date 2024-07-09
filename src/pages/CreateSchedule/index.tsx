import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

export function CreateSchedule() {
  const currentDateTime = new Date().toISOString().replace('Z', '');
  const [currentDate] = new Date().toISOString().split('T')
  return (
    <Flex
      minH={'100vh'}
      pt={12}
      justify={'center'}>
      <Stack spacing={8} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Cadastro de Agendamentos
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
                <FormLabel>Nome do Paciente</FormLabel>
                <Input type="text" />
            </FormControl>
            <FormControl id="birthDate">
                <FormLabel>Data de Nascimento</FormLabel>
                <Input type="date" max={currentDate} />
            </FormControl>
            <FormControl id="dateTime">
                <FormLabel>Horário do Agendamento</FormLabel>
                <Input type="datetime-local" />
            </FormControl>
            
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.500'}
                color={'white'}
                _hover={{
                  bg: 'blue.600',
                }}>
                Cadastrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}