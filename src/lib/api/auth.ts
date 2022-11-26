import { SignInData, SignUpData } from "interfaces";
import Cookies from "js-cookie";
import client from "./client";


export const signUp = (data: SignUpData) => {
    return client.post("auth", data);
}

export const signIn = (data: SignInData) => {
    return client.post("auth/sign_in", data)
}

export const signOut = () => {
    return client.delete("auth/sign_out", {
        headers: {
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }
    })
}

export const getCurrentUser = () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) {
        return client.get("/auth/session", {
            headers: {
                "access-token": Cookies.get("_access_token"),
                "client": Cookies.get("_client"),
                "uid": Cookies.get("_uid")
            }
        })
    }
}
