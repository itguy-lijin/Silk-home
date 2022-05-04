import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { visuallyHidden } from '@mui/utils';
import GroupedMockData from '../mockData/grouped_findings.json';
import RawMockData from '../mockData/raw_findings.json';
import HeadCells from '../mockData/head_cells.json';
import SeverityButton from './SeverityButton';
import StatusButton from './StatusButton';
import NumberButton from './NumberButton';
import AvatarComponent from './AvatarComponent';
import FlowerImage from '../image/flower.jpg';
import AvatarImage from '../image/photo.jpg';

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
  return order === 'desc'
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {HeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {/* <TableCell>SEVERITY</TableCell>
        <TableCell>TIME</TableCell>
        <TableCell>SLA</TableCell>
        <TableCell>DESCRIPTION</TableCell>
        <TableCell>SECURITY ANALYST</TableCell>
        <TableCell>OWNER</TableCell>
        <TableCell>WORKFLOW</TableCell>
        <TableCell>STATUS</TableCell>
        <TableCell># OF FINDINGS</TableCell>
        <TableCell>COMMUNICATIONS</TableCell>
        <TableCell>ACTION</TableCell> */}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function createData(
  id, severity, time, sla, description, security_analyst, owner, workflow, status, of_findings, communications, action
) {
  const filterRusult = RawMockData.filter((element) => {
    return (element.grouped_finding_id === id)
  })
  return {
    id,
    severity,
    time,
    sla,
    description,
    security_analyst,
    owner,
    workflow,
    status,
    of_findings,
    communications,
    action,
    rawFindings: filterRusult.map((item) => {
      return {
        severity: item.severity,
        time: item.finding_created,
        source: item.source_security_tool_name,
        description: item.description,
        asset: item.asset,
        status: item.status,
      }
    })
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <SeverityButton label={row.severity} />
        </TableCell>
        <TableCell>{row.time}</TableCell>
        <TableCell>{row.sla}</TableCell>
        <TableCell>{row.description}</TableCell>
        <TableCell>
          <AvatarComponent label={row.security_analyst} image={AvatarImage} />
        </TableCell>
        <TableCell>
          <AvatarComponent label={row.owner} image={AvatarImage} />
        </TableCell>
        <TableCell>{row.workflow}</TableCell>
        <TableCell>
          <StatusButton label={row.status} />
        </TableCell>
        <TableCell>
          <NumberButton label={row.of_findings} />
        </TableCell>
        <TableCell>{row.communications}</TableCell>
        <TableCell>{row.action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="Raw Findings">
                <TableHead>
                  <TableRow>
                    <TableCell>SEVERITY</TableCell>
                    <TableCell>TIME</TableCell>
                    <TableCell>SOURCE</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell>ASSET</TableCell>
                    <TableCell>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.rawFindings.map((rawRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <SeverityButton label={rawRow.severity} />
                      </TableCell>
                      <TableCell>{rawRow.time}</TableCell>
                      <TableCell>
                        <AvatarComponent label={rawRow.source} image={FlowerImage} />
                      </TableCell>
                      <TableCell>
                        {rawRow.description}
                      </TableCell>
                      <TableCell>{rawRow.asset}</TableCell>
                      <TableCell>
                        <StatusButton label={rawRow.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     severity: PropTypes.number.isRequired,
//     time: PropTypes.string.isRequired,
//     sla: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const groupedRows = GroupedMockData.map((item) => {
  return (
    createData(
      item.id,
      item.severity,
      item.grouped_finding_created,
      item.sla,
      item.description,
      item.security_analyst,
      item.owner,
      item.workflow,
      item.status,
      item.progress,
      '',
      ''
    )
  )
});

export default function CollapsibleTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} style={{overflowX: 'unset'}}>
      <Table aria-label="Grouped Findings">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(groupedRows, getComparator(order, orderBy))
            .map((row, index) => {
              return <Row key={row.id} row={row} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
