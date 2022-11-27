import client from "lib/api/client"
import { Like } from "interfaces/index"

import Cookies from "js-cookie"

// 全てのいいね情報（自分から、相手から両方）を取得
export const getLikes = () => {
    return client.get("likes", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}

// いいねを作成
export const createLike = (data: Like) => {
    return client.post("likes", data)
}
