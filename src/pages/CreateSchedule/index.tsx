import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import z from "zod";
import { Input } from '../../components/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import fetcher from '../../services/api';
import { InputDateTime } from '../../components/Input/InputDateTime';

const scheduleSchema = z.object({
    namePatient: z.string().min(1),
    birthDatePatient: z.coerce.date(),
    dateTime: z.coerce.date(),
  });

function CreateSchedule() {
  const { control, formState, handleSubmit, register, reset } = useForm({
    mode: "onBlur",
    resolver: zodResolver(scheduleSchema),
  });
  const toast = useToast()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {    
    await fetcher.post('/api/schedule', {
        status: 'unrealized',
        patient: {
            name: values.namePatient,
            birthDate: values.birthDatePatient,
        },
        dateTime: values.dateTime,
        note: ''
    }).then(() =>{
        toast({
            title: "Agendamento realizado",
            status: 'success',
        })
        reset({ namePatient: '', birthDatePatient: null, dateTime: null })
    }).catch(res =>{
        toast({
            title: res.cause,
            status: 'error',
        })})

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
            <InputDateTime
                control={control}
                id="birthDatePatient"
                name="birthDatePatient"
                errors={formState.errors}
                placeholderText='Informe a data de nascimento do paciente'
                label="Data de Nascimento"
                type='date'
                isRequired={true}
            />
            <InputDateTime
              control={control}
              id="dateTime"
              name="dateTime"
              errors={formState.errors}
              label="Horário do Agendamento"
              placeholderText='Informe o horário do agendamento'
              type='datetime-local'
              isRequired={true}
              timeFormat="HH:mm"
              dateFormat="dd/MM/yyyy - h:mm aa"
              showTimeSelect
              timeIntervals={60}
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

export default CreateSchedule