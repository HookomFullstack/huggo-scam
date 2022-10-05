import { Table } from '@nextui-org/react';
import { useContext } from 'react';
import { DeleteIcon } from '../../assets/DeleteIcon';
import { IconButton } from '../../assets/IconButton';
import { ScamContext } from '../../context/ScamContext';
    
export const TableEmailAndPhone = ({users}) => {

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
            ip
          }, i) => (
          <Table.Row key={i}>
            <Table.Cell>{username}</Table.Cell>
            <Table.Cell>{password}</Table.Cell>
            <Table.Cell>{correo}</Table.Cell>
            <Table.Cell>{celular}</Table.Cell>
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
            ? users.length / 10 + 1
            : users.length / 10
          : 1
        }
        initialPage={1}
      />
    </Table>
  );
}
