// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getconnectioncount.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getConnectionCount(
    rpcClient: OpenRPCClient
): Promise<number> {
    const resp = await rpcClient.request({
        method: "getconnectioncount",
        params: [],
    });

    return resp;
}
