// Docs:
// https://github.com/AleoHQ/snarkOS/blob/master/rpc/documentation/private_endpoints/getrecordcommitments.md
import { Client as OpenRPCClient } from "@open-rpc/client-js";

export async function getRecordCommitments(
    rpcClient: OpenRPCClient
): Promise<Array<string>> {
    const resp = await rpcClient.request({
        method: "getrecordcommitments",
        params: [],
    });
    console.log(resp);

    return resp;
}
