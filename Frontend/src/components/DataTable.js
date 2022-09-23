import * as React from "react";
import PropTypes from "prop-types";
import "../components/DataTable.css";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";

function createData(
  transaction_ref,
  date,
  payer_name,
  payer_acc,
  payee_name,
  payee_acc,
  amount
) {
  return {
    transaction_ref,
    date,
    payer_name,
    payer_acc,
    payee_name,
    payee_acc,
    amount,
  };
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "transaction_ref",
    numeric: true,
    disablePadding: true,
    label: "Trasaction Ref#",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "payer_name",
    numeric: false,
    disablePadding: true,
    label: "Payer Name",
  },
  {
    id: "payer_acc",
    numeric: false,
    disablePadding: true,
    label: "Payer Account#",
  },
  {
    id: "payee_name",
    numeric: false,
    disablePadding: true,
    label: "Payee Name",
  },
  {
    id: "payee_acc",
    numeric: false,
    disablePadding: true,
    label: "Payee Account#",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: true,
    label: "Amount",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className="table__head"
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <span className="font-bold">{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function DataTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("transaction_ref");
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = [];
  const transactions = props.transactions;
    transactions.forEach((transaction) => {
        rows.push(createData(transaction.refNo, transaction.date, transaction.payee.name, transaction.payee.account, transaction.payer.name, transaction.payer.account, transaction.amount));
    });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div>
      <Box sx={{ width: "100%", padding: "0px" }}>
        <Paper sx={{ width: "100%", mb: 2, pr: 4, pl: 4, pt: 4 }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table" className="table">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover key={row.name}>
                        <TableCell
                          className="table__cell"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.transaction_ref}
                        </TableCell>
                        <TableCell className="table__cell" align="center">
                          {row.date}
                        </TableCell>
                        <TableCell className="table__cell" align="center">
                          {row.payer_name}
                        </TableCell>
                        <TableCell className="table__cell" align="center">
                          {row.payer_acc}
                        </TableCell>
                        <TableCell className="table__cell" align="center">
                          {row.payee_name}
                        </TableCell>
                        <TableCell className="table__cell" align="center">
                          {row.payee_acc}
                        </TableCell>
                        <TableCell className="table__cell" align="center">
                          {row.amount}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
