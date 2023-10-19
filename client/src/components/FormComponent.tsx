import React, { FC, useState } from "react"
import "./FormComponent.css"
import Service from "../service/service";

export const FormComponent:FC = () => {

    const [value, setValue] = useState('');
    const [files, setFiles] = useState();

    const onTextInput = async (e:any) => {
        setValue(e.target.value);
        const result = await Service.getFiles(value);
        setFiles(result);
    }

    return (
        <div className="form-component">
            <div className="input-form">
                <input type="text" className="text-input" placeholder="Введите слово или выражение" onChange={onTextInput}/>
            </div>
            <div className="results">
                {files && 
                    <div>
                        here
                    </div>
                }
            </div>
        </div>
    )
}