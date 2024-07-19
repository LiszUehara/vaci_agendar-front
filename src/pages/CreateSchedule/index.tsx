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
import { FieldValues, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import fetcher from '../../services/api';
import { InputDateTime } from '../../components/Input/InputDateTime';
import { validateCPF } from 'validations-br';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../components/contexts/alerts';

export const scheduleSchema = z.object({
    namePatient: z.string().refine((value) => /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(value ?? ""), 'Nome inválido, por favor tente novamente'),
    CPFPatient: z.string().refine((value) => validateCPF(value), 'CPF inválido'),
    birthDatePatient: z.date(),
    dateTime: z.date(),
  });

function CreateSchedule() {
  const [firstLoad, setIsFirstLoad] = useState(true);
  const { control, formState, handleSubmit, register, reset, setValue
   } = useForm({
    mode: "onBlur",
    resolver: zodResolver(scheduleSchema),
  });
  const { success, error } = useContext(AlertContext);
  const [title, setTitle] = useState('Cadastro de Agendamentos');

  const [namePatient, CPFPatient, birthDatePatient, dateTime] = useWatch({control, name: ['namePatient', 'CPFPatient', 'birthDatePatient', 'dateTime'] });
  
  useEffect(()=> {
    const form = JSON.parse(localStorage.getItem('form') ?? '{}');
    if(form){
      setValue('namePatient', form.namePatient);
      setValue('CPFPatient', form.CPFPatient);
      setValue('birthDatePatient', form.birthDatePatient ? new Date(form.birthDatePatient) : null);
      setValue('dateTime', form.dateTime ? new Date(form.dateTime) : null);
    }
  }, []);
  useEffect(()=> {
    if(!firstLoad){
      localStorage.setItem('form', JSON.stringify({namePatient, CPFPatient, birthDatePatient: birthDatePatient, dateTime}));
    }else{
      setIsFirstLoad(false);
    }
  }, [namePatient, CPFPatient, birthDatePatient, dateTime]);
  
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await fetcher.post('/api/schedule', {
        status: 'unrealized',
        patient: {
            name: values.namePatient,
            cpf: values.CPFPatient,
            birthDate: values.birthDatePatient,
        },
        dateTime: values.dateTime,
        note: ''
    }).then((res) =>{
      if(res.error){
        setTitle(res.cause)
        error(res.cause)          
      } else {
        setTitle('Agendamento realizado')
        success("Agendamento realizado")
        localStorage.setItem('form','')
        reset({ namePatient: '', CPFPatient:null, birthDatePatient: null, dateTime: null })
        setTimeout(()=> {
          setTitle('Cadastro de Agendamentos')
        }, 5000)
      }
    })

  }

  return (
    <Flex
      minH={'100vh'}
      pt={12}
      justify={'center'}>
      <Stack spacing={8} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {title}
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
                aria-label='name'
                errors={formState.errors}
                register={register("namePatient")}
                label="Nome do Paciente"
                placeholder="Digite o nome do paciente"
                isRequired={true}
                />
            <Input 
                aria-label='cpf'
                id="CPFPatient"
                errors={formState.errors}
                register={register("CPFPatient")}
                label="CPF do Paciente"
                placeholder="Digite o cpf do paciente"
                isRequired={true}
            />
            <InputDateTime
                control={control}
                selected={birthDatePatient}
                id="birthDatePatient"
                name="birthDatePatient"
                errors={formState.errors}
                placeholderText='Informe a data de nascimento do paciente'
                label="Data de Nascimento"
                type='date'
                dateFormat="dd/MM/yyyy"
                isRequired={true}
                maxDate={new Date()}
            />
            <InputDateTime
              selected={dateTime}
              minDate={new Date()}
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
              minTime={new Date(0, 0, 0, 8, 0)} // 08:00am
              maxTime={new Date(0, 0, 0, 22, 0)} 
            />

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Cadastrando..."
                size="lg"
                onClick={handleSubmit(onSubmit)}
                bg={'blue.500'}
                color={'white'}
                isLoading={formState.isSubmitting}
                //isDisabled={!formState.isValid}
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