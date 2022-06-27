import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscription(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="mx-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Build an <strong className="text-blue-500">app from scratch</strong>{" "}
            with <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            In one week only you will learn practicing one of the most popular
            technologies, to grow knowledge and compete in the best job roles
            available in the market.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Subscribe now! It's free!
          </strong>
          <form
            onSubmit={handleSubscription}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Your full name"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Your email"
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Get my spot
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-mockup.png" alt="" className="mt-10" />
    </div>
  );
}
