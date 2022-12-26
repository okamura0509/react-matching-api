import client from "lib/api/client"
import Cookies from "js-cookie"
import { Request, RequestFormData } from "interfaces"

// メッセージを作成
export const getRequests = () => {
    return client.get("requests", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}

export const createRequest = (data: RequestFormData) => {
    return client.post("requests", data)
}
