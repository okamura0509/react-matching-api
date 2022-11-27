import client from "lib/api/client"
import { Message } from "interfaces/index"

// メッセージを作成
export const createMessage = (data: Message) => {
    return client.post("messages", data)
}
