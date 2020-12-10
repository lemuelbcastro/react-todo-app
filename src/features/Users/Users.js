import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import DataTable from 'components/DataTable';
import TableButtons from 'components/DataTable/TableButtons';
import ModalConfirm from 'components/Modal/ModalConfirm';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import {
  fetchAll,
  removeOne,
  selectAll,
  setSelected,
  showModal,
  hideModal,
} from './usersSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, modal, selected } = useSelector((state) => state.users);
  const users = useSelector(selectAll);
  const onClick = {
    add: () => dispatch(showModal('add')),
    update: () => dispatch(showModal('update')),
    remove: () => dispatch(showModal('remove')),
  };
  const disabled = {
    update: !selected,
    remove: !selected,
  };

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

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <DataTable
        tableData={users}
        tableColumns={columns}
        loading={loading}
        square={true}
        rowSelection={true}
        singleSelect={true}
        handleSelect={(selected) => dispatch(setSelected(selected))}
        tableActions={<TableButtons onClick={onClick} disabled={disabled} />}
      />
      <AddUser
        open={modal.add}
        handleClose={() => dispatch(hideModal('add'))}
      />
      {selected && (
        <UpdateUser
          open={modal.update}
          handleClose={() => dispatch(hideModal('update'))}
        />
      )}
      {selected && (
        <ModalConfirm
          open={modal.remove}
          handleCancel={() => dispatch(hideModal('remove'))}
          handleConfirm={() => dispatch(removeOne(selected.id))}
          contentDividers={true}
          title="Remove User"
        >
          Are you sure you want to remove the selected user?
        </ModalConfirm>
      )}
    </div>
  );
};

export default Users;
