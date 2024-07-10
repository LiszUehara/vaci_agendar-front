import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as InputChacka,
    InputProps as InputChackraProps
  } from "@chakra-ui/react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";
  
export interface InputProps extends InputChackraProps{
    id: string;
    label?: string;
    errors?: FieldErrors<FieldValues>;
    register?: UseFormRegisterReturn
    disabled?: boolean
}

  export const Input = ({
    label,
    id,
    errors,
    isRequired,
    register,
    disabled,
    ...props
  }: InputProps) => {
    const isInvalid = errors && !!errors[id];
    return (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <InputChacka
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