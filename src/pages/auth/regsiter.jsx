import AuthLayout from "../../components/Layouts/AuthLayout";
import RegisterForm from "../../components/Fragments/RegisterForm";

function RegisterPage() {
  return (
    <AuthLayout title="Masuk ke akun anda">
      <RegisterForm />
      <AuthLayout.GuideLink href="/login" label="Masuk">
        Sudah punya akun?
      </AuthLayout.GuideLink>
    </AuthLayout>
  );
}

export default RegisterPage;
