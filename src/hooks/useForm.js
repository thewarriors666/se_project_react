import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  function handleChange(evt) {
    const { id, name, value } = evt.target;
    const key = name || id;
    setValues({ ...values, [key]: value });
  }

  return { values, setValues, handleChange };
}
