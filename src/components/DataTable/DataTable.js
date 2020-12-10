import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  TablePagination,
  TableSortLabel,
  LinearProgress,
} from '@material-ui/core';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';

import SearchInput from '../SearchInput';
import Checkbox from './TableCheckbox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.5),
    paddingBottom: 0,
  },
  toolBar: {
    padding: 0,
  },
  flexGrow: {
    flexGrow: 1,
  },
  searchInput: {
    marginBottom: theme.spacing(2),
    flex: '1 1 100%',
  },
  container: {
    maxHeight: 440,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  tableRow: {
    whiteSpace: 'nowrap',
  },
  emptyCell: {
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
  },
  progressCell: {
    padding: '0px !important',
    height: '4px',
  },
}));

const DataTable = (props) => {
  const {
    className,
    tableData,
    tableColumns,
    tableActions,
    rowsPerPageOptions,
    defaultPageSize,
    rowSelection,
    singleSelect,
    handleSelect,
    loading,
    emptyMessage,
    headerTitle,
    ...rest
  } = props;

  const classes = useStyles();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    columns,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: {
        pageSize: defaultPageSize ? defaultPageSize : 5,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (rowSelection) {
        hooks.allColumns.push((columns) => [
          {
            id: 'selection',
            Cell: ({ row, toggleRowSelected, toggleAllRowsSelected }) => {
              return (
                <Checkbox
                  {...row.getToggleRowSelectedProps(
                    singleSelect && {
                      onChange: () => {
                        toggleAllRowsSelected(false);
                        toggleRowSelected(row.id, !row.isSelected);
                      },
                    }
                  )}
                />
              );
            },
          },
          ...columns,
        ]);
      }
    }
  );

  const emptyRowCount = pageSize - rows.length;

  useEffect(() => {
    if (handleSelect) {
      const selectedRows = selectedFlatRows.map((d) => d.original);
      const [selectedRow] = selectedRows;
      handleSelect(singleSelect ? selectedRow : selectedRows);
    }
  }, [selectedFlatRows, singleSelect, handleSelect]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {headerTitle && (
        <React.Fragment>
          <CardHeader title={headerTitle} />
          <Divider />
        </React.Fragment>
      )}
      <CardContent className={classes.content}>
        <Toolbar className={classes.toolBar}>
          {tableActions}
          <div className={classes.flexGrow} />
          <SearchInput
            className={classes.searchInput}
            label={'Search'}
            value={globalFilter || ''}
            onChange={(event) =>
              setGlobalFilter(event.target.value || undefined)
            }
            clear={() => setGlobalFilter(undefined)}
          />
        </Toolbar>
        <TableContainer className={classes.container}>
          <Table stickyHeader size="small" {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  className={classes.tableRow}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      {...(column.id === 'selection'
                        ? { padding: 'checkbox' }
                        : {})}
                    >
                      {column.render('Header')}
                      {column.id !== 'selection' ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  className={classes.progressCell}
                  colSpan={rowSelection ? columns.length + 1 : columns.length}
                >
                  <LinearProgress hidden={!loading} />
                </TableCell>
              </TableRow>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow className={classes.tableRow} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRowCount > 0 && (
                <TableRow
                  style={{
                    height: (rowSelection ? 37 : 34) * emptyRowCount,
                  }}
                >
                  <TableCell
                    className={classes.emptyCell}
                    colSpan={rowSelection ? columns.length + 1 : columns.length}
                  >
                    {emptyMessage && !rows.length ? emptyMessage : null}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          rowsPerPageOptions={
            rowsPerPageOptions ? rowsPerPageOptions : [5, 10, 25, 50]
          }
          count={tableData.length}
          rowsPerPage={pageSize}
          page={rows.length === pageSize ? 0 : pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardActions>
    </Card>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  tableData: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableActions: PropTypes.element,
  rowsPerPageOptions: PropTypes.array,
  defaultPageSize: PropTypes.number,
  rowSelection: PropTypes.bool,
  handleSelect: PropTypes.func,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  headerTitle: PropTypes.string,
};

export default DataTable;
