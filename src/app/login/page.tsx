'use client'
import React, {useState} from "react";
import { useFormik } from "formik";
import {useRouter} from "next/navigation";

import InputText from "@/components/input/InputText";
import Button from "@/components/button/Button";
import CredentialsFormLogin from "@/app/login/_interface/CredentialsForm";

import FilderError from "@/components/input/util/filderError";
import {useAuth} from "@/resources/users/authentication.resourse";
import {AcessToken, Users} from "@/resources/users/users.resouces";
import useNotification from "@/components/notification/notification";
import {loginFormSchema, loginSchema, registerFormSchema, registerSchema} from "@/app/login/_util/formSheme";

function Login() {
    const [newUserState, setUserSate] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<CredentialsFormLogin>({
        initialValues: newUserState ? registerFormSchema : loginFormSchema,
        validationSchema: newUserState ? registerSchema : loginSchema,
        enableReinitialize: true,
        onSubmit: onSubmit,
    })

    async function onSubmit(values: CredentialsFormLogin) {
        if(!newUserState) {
            const credentials: CredentialsFormLogin = {
                email: values.email,
                password: values.password
            }
            try{
                const accessToken: AcessToken = await auth.authenticate(credentials)
                auth.initSession(accessToken);
                router.push("/galeria")
            }catch(error){
                const err = error as Error;
                const message = err.message;
                notification.notify(message, "error")
            }
        } else {
            const user: Users = {email: values.email, name: values.name, password: values.password};
            try {
                await auth.save(user);
                notification.notify("Usuário salvo","success")
                resetForm()
                setUserSate(false)
            }catch(error){
                const err = error as Error;
                const message = err.message;
                notification.notify(message, "error")
            }
        }
    }

    return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10">
                    <h2 className="select-none text-3xl font-extrabold text-center text-blue-700 mb-8">
                        {newUserState ? "Crie sua conta" : "Bem-vindo de volta!"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {newUserState && (
                            <div>
                                <label htmlFor="name" className="select-none block text-sm font-medium text-gray-600 mb-1">
                                    Nome
                                </label>
                                <InputText
                                    style="w-full"
                                    id="name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <FilderError error={errors.name} />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="select-none block text-sm font-medium text-gray-600 mb-1">
                                E‑mail
                            </label>
                            <InputText
                                style="w-full"
                                id="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                            <FilderError error={errors.email} />
                        </div>

                        <div>
                            <label htmlFor="password" className="select-none block text-sm font-medium text-gray-600 mb-1">
                                Senha
                            </label>
                            <InputText
                                style="w-full"
                                id="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <FilderError error={errors.password} />
                        </div>

                        {newUserState && (
                            <div>
                                <label htmlFor="passwordMatch" className="select-none block text-sm font-medium text-gray-600 mb-1">
                                    Confirmar senha
                                </label>
                                <InputText
                                    style="w-full"
                                    id="passwordMatch"
                                    type="password"
                                    value={values.passwordMatch}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <FilderError error={errors.passwordMatch} />
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            {newUserState ? (
                                <>
                                    <Button
                                        type="submit"
                                        label="Salvar"
                                        color="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200"
                                        textColor="white"
                                    />
                                    <Button
                                        type="button"
                                        label="Cancelar"
                                        color="bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-100"
                                        textColor="black"
                                        onClick={() => {
                                            setUserSate(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        type="submit"
                                        label="Entrar"
                                        color="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200"
                                        textColor="white"
                                    />
                                    <Button
                                        type="button"
                                        label="Cadastrar-se"
                                        color="bg-indigo-100 hover:bg-indigo-200 focus:ring-4 focus:ring-indigo-100"
                                        textColor="black"
                                        onClick={() => {
                                            setUserSate(true);
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Login
