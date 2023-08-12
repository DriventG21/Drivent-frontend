import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label, GithubButton, GithubText } from '../../components/Auth';
import Link from '../../components/Link';

import EventInfoContext from '../../contexts/EventInfoContext';

import useSignUp from '../../hooks/api/useSignUp';
import { loginWithGithub } from '../../utils/loginWithGithub';

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  const { eventInfo } = useContext(EventInfoContext);

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repita sua senha"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>
            Inscrever
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
        <GithubButton onClick={loginWithGithub}>
          <FaGithub size={20} color={'white'}/>
          <GithubText>
            LOGIN COM GITHUB
          </GithubText>
        </GithubButton>
      </Row>
    </AuthLayout>
  );
}
