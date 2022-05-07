import { useState } from "react";

interface ISignupField {
    email: string
    password: string
}

export function useFormFields(initialState: ISignupField) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function(event: any) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}