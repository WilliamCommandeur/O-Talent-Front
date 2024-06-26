import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { changePassword } from "../../utils"
import { toast } from "react-toastify"
import { querySendNewPassword } from "../../query"
import { useAppDispatch } from "../../store/redux-hook/hook"

const ResetPassword = () => {

    const [newPassword, setPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [buttonToAccesFormConnexion, setButtonToAccesFormConnexion] = useState(false)
    const dispatch = useAppDispatch();
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>, setter) => {
        const value = e.target.value;
        setter(value);
    }

    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        passwordAreSimilar()
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const variables = {
            updatedPassword: newPassword
        }
        
        await changePassword(querySendNewPassword, variables, token)
        setButtonToAccesFormConnexion(true)


    }

    const passwordAreSimilar = () => {
        if(newPassword === confirmNewPassword){
            return true 
        } else {
            toast.error("Les mots de passe ne correspondent pas")
            return false}
    }


    return <div>

        {!buttonToAccesFormConnexion && <form className="modal-box">
            <h4>Vous avez oublié votre mot de passe ?</h4>
            <div className="divider"></div>
        <label className="input input-bordered flex items-center gap-4 mb-5" htmlFor="">Mot de passe : 
        <input className="" onChange={(e) => {handleChange(e, setPassword)}} type="email" value={newPassword}/>
        </label>
        <label className="input input-bordered flex items-center gap-4 mb-5" htmlFor="">Confirmer votre mot de passe : 
        <input onChange={(e) => {handleChange(e, setConfirmNewPassword)}} type="email" value={confirmNewPassword}/>
        </label>
        <button onClick={handleSubmit} className="btn bg-green-600 text-white">Changer votre mot de passe</button>
        </form>}
        {
            buttonToAccesFormConnexion && 
            <div>
                <p>Vous pouvez vous connecter avec votre nouveau mot de passe</p>
                <button  className="btn">Ouvrir le formulaire de connexion</button>
                </div>
        }
        <div className="divider"></div> 
            <h4>O'Talent vous recommande</h4>
            <div className="w-[100px] h-[100px] border"></div>
        </div>

 
}

export default ResetPassword