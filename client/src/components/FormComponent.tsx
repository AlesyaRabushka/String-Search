import React, { FC, useEffect, useState } from "react"
import "./FormComponent.css"
import Service from "../service/service";
import {ClimbingBoxLoader} from "react-spinners"
import {chooseWords} from "../helpers/helpers"

export const FormComponent:FC = () => {

    const [value, setValue] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [files, setFiles] = useState<any>([]);
    const [found, setFound] = useState(false)
    const [showText, setShowText] = useState(false)

    const inputKey = (e:any) => {
        if (e.key == 'Enter'){
            onSubmit(e);
        }
    }

    const onSubmit = async (e:any) => {
        console.log(value)
        setSpinner(true);
        const result = await Service.getFiles(value);
        if (result){
            const resultFiles = await chooseWords(result);
            setFiles(resultFiles)
            setFound(true)
        }
        setSpinner(false);
    }

    return (
        <div className="form-component">
            <div className="input-form">
                <input type="text" name="input-field" className="text-input" placeholder="Введите слово или выражение" onKeyDown={inputKey} onChange={e => setValue(e.target.value)}/>
               
            </div>
            <div className="results">
                {spinner ? 
                    <div className="spinner">
                        <ClimbingBoxLoader size={30} color="rgb(96, 11, 129)"/>
                    </div> 
                    : 
                    <>
                        {files ? 
                            <>
                                { found &&
                                    <>
                                        <label className="label">Количество обнаруженных файлов: {files.length}</label>
                                        {/* <button className="show-text-button" type="button" onClick={e => setShowText(!showText)}> */}
                                            {showText ? 
                                                <label className="show-text-button" onClick={e => setShowText(!showText)}>Скрыть текст файлов</label> 
                                                : 
                                                <label className="show-text-button" onClick={e => setShowText(!showText)}>Показать текст файлов</label>}
                                        {/* </button> */}
                                    </>
                                }

                                    <div className="files-content">
                                    {files.map((item:any) => 
                                        <div className="item">
                                            <div className="item-name">
                                                {item.name}
                                            </div>
                                            <div className="item-words">
                                                Похожие слова: {item.words}
                                            </div>
                                            {showText &&
                                                <div className="item-text">
                                                    {item.text}
                                                </div>
                                            }
                                            
                                        </div>
                                    )}
                                </div>
                                                
                                
                            </>
                            : 
                            <>
                                
                            </>
                        }
                    </>
                }
                
            </div>
        </div>
    )
}