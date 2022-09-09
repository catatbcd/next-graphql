import { useState } from "react";

export default function useForm(initial = {}) {
    const [inputs, setInputs] = useState(initial);

    function handleChange(e) {
        let { name, type, value, checked } = e.target;

        if (type === "checkbox") value = checked;
        
        if (type === "number") value = parseInt(value);

        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    } 
    
    function clearForm() {
        //Convertimos los inputs (json) a un arreglo de arreglos 
        const inputsArray = Object.entries(inputs);

        // Recorremos el arreglo y retornamos un nuevo arreglo de arreglos conservando el key
        const clearInputsArray = inputsArray.map(([key]) => [key, '']);

        //Convertimos el arreglo de arreglos nuevamente a formato json
        const inputsJson = Object.fromEntries(clearInputsArray);

        setInputs(inputsJson);
    }

    return {
        inputs,
        handleChange,
        clearForm
    }
}