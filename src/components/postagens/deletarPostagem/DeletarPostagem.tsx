import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { UserState } from '../../../store/tokens/userReducer';
import { toast } from 'react-toastify';

import Postagem from '../../../models/Postagem';
import { buscaId, deleteId } from '../../../services/Service';

import './DeletarPostagem.css';

function DeletarPostagem() {

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const [token, setToken] = useLocalStorage('token');

    const [post, setPosts] = useState<Postagem>()

    useEffect(() => {
        if (token === "") {
          toast.info('Você precisa estar logado!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
            navigate("/login")
    
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/postagens/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function sim() {
        navigate('/posts')

        try {
            await deleteId(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            alert('Postagem deletada com sucesso');
        } catch (error) {
            alert('Erro ao deletar');
        }
    }

    function nao() {
        navigate('/posts')
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem:
                            </Typography>
                            <Typography color="textSecondary" >
                                { post?.titulo }
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default DeletarPostagem;