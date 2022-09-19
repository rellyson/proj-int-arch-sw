import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React, { FC } from 'react'

export interface GenericTableProps {
  width: number | string
  height: number | string
  isLoading: boolean
  size: string
  headers: string[]
  body: any[]
}

const GenericTable: FC<GenericTableProps> = (props: GenericTableProps) => {
  return (
    <TableContainer m="6" w={props.width} h={props.height} p="4">
      <Table size={props.size}>
        <Thead>
          <Tr>
            {props.headers.map((header) => (
              <Th>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.isLoading ? (
            <Tr>
              {props.headers.map(() => (
                <Td>
                  <Skeleton height="6" fadeDuration={0.5} />
                </Td>
              ))}
            </Tr>
          ) : (
            props.body.map((row) => (
              <Tr>
                {props.headers.map((column: any) => (
                  <Td>{row[column]}</Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default GenericTable
