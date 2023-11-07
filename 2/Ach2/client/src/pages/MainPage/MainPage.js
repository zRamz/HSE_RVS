import {useState} from "react";
import {useInput} from "../../hooks/validationHook";
import {Modal} from "../../components/modal/Modal";
import {useHttp} from "../../hooks/httpHook";

import './MainPage.css';
import {Loader} from "../../components/loader/Loader";

export const MainPage = () => {
    const { loading, request } = useHttp();
    const [ active, setActive ] = useState(false);
    const [ message, setMessage ] = useState('');
    const num = useInput('', { isEmpty: true, isDigit: true });

    const sendReq = async () => {
        await request('/api/numbers/add', 'POST', { num: num.value })
            .then(resp => {
                setMessage(prevState => `Полученное число ${resp.num}. ${resp.message}`)
                setActive(true)
            }).catch(err => {
                setMessage(prevState => `${err.message}`)
                console.log(err.message)
                setActive(true)
            })
        num.setValue('')
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className={"main"}>
            <div className="main-wrap">
                <input
                    value={ num.value }
                    onBlur={e => num.onBlur(e)}
                    onChange={e => num.onChange(e)}
                    placeholder={"Input something..."} type="text" name="num" id="num" className={"main-input"}/>
                <div className="btn-wrap">
                    <button className={"main-btn"} onClick={sendReq}>Отправить</button>
                </div>
            </div>
            <Modal active={active} setActive={setActive}>
                <div>{message}</div>
            </Modal>
        </div>
    )
}