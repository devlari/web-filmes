import { Formik, Form, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useCadastroForm } from "./use-cadastro-form";

export function CadastroForm() {
  const { initialValues, handleSubmit, cadastroSchema } = useCadastroForm();
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={cadastroSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, errors, touched }) => (
        <Form className="w-full max-w-sm mx-auto p-6 rounded-lg shadow-md bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
        <div className="mb-4">
            <label
              htmlFor="nome"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                Nome
            </label>
            <InputText
                id="nome"
                name="nome"
                value={values.nome}
                onChange={handleChange}
                className={`w-full ${errors.nome && touched.nome ? "p-invalid" : ""}`}
                placeholder="Digite seu nome"
            />
            <small className="text-red-500">
                <ErrorMessage name="nome" />
            </small>
        </div>    
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label
              htmlFor="confirmacao"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirmar senha
            </label>
            <Password
              id="confirmacao"
              name="confirmacao"
              value={values.confirmacao}
              onChange={handleChange}
              className={`w-full ${errors.confirmacao && touched.confirmacao ? "p-invalid" : ""}`}
              placeholder="Redigite sua senha"
              feedback={false}
              toggleMask
            />
            <small className="text-red-500">
              <ErrorMessage name="confirmacao" />
            </small>
          </div>

          <Button label="Cadastre-se" type="submit" className="w-full" />
        </Form>
      )}
    </Formik>
  );
}
