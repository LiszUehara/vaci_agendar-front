import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea as TextareaChacka,
    TextareaProps as TextareaChackraProps
  } from "@chakra-ui/react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";
  
export interface TextareaProps extends TextareaChackraProps{
    id: string;
    label?: string;
    errors?: FieldErrors<FieldValues>;
    register?: UseFormRegisterReturn
    disabled?: boolean
}

  export const TextArea = ({
    label,
    id,
    errors,
    isRequired,
    register,
    disabled,
    ...props
  }: TextareaProps) => {
    const isInvalid = errors && !!errors[id];
    return (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel sx={{color: 'blue.600'}}>{label}</FormLabel>
      <TextareaChacka
      {...props}
        disabled={disabled}
        {...register}
        _placeholder={{ color: "gray.500" }}
        _focusVisible={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
        }}
      />
      {errors && <FormErrorMessage>{typeof errors[id]?.message  === 'string' ? errors[id]?.message : ''}</FormErrorMessage>}
    </FormControl>
  )};