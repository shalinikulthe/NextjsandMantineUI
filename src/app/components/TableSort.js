'use client';
import { useState, useEffect } from 'react';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import { Center, Group, ScrollArea, Table, Text, TextInput, UnstyledButton } from '@mantine/core';
import classes from '../style/TableSort.module.css';


function Th({ children, reversed, sorted, onSort }) {
const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
return (
  <Table.Th className={classes.th}>
    <UnstyledButton onClick={onSort} className={classes.control}>
      <Group justify="space-between">
        <Text fw={500} fz="sm">
          {children}
        </Text>
        <Center className={classes.icon}>
          <Icon size={16} stroke={1.5} />
        </Center>
      </Group>
    </UnstyledButton>
  </Table.Th>
);
}

function filterData(data, search) {
const query = search.toLowerCase().trim();
return data.filter((item) =>
  Object.keys(item).some((key) => item[key].toString().toLowerCase().includes(query))
);
}

function sortData(data, { sortBy, reversed, search }) {
if (!sortBy) {
  return filterData(data, search);
}

return filterData(
  [...data].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return reversed ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
    }

    return reversed ? bVal - aVal : aVal - bVal;
  }),
  search
);
}

export function TableSort({ data = [], headers = [] }) {
const [search, setSearch] = useState('');
const [sortedData, setSortedData] = useState(data);
const [sortBy, setSortBy] = useState(null);
const [reverseSortDirection, setReverseSortDirection] = useState(false);

const setSorting = (field) => {
  const reversed = field === sortBy ? !reverseSortDirection : false;
  setReverseSortDirection(reversed);
  setSortBy(field);
  setSortedData(sortData(data, { sortBy: field, reversed, search }));
};

const handleSearchChange = (event) => {
  const { value } = event.currentTarget;
  setSearch(value);
  setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
};

const rows = sortedData.map((row, index) => (
  <Table.Tr key={index}>
    {headers.map((header,indexing) => {
      console.log(header,"headerheaderheaderheaderheader")
      const cellValue = header.component ? header.key=="all_in_table" ? header.component(row) : header.component(row[header.key]) : row[header.key];
      let displayValue = cellValue;
      
      return <Table.Td key={indexing+header.key+index}>{displayValue}</Table.Td>;
    })}
  </Table.Tr>
));

return (
  <ScrollArea>
    <TextInput
      placeholder="Search by any field"
      mb="md"
      leftSection={<IconSearch size={16} stroke={1.5} />}
      value={search}
      onChange={handleSearchChange}
    />
    <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
      <Table.Thead>
        <Table.Tr>
          {headers.length > 0 ? (
            headers.map((header,ind) => (
              <Th
                key={header.key+ind}
                sorted={sortBy === header.key}
                reversed={reverseSortDirection}
                onSort={() => setSorting(header.key)}
              >
                {header.value}
              </Th>
            ))
          ) : (
            <Table.Th>No headers available</Table.Th>
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.length > 0 ? rows : (
          <Table.Tr>
            <Table.Td colSpan={headers.length}>
              <Text fw={500} ta="center">
                Nothing found
              </Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  </ScrollArea>
);
}
