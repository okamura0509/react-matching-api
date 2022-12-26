import React, { useState, useContext, useCallback } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import "date-fns"
import DateFnsUtils from "@date-io/date-fns" // バージョンに注意（https://stackoverflow.com/questions/59600125/cannot-get-material-ui-datepicker-to-work）

import { makeStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import Box from "@material-ui/core/Box"
import CancelIcon from "@material-ui/icons/Cancel"

import { AuthContext } from "App"
import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { RequestFormData, SignUpFormData } from "interfaces/index"
import { prefectures } from "data/prefectures"
import { genders } from "data/genders"
import { createRequest } from "lib/api/requests"

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        marginTop: theme.spacing(6)
    },
    submitBtn: {
        marginTop: theme.spacing(1),
        flexGrow: 1,
        textTransform: "none"
    },
    header: {
        textAlign: "center"
    },
    card: {
        padding: theme.spacing(2),
        maxWidth: 340
    },
    inputFileButton: {
        textTransform: "none",
        color: theme.palette.primary.main
    },
    imageUploadBtn: {
        textAlign: "right"
    },
    input: {
        display: "none"
    },
    box: {
        marginBottom: "1.5rem"
    },
    preview: {
        width: "100%"
    }
}))

// 新規リクエスト登録
const NewRequest: React.FC = () => {
    const classes = useStyles()
    const histroy = useHistory()

    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

    const [uid, setUid] = useState<string>(Cookies.get("_client") as string)
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")


    // フォームデータを作成
    const createFormData = (): RequestFormData => {
        const formData = new FormData()
        formData.append('uid', uid)
        formData.append("title", title)
        formData.append("body", body)
        return formData
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const data = createFormData()

        try {
            const res = await createRequest(data)
            console.log(res)

            if (res.status === 200) {

                histroy.push("/home")

                setTitle("")
                setBody("")

                console.log("Signed in successfully!")
            } else {

            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form noValidate autoComplete="off">
                <Card className={classes.card}>
                    <CardHeader className={classes.header} title="新規リクエスト" />
                    <CardContent>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="タイトル"
                            value={title}
                            margin="dense"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="内容"
                            value={body}
                            margin="dense"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
                        />
                        <div style={{ textAlign: "right" }} >
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                disabled={!title || !body ? true : false} // 空欄があった場合はボタンを押せないように
                                className={classes.submitBtn}
                                onClick={handleSubmit}
                            >
                                送信
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default NewRequest
