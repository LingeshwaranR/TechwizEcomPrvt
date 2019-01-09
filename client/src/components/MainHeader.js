import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import { getUser } from "../actions/userActions";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";
import Input from "@material-ui/icons/Input";
import FlatButton from "material-ui/FlatButton";
import Button from "@material-ui/core/Button";
import Drawer from "material-ui/Drawer";
import FiltersList from "./FiltersList";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "../styles/Header.css";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    margin: theme.spacing.unit,
    color: "white",
    position: "relative"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    position: "relative",

    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),

    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchMob: {
    position: "absolute",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),

    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    color: "#808080",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "#808080",

    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    left: false
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  toggleOpen = targetComponent => {
    this.setState({ [targetComponent]: !this.state[targetComponent] });
  };

  switchLoginRegister = () => {
    this.setState({
      loginModalOpen: !this.state.loginModalOpen,
      registerModalOpen: !this.state.registerModalOpen
    });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const sideList = (
      <div className={classes.list}>
        <List style={{ background: "#3f51b5" }}>
          <ListItem onClick={() => this.props.history.push("/")}>
            <ListItemText
              disableTypography
              primary={
                <Typography type='body2' style={{ color: "#FFFFFF" }}>
                  TECHWIZ
                </Typography>
              }
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["Electronics", "Fashion", "Groceries", "Veggies"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          <ListItem component={Link} to='/account'>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"My Account"} />
          </ListItem>
          <ListItem component={Link} to='/cart'>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={"MY Cart"} />
          </ListItem>
          <ListItem component={Link} to='/account'>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary={"My Orders"} />
          </ListItem>
          <a href='/auth/logout'>
            <ListItem>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </a>
        </List>
      </div>
    );

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}>
        <MenuItem onClick={this.handleMenuClose} component={Link} to='/account'>
          Account
        </MenuItem>
        <a href='/auth/logout'>
          <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
        </a>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}>
        <MenuItem component={Link} to='/cart'>
          <IconButton color='inherit'>
              <ShoppingCartIcon />
          </IconButton>
          <p>Cart</p>
        </MenuItem>
        <MenuItem>
          <IconButton color='inherit'>
              <NotificationsIcon />
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color='inherit'>
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <div>
            {this.props.loggedUser ? (
              <Toolbar>
                <Typography
                  className={classes.title}
                  variant='h6'
                  color='inherit'
                  noWrap
                  onClick={() => this.props.history.push("/")}>
                  TECHWIZ
                </Typography>
                <div className={classes.sectionMobile}>
                  <IconButton
                    className={classes.menuButton}
                    color='inherit'
                    onClick={this.toggleDrawer("left", true)}
                    aria-label='Open drawer'>
                    <MenuIcon />
                  </IconButton>
                  <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    onOpen={this.toggleDrawer("left", true)}>
                    <div
                      tabIndex={0}
                      role='button'
                      onClick={this.toggleDrawer("left", false)}
                      onKeyDown={this.toggleDrawer("left", false)}>
                      {sideList}
                    </div>
                  </SwipeableDrawer>
                </div>
                <div className={classes.sectionDesktop}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder='Search…'
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                </div>

                <div className={classes.sectionMobile}>
                  <List style={{ background: "#3f51b5" }}>
                    <ListItem onClick={() => this.props.history.push("/")}>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography type='body2' style={{ color: "#FFFFFF" }}>
                            TECHWIZ
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
              
                </div>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color='inherit' component={Link} to='/cart'>
                      <ShoppingCartIcon />
                  </IconButton>
                  <IconButton color='inherit'>
                      <NotificationsIcon />
                  </IconButton>
                  <IconButton
                    aria-owns={isMenuOpen ? "material-appbar" : undefined}
                    aria-haspopup='true'
                    onClick={this.handleProfileMenuOpen}
                    color='inherit'>
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton color='inherit' component={Link} to='/cart'>
                      <ShoppingCartIcon />
                  </IconButton>
                  <IconButton color='inherit'>
                      <NotificationsIcon />
                  </IconButton>
                  <IconButton color='inherit' component={Link} to='/account'>
                    <AccountCircle />
                  </IconButton>
                </div>
              </Toolbar>
            ) : (
              <div>
                <Toolbar>
                  <Typography
                    className={classes.title}
                    variant='h6'
                    color='inherit'
                    noWrap
                    onClick={() => this.props.history.push("/")}>
                    TECHWIZ
                  </Typography>

                  <div className={classes.sectionDesktop}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder='Search…'
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                      />
                    </div>
                  </div>
                  <div className={classes.sectionMobile}>
                  <IconButton
                    className={classes.menuButton}
                    color='inherit'
                    onClick={this.toggleDrawer("left", true)}
                    aria-label='Open drawer'>
                    <MenuIcon />
                  </IconButton>
                  <SwipeableDrawer
                    open={this.state.left}
                    onClose={this.toggleDrawer("left", false)}
                    onOpen={this.toggleDrawer("left", true)}>
                    <div
                      tabIndex={0}
                      role='button'
                      onClick={this.toggleDrawer("left", false)}
                      onKeyDown={this.toggleDrawer("left", false)}>
                      {sideList}
                    </div>
                  </SwipeableDrawer>
                </div>
                  <div className={classes.sectionMobile}>
                    <Typography type='body2' style={{ color: "#FFFFFF" }}>
                      TECHWIZ
                    </Typography>
                  </div>
                  <div className={classes.grow} />
                  <div className={classes.sectionDesktop}>
                    <Button
                      variant='outlined'
                      className={classes.button}
                      onClick={() => this.toggleOpen("loginModalOpen")}>
                      LOGIN
                    </Button>
                  </div>
                  <div className={classes.sectionMobile}>
                    <Button
                      variant='outlined'
                      className={classes.button}
                      onClick={() => this.toggleOpen("loginModalOpen")}>
                      LOGIN
                    </Button>
                  </div>
                </Toolbar>
              </div>
            )}
          </div>
        </AppBar>
        <div className={classes.sectionMobile}>
          <AppBar position='static'  style={{boxShadow:"none", marginTop:"-2.5%"}}>
            <Toolbar>
              
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>

        <LoginModal
          isOpen={this.state.loginModalOpen}
          onRequestClose={() => this.toggleOpen("loginModalOpen")}
          switch={this.switchLoginRegister}
        />
        <RegisterModal
          isOpen={this.state.registerModalOpen}
          onRequestClose={() => this.toggleOpen("registerModalOpen")}
          switch={this.switchLoginRegister}
        />
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PrimarySearchAppBar));
