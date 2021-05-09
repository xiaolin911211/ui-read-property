import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { httpGetProperties } from "../components/ApiCall";
import {
  applicationList,
  propertyList,
  selectedServerName,
  applicationName,
} from "../components/GlobalState";
import History from "../history";
const columns = [
  {
    field: "application",
    headerName: "Applications",
    width: window.innerWidth / 3.3,
  },
  {
    field: "createdDate",
    headerName: "Created Date",
    width: window.innerWidth / 3.3,
  },
  {
    field: "property",
    headerName: "Property Details",
    width: window.innerWidth / 3.3,
    renderCell: (params) => (
      <strong>
        <Button
          variant="contained"
          color="primary"
          size="small"
        // style={{ marginLeft: 16 }}
        >
          Open
        </Button>
      </strong>
    ),
  },
];
const useStyles = makeStyles({
  root: {
    "& .font-tabular-nums": {
      fontVariantNumeric: "tabular-nums",
    },
  },
});

const ApplicationPage = () => {
  const classes = useStyles();
  const [appList, setAppList] = useRecoilState(applicationList);
  const [propList, setPropList] = useRecoilState(propertyList);
  const [getSelectedServerName, setSelectedServerName] = useRecoilState(
    selectedServerName
  );
  const [getApplicationName, setApplicationName] = useRecoilState(
    applicationName
  );
  const applicationListRows = appList.map((row, index) => ({
    id: index,
    application: row.name,
    createdDate: row.createdTimeStamp,
  }));

  const openApplicationProperties = async (event) => {
    console.log("Selected Server", getSelectedServerName);
    const selectedApplication = event.row.application;
    const httpGetPropertyResponse = await httpGetProperties(
      getSelectedServerName,
      selectedApplication
    );
    console.log(
      "httpGetPropertyResponse",
      httpGetPropertyResponse.data.propertyList
    );
    if (httpGetPropertyResponse.status === 200) {
      setPropList(httpGetPropertyResponse.data.propertyList);
      setApplicationName(selectedApplication);
      History.push("property");
    }
  };

  return (
    <div
      style={{ height: "100vh", width: "100%", textAlign: "center" }}
      className={classes.root}
    >
      <DataGrid
        rows={applicationListRows}
        columns={columns}
        onCellClick={openApplicationProperties}
      />
    </div>
  );
};

export default ApplicationPage;
