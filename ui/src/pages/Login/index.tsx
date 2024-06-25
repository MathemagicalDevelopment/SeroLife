import { Link } from "react-router-dom"
import LoginForm from "../../components/forms/LoginForm"

const LoginPage = () => {
    return (
        <div className="container">
            <LoginForm />
            <div className="row center">
                <Link to="/sign-up">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage