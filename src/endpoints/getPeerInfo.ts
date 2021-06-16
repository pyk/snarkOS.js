// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getpeerinfo.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getPeerInfo(
    rpcClient: OpenRPCClient
): Promise<Array<string>> {
    const resp = await rpcClient.request({
        method: "getpeerinfo",
        params: [],
    });

    return resp.peers;
}
