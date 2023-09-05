import { useState, useEffect } from "react";



function FetchUser() {
    const [user, setUser] = useState({});
    const asyncLoad = async () => {
        try {
            const data = await (await fetch('https://jsonplaceholder.typicode.com/todos/1')).json()
            console.log(data)
            setUser(data)
        }
        catch(ex) {
            console.log(ex)
            alert("Something gone wrong")
        }
    }
    useEffect(() => {
        asyncLoad()
    }, [])


    return (
        <div>
            <span className="text-white">UserId: {user.userId}</span>
        </div>
    )
}
export default FetchUser