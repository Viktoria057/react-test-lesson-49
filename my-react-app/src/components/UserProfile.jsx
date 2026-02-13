import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users/1"

const UserProfile = () => {
    const [loading , setLoading] = useState(true)
    const [users, setUsers] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        let isMounted = true

        const fetchUser = async () => {
            try{
                setLoading(true)
                const response = await fetch(API_URL)

                if(!response.ok){
                    throw new Error("failed to fetch user")
                }

                const data = await response.json()

                if(isMounted){
                    setUsers(data)
                }
            }catch(err){
                if(isMounted){
                    setError(err.message)
                }
            }finally{
                if(isMounted){
                    setLoading(false)
                }
            }
        }

        fetchUser()

        return () => {
            isMounted = false
        }
    }, [])
if(loading){
    return <p>Loading...</p>
}

if(error){
    return (
        <p>
            Error {error}
        </p>
    )
}

return (
    <div>
        <h2>{users.name}</h2>
        <p>Email: {users.email}</p>
        <p>Username: {users.username}</p>
    </div>
)
}
export default UserProfile