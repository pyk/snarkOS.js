// Docs:
// https://github.com/AleoHQ/snarkOS/blob/master/rpc/documentation/public_endpoints/getrawtransaction.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getRawTransaction(
    rpcClient: OpenRPCClient,
    transactionID: string
): Promise<string> {
    const resp = await rpcClient.request({
        method: "getrawtransaction",
        params: [transactionID],
    });

    return resp;
}
