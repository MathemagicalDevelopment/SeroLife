import React from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../../components/forms/SignUpForm'

const SignUpPage = () => {
    return (
        <div className="container">
            <SignUpForm />
            <div className="row center">
                <Link to="/login"><button>Already Have An Account?</button></Link>
            </div>
        </div>)
}

export default SignUpPage