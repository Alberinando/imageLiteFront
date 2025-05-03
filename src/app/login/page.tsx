'use client'
import React, {useState} from "react";
import { useFormik } from "formik";
import {useRouter} from "next/navigation";

import Template from "@/components/template/Template";
import InputText from "@/components/input/InputText";
import Button from "@/components/button/Button";
import CredentialsFormLogin from "@/app/login/_interface/CredentialsForm";

import FilderError from "@/components/input/util/filderError";
import {useAuth} from "@/resources/users/authentication.resourse";
import {AcessToken, Users} from "@/resources/users/users.resouces";
import useNotification from "@/components/notification/notification";
import {loginFormSchema, loginSchema, registerFormSchema, registerSchema} from "@/app/login/_util/formSheme";

function Login() {
    const [loading, setLoading] = useState<boolean>(false);
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
            setLoading(true)
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
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(true)
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
            }finally {
                setLoading(false)
            }
        }
    }

    return (
        <Template loading={loading}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="select-none mt-1 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {newUserState ? "Criar novo usuário" : "Faça login na sua conta"}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        {newUserState && (
                            <>
                                <div>
                                    <label className="select-none block text-sm font-semibold font-medium leading-6 text-gray-900">Name: </label>
                                </div>
                                <div className="mt-2">
                                    <InputText
                                        style= "w-full"
                                        id="name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <FilderError error={errors.name} />
                                </div>
                            </>
                        )}
                        <div>
                            <label className="select-none block text-sm font-semibold font-medium leading-6 text-gray-900">E-mail: </label>
                        </div>
                        <div className="mt-2">
                            <InputText
                                style= "w-full"
                                id="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                            <FilderError error={errors.email} />
                        </div>
                        <div>
                            <label className="select-none block text-sm font-semibold font-medium leading-6 text-gray-900">Senha: </label>
                        </div>
                        <div className="mt-2">
                            <InputText
                                style= "w-full"
                                id="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <FilderError error={errors.password} />
                        </div>
                        {newUserState && (
                            <>
                                <div>
                                    <label className="select-none block text-sm font-semibold font-medium leading-6 text-gray-900">Repita a senha: </label>
                                </div>
                                <div className="mt-2">
                                    <InputText
                                        style= "w-full"
                                        id="passwordMatch"
                                        type="password"
                                        value={values.passwordMatch}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                    />
                                    <FilderError error={errors.passwordMatch} />
                                </div>
                            </>
                        )}

                        <div>
                            {newUserState && (
                                <>
                                    <Button
                                        type="submit"
                                        color="bg-indigo-700 hover:bg-indigo-500 select-none"
                                        label="Salvar"
                                        textColor="white" />
                                    <Button
                                        type="button"
                                        color="bg-red-700 hover:bg-red-500 mx-2 select-none"
                                        label="Cancelar"
                                        textColor="white"
                                        onClick={() => setUserSate(false)} />
                                </>
                            )}
                            {!newUserState && (
                                <>
                                    <Button
                                        type="submit"
                                        color="bg-indigo-700 hover:bg-indigo-500 select-none"
                                        label="Entrar"
                                        textColor="white" />
                                    <Button
                                        type="button"
                                        color="bg-red-700 hover:bg-red-500 mx-2 select-none"
                                        label="Cadastra-se"
                                        textColor="white"
                                        onClick={() => setUserSate(true)}
                                    />
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}

export default Login
