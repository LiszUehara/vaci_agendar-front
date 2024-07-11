import { Input, InputProps } from '.';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

interface InputDateTimeProps extends InputProps{
  //selected: any ,
  control: any,
  timeFormat?: string,
  dateFormat?: string,
  timeIntervals?: number
  showTimeSelect?: boolean
  placeholderText?: string
  minDate?: Date;
  maxDate?: Date;
  minTime?: Date;
  maxTime?: Date;
  selected?: Date;
}

export function InputDateTime({
   control,name='', selected, ...props
}:InputDateTimeProps) {

  return (
    <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <Input
        as={DatePicker}
        locale={ptBR}
        {...props}
        sx={{w: '100%'}}
        onChange={(date) => field.onChange(date)}
        //@ts-ignore
        selected={selected || field.value}
      />
   )}
  />
  );
}