import { logout } from "../firebase";

function Homepage(props) {
    return (<>
        <button onClick={logout}></button>
    </>);
}

export default Homepage;