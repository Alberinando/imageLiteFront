import {AcessToken, Credentials, Users} from "@/resources/users/users.resouces";

class AuthService {
    baseURL: string = "http://192.168.1.6:8089/v1/user";
    static AUTH_PARAMS: string = "_auth";

    async authenticate(credentials: Credentials): Promise<AcessToken> {
        const response = await fetch(this.baseURL + "/auth", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401) {
            throw new Error("Usuário ou senha incorretos!!!")
        }

        return await response.json();
    }

    async save(user: Users): Promise<void>{
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.status === 409){
            const error = await response.json();
            throw new Error(error)
        }
    }
}

export const useAuth = () => new AuthService();
