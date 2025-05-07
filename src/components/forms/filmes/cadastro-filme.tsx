import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Formik, Form, ErrorMessage } from "formik";
import { useCadastroFilme, filmeSchema } from "./use-cadastro-filme";
import { useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Filme } from "@/modules/filmes/types";
import { InputTextarea } from 'primereact/inputtextarea';

interface CadastroFilmeDialogProps {
  visible: boolean;
  onHide: () => void;
  filme?: Filme;
}

export function CadastroFilmeDialog({
  visible,
  onHide,
  filme,
}: CadastroFilmeDialogProps) {
  const {
    loading,
    handleSubmit,
    filme: initialValues,
    resetForm,
  } = useCadastroFilme(filme);

  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible]);

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="right"
      style={{ width: "50vw" }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={filmeSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ handleChange, values, errors, touched, setFieldValue }) => (
          <Form className="p-fluid">
            <div className="field">
              <label htmlFor="tituloOriginal">Título Original</label>
              <InputText
                id="tituloOriginal"
                name="tituloOriginal"
                value={values.tituloOriginal}
                onChange={handleChange}
                className={
                  errors.tituloOriginal && touched.tituloOriginal
                    ? "p-invalid"
                    : ""
                }
              />
              <small className="p-error">
                <ErrorMessage name="tituloOriginal" />
              </small>
            </div>

            <div className="field">
              <label htmlFor="tituloTraduzido">Título Traduzido</label>
              <InputText
                id="tituloTraduzido"
                name="tituloTraduzido"
                value={values.tituloTraduzido}
                onChange={handleChange}
                className={
                  errors.tituloTraduzido && touched.tituloTraduzido
                    ? "p-invalid"
                    : ""
                }
              />
              <small className="p-error">
                <ErrorMessage name="tituloTraduzido" />
              </small>
            </div>

            <div className="field">
                <label htmlFor="sinopse">Sinopse</label>
                <InputTextarea
                    id="sinopse"
                    name="sinopse"
                    value={values.sinopse}
                    onChange={handleChange}
                    className={
                        errors.sinopse && touched.sinopse ? "p-invalid" : ""
                    }
                />
                <small className="p-error">
                    <ErrorMessage name="sinopse" />
                </small>
            </div>

            <div className="field">
              <label htmlFor="descricao">Descrição</label>
              <InputText
                id="descricao"
                name="descricao"
                value={values.descricao}
                onChange={handleChange}
                className={
                  errors.descricao && touched.descricao ? "p-invalid" : ""
                }
              />
              <small className="p-error">
                <ErrorMessage name="descricao" />
              </small>
            </div>

            <div className="field">
              <label htmlFor="dtLancamento">Data de Lançamento</label>
              <Calendar
                id="dtLancamento"
                name="dtLancamento"
                value={new Date(values.dtLancamento) ?? new Date()}
                onChange={(e) => setFieldValue("dtLancamento", e.value)}
                showIcon
                className={
                  errors.dtLancamento && touched.dtLancamento ? "p-invalid" : ""
                }
              />
              <small className="p-error">
                <ErrorMessage name="dtLancamento" />
              </small>
            </div>

            {/* <div className="field">
              <label htmlFor="urlImagem">URL da Imagem</label>
              <ImageUploader
                onImageUploaded={(url) => setFieldValue("urlImagem", url)}
                onUploadCancelled={() => setFieldValue("urlImagem", "")}
                initialImageUrl={values.urlImagem}
              />
            </div> */}

            <div className="field">
              <label htmlFor="duracao">Duração (minutos, opcional)</label>
              <InputNumber
                id="duracao"
                name="duracao"
                value={values.duracao}
                onValueChange={(e) => setFieldValue("duracao", e.value)}
                mode="decimal"
                min={0}
              />
              <small className="p-error">
                <ErrorMessage name="duracao" />
              </small>
            </div>

            <div className="field">
              <label htmlFor="orcamento">Orçamento (opcional)</label>
              <InputNumber
                id="orcamento"
                name="orcamento"
                value={values.orcamento}
                onValueChange={(e) => setFieldValue("orcamento", e.value)}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                min={0}
              />
              <small className="p-error">
                <ErrorMessage name="orcamento" />
              </small>
            </div>

            <div className="field">
              <label htmlFor="receita">Receita (opcional)</label>
              <InputNumber
                id="receita"
                name="receita"
                value={values.receita}
                onValueChange={(e) => setFieldValue("receita", e.value)}
                mode="currency"
                currency="BRL"
                locale="pt-BR"
                min={0}
              />
              <small className="p-error">
                <ErrorMessage name="receita" />
              </small>
            </div>

            <div className="field">
              <label htmlFor="linkTrailer">Link do Trailer (Opcional)</label>
              <InputText
                id="linkTrailer"
                name="linkTrailer"
                value={values.linkTrailer}
                onChange={handleChange}
                className={
                  errors.linkTrailer && touched.linkTrailer ? "p-invalid" : ""
                }
              />
              <small className="p-error">
                <ErrorMessage name="linkTrailer" />
              </small>
            </div>

            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={onHide}
              className="p-button-text mr-2"
              type="button"
            />
            <Button
              label={
                loading
                  ? filme
                    ? "Atualizando..."
                    : "Cadastrando..."
                  : filme
                  ? "Atualizar"
                  : "Cadastrar"
              }
              icon="pi pi-check"
              loading={loading}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
}
