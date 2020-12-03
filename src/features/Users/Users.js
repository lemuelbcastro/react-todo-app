import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import { getAll } from './usersSlice';
import DataTable from 'components/DataTable';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      {
        Header: 'Role',
        accessor: (row) =>
          row.roles
            .map(function (role) {
              return role.name;
            })
            .join(' | '),
      },
    ],
    []
  );

  return (
    <div className={classes.root}>
      <DataTable
        tableData={data}
        tableColumns={columns}
        rowSelection={true}
        loading={loading}
        square={true}
      />
    </div>
  );
};

export default Users;
