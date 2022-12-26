import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Button, Grid, Typography } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { getChatRooms } from "lib/api/chat_rooms"
import { MyRequest, Request } from "interfaces/index"
import { getRequests } from "lib/api/requests"

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 340,
        maxWidth: "100%"
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
}))

// リクエスト一覧ページ
const MyRequests: React.FC = () => {
    const classes = useStyles()

    const [loading, setLoading] = useState<boolean>(true)
    const [requests, setRequests] = useState<MyRequest[]>([])

    const handleGetMyRequests = async () => {
        try {
            const res = await getRequests()
            if (res.status === 200 || res.data.chatRooms === undefined) {
                setRequests(res.data.chatRooms)
            } else {
                console.log("No chat rooms")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        handleGetMyRequests()
    }, [])


    return (
        <div>

            <div className={classes.root}>
                <Link to={`/chatroom/1`} className={classes.link}>
                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                    >
                        新規登録
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default MyRequests
