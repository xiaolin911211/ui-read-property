import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { configList } from "../components/GlobalState";
import { httpDeleteDocument, httpGetConfig } from '../components/ApiCall';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MaterialTable from "material-table";
import tableIcons from '../components/TableIcons.js';

const useStyles = makeStyles({
  root: {
    "& .font-tabular-nums": {
      fontVariantNumeric: "tabular-nums",
    },
  },
});

const MonitorConfigPage = () => {
  const data = [
    { param: "Admins", val: "0.03" },
    { param: "Margin", val: "0.4" },
    { param: "Price", val: "5080" }
  ];

  const comonscol = [
    { title: "Parameters", field: "param" },
    { title: "Value", field: "val" }
  ];
  const [gridData, setGridData] = useState({
    data: data,
    columns: comonscol,
    resolve: () => { },
    updatedAt: new Date()
  });

  useEffect(() => {
    gridData.resolve();
    console.log("RESOLVE AT:", gridData.updatedAt);
  }, [gridData]);

  const onRowAdd = newData =>
    new Promise((resolve, reject) => {
      const data = [...gridData.data];
      data.push(newData);
      const updatedAt = new Date();
      setGridData({ ...gridData, data, updatedAt, resolve });
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      // Copy current state data to a new array
      const data = [...gridData.data];
      // Get edited row index
      const index = data.indexOf(oldData);
      // replace old data
      data[index] = newData;
      // update state with the new array
      const updatedAt = new Date();
      setGridData({ ...gridData, data, updatedAt, resolve });
    });

  const onRowDelete = oldData =>
    new Promise((resolve, reject) => {
      let data = [...gridData.data];
      const index = data.indexOf(oldData);
      data.splice(index, 1);
      const updatedAt = new Date();
      setGridData({ ...gridData, data, updatedAt, resolve });
    });

  return (
    <div>
      <Toolbar />
      <MaterialTable
        title="Your Title"
        columns={gridData.columns}
        data={gridData.data}
        icons={tableIcons}
        editable={{
          isEditable: rowData => true,
          isDeletable: rowData => true,
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
          onRowDelete: onRowDelete
        }}
      />
    </div>
  );
};

//   const classes = useStyles();
//   const [getConfigList, setConfigList] = useRecoilState(configList);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [selectedDelete, setSelectedDelete] = useState({});
//   const configListRows = getConfigList.map((row, index) => ({
//     id: index,
//     application: row.Applications.Name,
//     environment: row.Servers.Environment
//   }));
//   const columns = [
//     {
//       field: "application",
//       headerName: "application",
//       width: window.innerWidth / 3.3,
//     },
//     {
//       field: "environment",
//       headerName: "environment",
//       width: window.innerWidth / 3.3,
//     },
//     {
//       field: "property",
//       headerName: "Property Details",
//       width: window.innerWidth / 3.3,
//       renderCell: (params) => (
//         <strong>
//           {params.getValue("apllication")}
//           <Button
//             variant="contained"
//             color="primary"
//             size="small"
//             onClick={() => handleDeleteClickOpen(params)}
//           >
//             <DeleteIcon />
//           </Button>
//         </strong>
//       ),
//     },
//   ];
//   const handleDeleteClickOpen = (params) => {
//     const applicationName = params.getValue("application");
//     const environment = params.getValue("environment");
//     setSelectedDelete({ 'application': applicationName, 'server': environment });
//     setDeleteOpen(true);
//     console.log(deleteOpen);
//   };

//   const handleDeleteClickCloseNo = () => {
//     console.log('handleDeleteClickClose');
//     setDeleteOpen(false);
//   };
//   const handleDeleteClickCloseYes = async () => {
//     console.log('handleDeleteClickCloseYes', selectedDelete);
//     console.log('handleDeleteClickCloseYes', selectedDelete.server);
//     console.log('handleDeleteClickCloseYes', selectedDelete.application);
//     const deleteDocument = await httpDeleteDocument(selectedDelete.server, selectedDelete.application);
//     const getConfigResponse = await httpGetConfig();
//     console.log('getConfigResponse', getConfigResponse.data.databaseRecords);
//     if (getConfigResponse.status === 200) {
//       setConfigList(getConfigResponse.data.databaseRecords);
//     }
//     setDeleteOpen(false);
//   };


//   return (
//     <div
//       style={{ height: "100vh", width: "100%", textAlign: "center" }}
//       className={classes.root}
//     >
//       <Toolbar />
//       <DataGrid rows={configListRows} columns={columns} />
//       <Dialog
//         open={deleteOpen}
//         onClose={handleDeleteClickCloseNo}>

//         <DialogTitle id="alert-dialog-slide-title">{"Delete Record Confirmation"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             Are you sure to delete the config
//                             </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteClickCloseYes} color="primary">Yes</Button>
//           <Button onClick={handleDeleteClickCloseNo} color="primary">No</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }


export default MonitorConfigPage;
