import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select as SelectChacka,
    SelectProps as SelectChackraProps
  } from "@chakra-ui/react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";
  
export interface SelectProps extends SelectChackraProps{
    id: string;
    label?: string;
    errors?: FieldErrors<FieldValues>;
    register?: UseFormRegisterReturn
    disabled?: boolean;
    items: {value: string, label: string }[]
}

  export const Select = ({
    label,
    id,
    errors,
    isRequired,
    register,
    disabled,
    items,
    ...props
  }: SelectProps) => {
    const isInvalid = errors && !!errors[id];
    return (
    <FormControl id={id} isRequired={isRequired} isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <SelectChacka
        {...props}
        disabled={disabled}
        {...register}
        _placeholder={{ color: "gray.500" }}
        _focusVisible={{
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
        }}
        >
        {items.map(({value, label})=><option value={value} key={value}>{label}</option>)}
      </SelectChacka>
      {errors && <FormErrorMessage>{typeof errors[id]?.message  === 'string' ? errors[id]?.message : ''}</FormErrorMessage>}
    </FormControl>
  )};