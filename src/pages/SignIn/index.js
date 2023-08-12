import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label, GithubButton, GithubText } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import { loginWithGithub } from '../../utils/loginWithGithub';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function getUserData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const reqParams = urlParams.get('code');
    if (reqParams) {
      const { data: userData } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/sign-in/github/${reqParams}`
      );
      setUserData(userData);
      navigate('/dashboard');
      toast('Login realizado com sucesso!');
    }
  }

  useEffect(() => {
    getUserData();
  }, [setUserData, toast, navigate]);

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      navigate('/dashboard');
      toast('Login realizado com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
        <GithubButton onClick={loginWithGithub}>
          <FaGithub size={20} color={'white'} />
          <GithubText>LOGIN COM GITHUB
          </GithubText>
        </GithubButton>
      </Row>
    </AuthLayout>
  );
}
