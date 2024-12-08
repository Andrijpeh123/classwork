import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import LabelWithInput from "./LabelWithInput";
import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate(); 

  async function onSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await axios.post(`https://dogs.kobernyk.com/login`, {
        username,
        password,
      });
      setToken(response.data.token);
      setTimeout(()=> navigate('/'),0); 
    } catch (error) {
      console.error('Помилка авторизації:', error);
    }
  }

  return (
    <>
      <h1>Сторінка авторизації</h1>
      <form onSubmit={onSubmit}>
        <LabelWithInput
          labelName="Ім'я користувача"
          name="username"
          type="text"
          value={username}
          onChange={(value: string) => setUsername(value)}
        />
        <LabelWithInput
          labelName="Пароль"
          name="password"
          type="password"
          value={password}
          onChange={(value: string) => setPassword(value)}
        />
        <button>Авторизуватися</button>
      </form>
    </>
  );
};

export default Login;
