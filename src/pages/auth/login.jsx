import AuthLayout from "../../components/Layouts/AuthLayout";
import LoginForm from "../../components/Fragments/LoginForm";
import { login } from "../../services/auth/auth.service";

function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    login(data);
  };

  return (
    <AuthLayout title="Masuk ke akun anda">
      <LoginForm onSubmit={handleLogin} />
      <AuthLayout.GuideLink href="/register" label="Daftar disini">
        Apakah anda admin perusahaan?
      </AuthLayout.GuideLink>
    </AuthLayout>
  );
}

export default LoginPage;
