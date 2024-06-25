import { useState } from 'react'
import { useLogin } from '../../contexts/user.context';
import Spinner from '../Spinner';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({ name: '', password: '' });
    const login = useLogin();
    const history = useHistory()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('pressed', formData, event)
        const success = await login(formData.name, formData.password);
        setLoading(true);
        if (success) {
            history.push('/')
        } else {
            setLoading(false);
        }
    }

    return (<>
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
                {loading && <Spinner />}
            </div>
            <div className="row center">
                <button type='submit'>Sign In</button>
            </div>
        </form>
    </>)
}

export default LoginForm