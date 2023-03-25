import { useContext } from "react"
import Register from "../Authentication/RegisterIndex";
import AuthContex from '../../Context/index';
import UserNavigation from "./Navigation";

export default function HomeNavigation() {

    const { user } = useContext(AuthContex)

    return (
        <>
            {!user.registered
                ?
                <Register />
                :
                <UserNavigation />
            }
        </>
    )
}