

export default {
    "REGION": process.env.NEXT_PUBLIC_AWS_REGION || "",
    "USER_POOL_ID": process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || "",
    "USER_POOL_APP_CLIENT_ID": process.env.NEXT_PUBLIC_AWS_APP_CLIENT_ID || ""
}