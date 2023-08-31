export async function get<T>(url: string): Promise<T> {
    return await fetch(url).then((response) => {
        if (response.ok) {
            return response.json()
        }
        else {
            console.error(response.json);
            throw response.json();
        }
    })
}


export async function deleteLogEntry<T>(url: string) {
    return await fetch(url, {
        method: "DELETE",
    })
        .then((res) => {
            if (res.ok) {
                return res
            }
            else {
                console.error(res);
                throw res;
            }
        });

}


export async function postLogEntry<T>(url: string, body?: string): Promise<T> {
    return await internalPOST(url, body, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
}
async function internalPOST<T>(
    url: string,
    body?: string,
    headers?: HeadersInit
): Promise<T> {
    let responseOk: boolean;
    return await fetch(url, {
        method: "POST",
        body: body,
        headers,
    })
        .then((res) => {
            responseOk = res.ok;
            return res.json();
        })
        .then((body) => {
            if (responseOk) {
                return body;
            } else {
                console.error(body);
                throw body;
            }
        });
}

export async function putLogEntry<T>(url: string, body?: string) {
    return await internalPUT(url, body, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
}
async function internalPUT<T>(
    url: string,
    body?: string,
    headers?: HeadersInit
) {
    return await fetch(url, {
        method: "PUT",
        body: body,
        headers,
    })
        .then((res) => {
            if (res.ok) {
                return res
            }
            else {
                console.error(res);
                throw res;
            }
        });
}