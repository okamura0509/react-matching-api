import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonIcon from "@material-ui/icons/Person"
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"

import { AuthContext } from "App"

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: "inherit"
    },
    linkBtn: {
        textTransform: "none",
        marginLeft: theme.spacing(1)
    }
}))

const Header: React.FC = () => {
    const { loading, isSignedIn } = useContext(AuthContext)
    const classes = useStyles()

    // 認証済みかどうかで表示ボタンを変更
    const AuthButtons = () => {
        if (!loading) {
            if (isSignedIn) {
                return (
                    <>
                        <IconButton
                            component={Link}
                            to="/users"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to="/chat_rooms"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <ChatBubbleIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to="/home"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <PersonIcon />
                        </IconButton>
                    </>
                )
            } else {
                return (
                    <>
                        <IconButton
                            component={Link}
                            to="/signin"
                            edge="start"
                            className={classes.linkBtn}
                            color="inherit"
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    </>
                )
            }
        } else {
            return <></>
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/users"
                        variant="h6"
                        className={classes.title}
                    >
                        Sample
          </Typography>
                    <AuthButtons />
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
