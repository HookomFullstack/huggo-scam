import { Radio } from "@nextui-org/react";
import { useContext } from "react";
import { ScamContext } from "../../context/ScamContext";

export const CheckBoxUtil = () =>  {

    const { filteredType, setFilteredType } = useContext(ScamContext);
    
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
            <Radio size="sm" value="EmailAndPassword" color="primary">
                Correo y clave
            </Radio>
            <Radio size="sm" value="EmailAndPasswordAndTc" color="primary">
                Correo, clave y tarjeta
            </Radio>
            <Radio size="sm" value="all" color="primary">
                Todos
            </Radio>
        </Radio.Group>
    );
}


// import { Checkbox, Dropdown, Radio } from "@nextui-org/react";
// import { useContext, useMemo, useState } from "react";
// import { ScamContext } from "../../context/ScamContext";

// export const CheckBoxUtil = () =>  {

//     const { setFilteredType, filteredType } = useContext(ScamContext);

//     const selectedValue = useMemo(
//       () => Array.from(filteredType).join(", ").replaceAll("_", " "),
//       [filteredType]
//     );
    
//     return (
//        <Dropdown>
//         <Dropdown.Button 

//             className="bg-[#0072FF] text-white h-8 rounded" 
//             flat 
//             color="primary" 
//             css={{ tt: "capitalize" }}
//         >
//           {selectedValue}
//         </Dropdown.Button>
//         <Dropdown.Menu
//           aria-label="Multiple selection actions"
//           color="primary"
//           disallowEmptySelection
//           selectionMode="multiple"
//           selectedKeys={filteredType}
//           onSelectionChange={setFilteredType}
//         >
//           <Dropdown.Item key="Correo">Correo</Dropdown.Item>
//           <Dropdown.Item key="Clave correo">Clave correo</Dropdown.Item>
//           <Dropdown.Item key="Celular">Celular</Dropdown.Item>
//           <Dropdown.Item key="Token">Token</Dropdown.Item>
//           <Dropdown.Item key="Tarjeta">Tarjeta</Dropdown.Item>
//         </Dropdown.Menu>
//       </Dropdown>
//     );
// }