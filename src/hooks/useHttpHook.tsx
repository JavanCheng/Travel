import { useEffect, useState } from "react";
import { Toast } from "antd-mobile"

function useHttpHook({
    url,
    method = 'post',
    headers,
    body = {},
    watch = [],
}: any) {
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(true);

    async function Http() {
        setLoading(true);

        const defaultHeaders = {
            'Content-Type': 'application/json',
        }

        let params: any;
        if (method.toUpperCase() === 'GET') {
            params = undefined;
        } else {
            params = {
                headers: {
                    ...defaultHeaders,
                    headers
                },
                method,
                body: JSON.stringify(body)
            }
        }

        return new Promise((resolve, reject) => {
            fetch('/api' + url, params)
                .then(res => res.json())
                .then(res => {
                    if (res.status === 200) {
                        resolve(res);
                        setResult(res);
                    } else {
                        Toast.fail(res.errMsg);
                        reject(res.errMsg);
                    }
                })
                .catch(err => {
                    Toast.fail(err);
                    reject(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    }

    useEffect(() => {
        Http();
    }, watch);

    return [result, loading];
}

export default useHttpHook;