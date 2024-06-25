
import { ReactNode } from 'react'
import { useToken } from '../contexts/user.context';
import { Redirect, Route } from 'react-router-dom';

type Props = { path: string; children: ReactNode }

const AuthenticatedRoute = ({ path, children, ...rest }: Props) => {
    const token = useToken();

    return (
        <Route path={path}
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

export default AuthenticatedRoute