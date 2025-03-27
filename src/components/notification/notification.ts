import { toast } from 'react-toastify'

const useNotification = () => {
    function  notify(message: string, leval: "success" | "warning" | "error" | "info", ){
        toast(message, {
            type: leval,
        })
    }

    return {
        notify
    }
}

export default useNotification;
