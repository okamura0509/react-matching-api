import client from "lib/api/client"
import { SearchUserFormData, UpdateUserFormData } from "interfaces/index"

import Cookies from "js-cookie"

// 都道府県が同じで性別の異なるユーザー情報一覧を取得（自分以外）
export const getUsers = () => {
    return client.get("users", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}

// id指定でユーザー情報を個別に取得
export const getUser = (id: number | undefined) => {
    return client.get(`users/${id}`)
}

// ユーザー情報を更新
export const updateUser = (id: number | undefined | null, data: UpdateUserFormData) => {
    return client.put(`users/${id}`, data)
}

//ユーザー検索
export const searchUser = (id: number | undefined | null, name: string, prefecture: string) => {
    console.log(`users/${id}/search?prefecture=${prefecture}`)
    return client.get(`users/${id}/search?prefecture=${prefecture}&name=${name}`)
}
