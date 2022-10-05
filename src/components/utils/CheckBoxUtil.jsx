import { Radio } from "@nextui-org/react";
import { useContext } from "react";
import { ScamContext } from "../../context/ScamContext";

export const CheckBoxUtil = () =>  {

    const { setFilteredType } = useContext(ScamContext);
    
    return (
        <Radio.Group 
            style={{display: 'inline-block'}} 
            orientation="horizontal" 
            label="Tipo" 
            defaultValue="primary" 
            onChange={(type) => setFilteredType(type)} 
        >
            <Radio size="sm" value="token" color="primary">
                token
            </Radio>
            <Radio size="sm" value="creditCard" color="primary">
                Tarjeta
            </Radio>
            <Radio size="sm" value="emailAndPhone" color="primary">
                Correo y celular
            </Radio>
            <Radio size="sm" value="all" color="primary">
                Todos
            </Radio>
        </Radio.Group>
    );
}
