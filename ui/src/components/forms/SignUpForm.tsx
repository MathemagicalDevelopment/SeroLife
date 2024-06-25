import { useState } from 'react'
import { useLogin } from '../../contexts/user.context';
import Spinner from '../Spinner';
import { signUp } from '../../services/auth.service';
import { useHistory } from 'react-router-dom';

const SignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({ name: '', password: '', passwordMatch: '', });
    const login = useLogin();
    const history = useHistory();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const success = await signUp(formData.name, formData.password, formData.passwordMatch);
        setLoading(true);
        if (success) {
            const signedIn = login(formData.name, formData.password);
            history.push('/');
            if (!signedIn) setLoading(false);
        } else {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row center">
                <label>
                    Username:
                    <input type='text' name='name' minLength={5} required onChange={handleChange} />
                </label>
            </div>
            <div className="row center">
                <label>
                    Password:
                    <input type='password' name='password' minLength={5} required onChange={handleChange} />
                </label>
            </div>
            <div className="row center">
                <label>
                    Re-enter Password:
                    <input type='password' name='passwordMatch' minLength={5} required onChange={handleChange} />
                </label>
            </div>
            {
                formData.password.length >= 5
                && formData.passwordMatch.length >= 5
                && formData.password !== formData.passwordMatch
                && (<div className='row center'>
                    <span>ERROR: Passwords don't match</span>
                </div>)
            }
            <div className="row center">
                {loading && <Spinner />}
            </div>
            <div className="row center">
                <button type='submit'>Sign Up</button>
            </div>
        </form>
    )
}

export default SignUpForm