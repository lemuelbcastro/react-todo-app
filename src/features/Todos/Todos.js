import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import DataTable from 'components/DataTable';
import TableButtons from 'components/DataTable/TableButtons';
import ModalConfirm from 'components/Modal/ModalConfirm';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import {
  fetchAll,
  removeOne,
  selectAll,
  setSelected,
  showModal,
  hideModal,
} from './todosSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Todos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, modal, selected } = useSelector((state) => state.todos);
  const todos = useSelector(selectAll);
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
      { Header: 'Schedule', accessor: 'schedule_date' },
      { Header: 'Author', accessor: 'author.name' },
      {
        Header: 'Completed',
        accessor: (row) => (row.completed ? 'Yes' : 'No'),
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
        tableData={todos}
        tableColumns={columns}
        loading={loading}
        square={true}
        rowSelection={true}
        singleSelect={true}
        handleSelect={(selected) => dispatch(setSelected(selected))}
        tableActions={<TableButtons onClick={onClick} disabled={disabled} />}
      />
      <AddTodo
        open={modal.add}
        handleClose={() => dispatch(hideModal('add'))}
      />
      {selected && (
        <UpdateTodo
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
          title="Remove Todo"
        >
          Are you sure you want to remove the selected todo?
        </ModalConfirm>
      )}
    </div>
  );
};

export default Todos;
