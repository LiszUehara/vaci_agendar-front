import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
  } from '@chakra-ui/react'
import { Schedule } from '../../types/list';
import { Input } from '../Input';
import { InputDateTime } from '../Input/InputDateTime';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import fetcher from '../../services/api';
import { useContext, useEffect } from 'react';
import z from 'zod'
import { validateCPF } from 'validations-br';
import { TextArea } from '../Input/TextArea';
import { Select } from '../Input/Select';
import { AlertContext } from '../contexts/alerts';

interface IModalEdit {
    isOpen: boolean;
    onClose: ()=> void
    item: Schedule;
}
export const scheduleSchema = z.object({
    namePatient: z.string().refine((value) => /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(value ?? ""), 'Nome inválido, por favor tente novamente'),
    CPFPatient: z.string().refine((value) => validateCPF(value), 'CPF inválido'),
    birthDatePatient: z.date(),
    dateTime: z.date(),
    note: z.string().optional(),
    status: z.string(),
  });
export function ModalEdit({isOpen, onClose, item}: IModalEdit) {
  const { success, error } = useContext(AlertContext);
  const { control, formState, handleSubmit, register, setValue
    } = useForm({
     mode: "onBlur",
     resolver: zodResolver(scheduleSchema),
   });
   useEffect(()=> {
    setValue('namePatient', item.patient.name);
    setValue('CPFPatient', item.patient.cpf);
    setValue('birthDatePatient', new Date(item.patient.birthDate));
    setValue('dateTime', new Date(item.dateTime));
    setValue('note', item.note);
    setValue('status', item.status);
   }, [item])
   const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await fetcher.put(`/api/schedule/${item.id}`, {
        patientId: item.patient.id,
        patient: {
            id: item.patient.id,
            name: values.namePatient,
            cpf: values.CPFPatient,
            birthDate: values.birthDatePatient,
        },
        status: values.status,
        dateTime: values.dateTime,
        note: values.note ?? ''
    }).then(() =>{
        success("Agendamento realizado")
        onClose();
    }).catch(res =>{
        error(res.cause)})

  }
    return (
      <>  
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Atualização de Agendamento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                        id="CPFPatient"
                        errors={formState.errors}
                        register={register("CPFPatient")}
                        label="CPF do Paciente"
                        placeholder="Digite o cpf do paciente"
                        isRequired={true}
                    />
                    <InputDateTime
                        control={control}
                        //selected={birthDatePatient}
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
                        //selected={dateTime}
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
                    <Select
                        id="status"
                        errors={formState.errors}
                        register={register("status")}
                        label="Status"
                        items={
                            [
                                {value: "completed", label: "Concluido"},
                                {value: "cancelled", label: "Cancelado"},
                                {value: "unrealized", label: "Não Realizado"}
                            ]}
                    />
                    <TextArea
                        id="note"
                        errors={formState.errors}
                        register={register("note")}
                        label="Observações"
                    />
                </Stack>
            </ModalBody>
  
            <ModalFooter>
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
                Atualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }