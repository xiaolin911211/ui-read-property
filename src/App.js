import AppBar from "@material-ui/core/AppBar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { httpGetConfig, httpGetServers } from "./components/ApiCall";
import { LIST_OF_MENU_ITEMS } from "./components/Constants";
import {
  selectorUserInfo,
  serverList,
  userInfo,
  selectedIndex,
  propertyList,
  applicationList,
  selectedServerName,
  configList
} from "./components/GlobalState";
import History from "./history";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RouterPage from "./pages/RouterPage";
import { useStyles } from "./components/SharedComponents";
import Center from "react-center";

const App = () => {
  const [userrole, setUserRole] = useRecoilState(selectorUserInfo("userrole"));
  const [username, setUserName] = useRecoilState(selectorUserInfo("username"));
  const resetUser = useResetRecoilState(userInfo);
  const resetServer = useResetRecoilState(serverList);
  const resetIndex = useResetRecoilState(selectedIndex);
  const resetServerName = useResetRecoilState(selectedServerName);
  const resetApplication = useResetRecoilState(applicationList);
  const resetProperty = useResetRecoilState(propertyList);
  const [drawerState, setDrawerState] = useState(false);
  const [accountState, setAccountState] = useState(false);
  const [serList, setSerList] = useRecoilState(serverList);
  const [getConfigList, setConfigList] = useRecoilState(configList);
  const classes = useStyles();
  const accountAnchorRef = useRef(null);
  const DashBoard = () => {
    if (!userrole) {
      return <LoginPage />;
    } else {
      return <HomePage />;
    }
  };

  const toggleAccount = () => {
    setAccountState((prevAccountState) => !prevAccountState);
  };
  const clearStats = () => {
    resetUser();
    resetServer();
    resetIndex();
    resetServerName();
    resetApplication();
    resetProperty();
  };

  const toggleAccountClose = (event) => {
    const action = event.target.id;
    if (
      accountAnchorRef.current &&
      accountAnchorRef.current.contains(event.target)
    ) {
      return;
    }
    setAccountState(false);
    if (action === "Logout") {
      History.push("");
      clearStats();
    }
  };
  const prevAccountState = useRef(accountState);

  const handleServerMenu = async (e) => {
    e.preventDefault();
    const action = e.target.id;
    console.log('Action Page', action);
    if (action === "Servers") {
      const getServerResponse = await httpGetServers(userrole);
      if (getServerResponse.status === 200) {
        console.log(getServerResponse.data);
        setSerList(getServerResponse.data.servers);
        History.push("server");
      }
    } else if (action === "Home") {
      History.push("Home");
    } else if (action === 'Configuration') {
      const getConfigResponse = await httpGetConfig();
      console.log('getConfigResponse',getConfigResponse.data.databaseRecords);
      if (getConfigResponse.status === 200) {
        setConfigList(getConfigResponse.data.databaseRecords);
        History.push('configuration')
      }
    }
    setDrawerState(false);
  };

  const displayListOfMenuItems = LIST_OF_MENU_ITEMS.map((item, index) => (
    <MenuItem key={index} id={item} onClick={handleServerMenu}>
      {item}
    </MenuItem>
  ));
  useEffect(() => {
    if (prevAccountState.current === true && accountState === false) {
      accountAnchorRef.current.focus();
    }
    prevAccountState.current = accountState;
  }, [accountState]);
  useEffect(() => {
    return () => {
      window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        clearStats();
      });
    }

  });
  return (
    <div >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerState(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <IconButton ref={accountAnchorRef} onClick={toggleAccount}>
            {username} <AccountCircleIcon />
          </IconButton>
          <Popper
            open={accountState}
            anchorEl={accountAnchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={toggleAccountClose}>
                    <MenuList autoFocusItem={accountState} id="menu-list-grow">
                      <MenuItem id="Logout" onClick={toggleAccountClose}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerState} onClose={() => setDrawerState(false)}>
        {displayListOfMenuItems}
      </Drawer>
      <Center>{DashBoard()}</Center>
      <RouterPage />
    </div>
  );
};

export default App;
