import { Logo } from "../components/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriberMutation } from "../generated";

type CreateSubscriberFormData = {
  name: string;
  email: string;
};

const createSubscriberFormSchema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("O campo e-mail é obrigatório"),
});

export function Subscribe() {
  const navigate = useNavigate();
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubscriberFormData>({
    resolver: yupResolver(createSubscriberFormSchema),
  });
  const handleCreateSubscriber: SubmitHandler<CreateSubscriberFormData> = async ({
    name,
    email,
  }) => {
    await createSubscriber({
      variables: { name, email },
    });

    navigate("/event");
  };

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between gap-2 mt-20 mx-auto px-10 flex-col md:flex-row">
        <div className="flex flex-col items-center md:block max-w-[640px] text-center md:text-left mb-4 md:mb-0">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight ">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded ">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubmit(handleCreateSubscriber)}
            className="flex flex-col gap-2 w-full"
          >
            <input
              {...register("name", { required: true })}
              className={`bg-gray-900 rounded px-5 h-14 outline-none focus:outline-green-500 ${
                errors?.name && "outline-red-500"
              }`}
              type="text"
              placeholder="Seu nome completo"
            />
            {errors?.name && (
              <span className="mx-auto text-red-500 text-sm mb-2">
                {errors.name.message}
              </span>
            )}
            <input
              {...register("email", { required: true })}
              className={`bg-gray-900 rounded px-5 h-14 outline-none focus:outline-green-500 ${
                errors?.email && "outline-red-500"
              }`}
              type="email"
              placeholder="Digite seu e-mail"
            />
            {errors?.email && (
              <span className="mx-auto text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            <button
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bol text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              type="submit"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code_mockup.png" className="mt-10" alt="" />
    </div>
  );
}
