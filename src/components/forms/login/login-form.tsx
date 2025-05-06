import { Formik, Form, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useLoginForm } from "./use-login-form";
import Link from "next/link";

export function LoginForm() {
  const { initialValues, handleSubmit, loginSchema } = useLoginForm();
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, touched }) => (
        <Form className="w-full max-w-sm mx-auto p-6 rounded-lg shadow-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              E-mail
            </label>
            <InputText
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={`w-full ${errors.email && touched.email ? "p-invalid" : ""}`}
              placeholder="Digite seu e-mail"
            />
            <small className="text-red-500">
              <ErrorMessage name="email" />
            </small>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Senha
            </label>
            <Password
              id="senha"
              name="senha"
              value={values.senha}
              onChange={handleChange}
              className={`w-full ${errors.senha && touched.senha ? "p-invalid" : ""}`}
              placeholder="Digite sua senha"
              feedback={false}
              toggleMask
            />
            <small className="text-red-500">
              <ErrorMessage name="password" />
            </small>
          </div>

          <Button label="Entrar" type="submit" className="w-full" />
            <Link
              href="/cadastro"
              className="text-sm hover:underline hover:text-blue-800! transition-colors"
            >
              Ou cadastre-se aqui!
            </Link>
        </Form>
      )}
    </Formik>
  );
}
