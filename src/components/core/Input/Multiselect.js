import SelectMultiple from 'react-select'
import { Controller } from 'react-hook-form'
import { InputWrapper, Label, ErrorMessage } from './common'

const Multiselect = ({ label, name, options,errorMessage, control, multi }) => {

  return (
    <InputWrapper>
      {label && <Label htmlFor="input-field">{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur }}) => {
          return multi ?
            <SelectMultiple
              options={options}
              placeholder={"Choose..."}
              isMulti={true}
              onChange={(options) =>
                onChange(options?.map((option) => option.value))
              }
              onBlur={onBlur}
              value={options.filter((option) => value?.includes(option.value))}
              defaultValue={options.filter((option) =>
                value?.includes(option.defaultValue)
              )}
            />
            :
            <SelectMultiple
              options={options}
              placeholder={"Choose..."}
              isMulti={false}
              onChange={(options) =>
                onChange(options.value)
              }
              onBlur={onBlur}
              value={{value:value,label:value}}
              defaultValue={{value:value,label:value}}
              
            />
        }}
      />
      <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>
    </InputWrapper>
  )
}

export default Multiselect