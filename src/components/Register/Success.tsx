import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { useEffect } from 'react'

type Props = {}

const SuccessPage = (props: Props) => {
    const navigate = useNavigate();
    useEffect(() => {
        let userName = sessionStorage.getItem('email');
        if (userName == "" || userName == null) {
          navigate('/')
        }
      })
    return (
        <>
            <div className='succespage'/>
            <div className='success_text'>
                <Typography variant='h4'> You are successfully registered....! <Link className='loginlink' to={'/'}>Proceed to login.👉</Link></Typography>
            </div>
        </>
    )
}

export default SuccessPage