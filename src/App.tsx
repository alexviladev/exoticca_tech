import { useState } from 'react';

import { TextField } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import CustomTable from './components/CustomTable/CustomTable';
import ErrorPage from './components/CustomTable/ErrorPage/ErrorPage';

import { usePosts } from './hooks/usePosts';

import type { Columns } from './types';

function App() {
  const { data, isLoading, error } = usePosts();
  const orderedColumns: Columns[] = ['id', 'title', 'body', 'userId'];
  const [filterValue, setFilterValue] = useState('');

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <>
      <TextField
        id="title-filter"
        type="title"
        variant="outlined"
        inputProps={{
          placeholder: 'Filter by title',
          value: filterValue,
        }}
        onChange={(e) => setFilterValue(e.target.value)}
      />

      {error && <ErrorPage {...error} />}
      {isLoading ? (
        <Skeleton variant="rectangular" width={800} height={400} />
      ) : (
        <CustomTable data={filteredData} orderedColumns={orderedColumns} />
      )}
    </>
  );
}

export default App;
