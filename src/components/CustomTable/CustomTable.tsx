import { useCallback, useMemo, useState } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// I disable the eslint rule here because I want to be able to use any type so the component is more reusable
/* eslint-disable @typescript-eslint/no-explicit-any */
interface TableProps {
  data: any;
  orderedColumns: string[];
}

const CustomTable = ({ data, orderedColumns }: TableProps) => {
  // these two states are used to control the sorting of the table by clicking on the column headers
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // this useCallback is not necessary for this implementation
  // it reduces performance and should only be used for more expensive calculations
  // or when the function is used across many components to prevent it from being created again in each render
  const handleSort = useCallback(
    (column: string) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    },
    [sortColumn, sortDirection],
  );

  // this useMemo is not necessary for this implementation
  // it reduces performance and should only be used for more expensive calculations
  // or in scenarios where you want to "manually" control when the calculation should be run again
  const sortedData = useMemo(
    () =>
      data.sort((a: any, b: any) => {
        if (sortColumn === '') {
          return 0;
        }
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      }),
    [data, sortColumn, sortDirection],
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {orderedColumns.map((column) => (
              <TableCell key={column} onClick={() => handleSort(column)}>
                {column}
                {sortColumn === column && (
                  <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData &&
            sortedData.map((row: any) => (
              <TableRow key={row.id}>
                {orderedColumns.map((column) => (
                  <TableCell key={column}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
