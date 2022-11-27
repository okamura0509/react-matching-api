import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
import Avatar from "@material-ui/core/Avatar"

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { getChatRooms } from "lib/api/chat_rooms"
import { ChatRoom } from "interfaces/index"

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

// チャットルーム一覧ページ
const ChatRooms: React.FC = () => {
    const classes = useStyles()

    const [loading, setLoading] = useState<boolean>(true)
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])

    const handleGetChatRooms = async () => {
        try {
            const res = await getChatRooms()

            if (res.status === 200) {
                setChatRooms(res.data.chatRooms)
            } else {
                console.log("No chat rooms")
            }
        } catch (err) {
            console.log(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        handleGetChatRooms()
    }, [])

    return (
        <>
            {
                !loading ? (
                    chatRooms.length > 0 ? (
                        chatRooms.map((chatRoom: ChatRoom, index: number) => {
                            return (
                                <Grid container key={index} justify="center">
                                    <List>
                                        {/* 個別のチャットルームへ飛ばす */}
                                        <Link to={`/chatroom/${chatRoom.chatRoom.id}`} className={classes.link}>
                                            <div className={classes.root}>
                                                <ListItem alignItems="flex-start" style={{ padding: 0 }}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt="avatar"
                                                            src={chatRoom.otherUser.image.url}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={chatRoom.otherUser.name}
                                                        secondary={
                                                            <div style={{ marginTop: "0.5rem" }}>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    color="textSecondary"
                                                                >
                                                                    {chatRoom.lastMessage === null ? "まだメッセージはありません。" : chatRoom.lastMessage.content.length > 30 ? chatRoom.lastMessage.content.substr(0, 30) + "..." : chatRoom.lastMessage.content}
                                                                </Typography>
                                                            </div>
                                                        }
                                                    />
                                                </ListItem>
                                            </div>
                                        </Link>
                                        <Divider component="li" />
                                    </List>
                                </Grid>
                            )
                        })
                    ) : (
                        <Typography
                            component="p"
                            variant="body2"
                            color="textSecondary"
                        >
                            マッチング中の相手はいません。
                        </Typography>
                    )
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default ChatRooms
