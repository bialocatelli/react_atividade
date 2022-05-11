import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserLogin from '../../models/UserLogin';
import { login } from '../../services/Service';
import { addId, addToken } from '../../store/tokens/action';

import './Login.css';

function Login() {

    let history = useNavigate()

    const dispatch = useDispatch()

    const [token, setToken] = useState('')

    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })


    const [respUserLogin, setRespUserLogin] = useState<UserLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        token: '',
        foto: ""
    })

    useEffect(() => {
        if (token !== "") {
            dispatch(addToken(token))
            history('/home')
        }
    }, [token])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (respUserLogin.token !== "") {


            console.log("Token: " + respUserLogin.token)
            console.log("ID: " + respUserLogin.id)


            dispatch(addToken(respUserLogin.token))
            dispatch(addId(respUserLogin.id.toString()))
            history('/home')
        }
    }, [respUserLogin.token])

    async function logar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        try {


            await login(`/usuarios/logar`, userLogin, setRespUserLogin)
            alert("Usuário logado com sucesso")

        } catch (error) {
            alert("Dados do usuário inconsistentes")
        }
    }


    return (
        <Grid container direction='row' justifyContent='center' alignItems='center'>
            <Grid alignItems='center' xs={6}>
                <Box paddingX={20}>

                    <form onSubmit={logar}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>

                        <TextField
                            value={userLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />

                        <TextField
                            value={userLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />

                        <Box marginTop={2} textAlign='center'>

                            <Button type='submit' variant='contained' color='primary'>
                                Logar
                            </Button>

                        </Box>
                    </form>

                    <Box display='flex' justifyContent='center' marginTop={2}>
                        <Box marginRight={1}>
                            <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastro'>
                            <Typography variant='subtitle1' gutterBottom align='center' className='textos1'>Cadastre-se</Typography>
                        </Link>
                    </Box>

                </Box>
            </Grid>
            <Grid xs={6} className='imagem'>

            </Grid>
        </Grid>
    )
}

export default Login;