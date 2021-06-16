// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getblockcount.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getBlockCount(rpcClient: OpenRPCClient): Promise<number> {
    const resp = await rpcClient.request({
        method: "getblockcount",
        params: [],
    });

    return resp;
}
