// Docs:
// https://github.com/AleoHQ/snarkOS/blob/staging/rpc/documentation/public_endpoints/getblockhash.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getBlockHash(
    rpcClient: OpenRPCClient,
    blockHeight: number
): Promise<string> {
    const resp = await rpcClient.request({
        method: "getblockhash",
        params: [blockHeight],
    });

    return resp;
}
