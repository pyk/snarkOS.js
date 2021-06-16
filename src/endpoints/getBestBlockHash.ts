// Docs:
// https://github.com/AleoHQ/snarkOS/blob/master/rpc/documentation/public_endpoints/getbestblockhash.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getBestBlockHash(
    rpcClient: OpenRPCClient
): Promise<string> {
    const resp = await rpcClient.request({
        method: "getbestblockhash",
        params: [],
    });

    return resp;
}
