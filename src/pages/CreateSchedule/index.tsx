import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import z from "zod";
import { Input } from '../../components/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const scheduleSchema = z.object({
    namePatient: z.string().min(1),
    birthDatePatient: z.coerce.date(),
    dateTime: z.coerce.date(),
  });

export function CreateSchedule() {
  const { formState, handleSubmit, register } = useForm({
    mode: "onBlur",
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log(values)
  }

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
            <Input 
                id="namePatient"
                errors={formState.errors}
                register={register("namePatient")}
                label="Nome do Paciente"
                placeholder="Digite o nome do paciente"
                isRequired={true}
            />
            <Input 
                id="birthDatePatient"
                errors={formState.errors}
                register={register("birthDatePatient")}
                label="Data de Nascimento"
                type='date'
                isRequired={true}
            />
            <Input 
                id="dateTime"
                errors={formState.errors}
                register={register("dateTime")}
                label="Horário do Agendamento"
                type='datetime-local'
                isRequired={true}
            />

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Cadastrando..."
                size="lg"
                onClick={handleSubmit(onSubmit)}
                bg={'blue.500'}
                color={'white'}
                isLoading={formState.isSubmitting}
                isDisabled={!formState.isValid}
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