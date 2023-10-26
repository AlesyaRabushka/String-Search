import React, { FC, useEffect, useRef, useState } from "react"
import "./FormComponent.css"
import Service from "../service/service";
import {ClimbingBoxLoader} from "react-spinners"
import {chooseWords} from "../helpers/helpers"
import { useNavigate } from "react-router-dom";

export const FormComponent:FC = () => {

    const [value, setValue] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [files, setFiles] = useState<any>([]);
    const [found, setFound] = useState(false);
    const [showText, setShowText] = useState(false);
    const [pressed, setPressed] = useState(false);


    const [placeholder, setPlaceholder] = useState("Start typing...");


    const arr = ['lala', 'mama', 'papa'];
    const [typing, setTyping] = useState(false);

    const activeRef = useRef<HTMLInputElement | null>(null);

    const keyPressEvent = (e:any) => {
        console.log('dkd')
        if (e.keyCode == 13){
            console.log('here')
            setPressed(true);
            setShowText(false);
            onSubmit(e);
        }
    }

    useEffect(() => {
        if (activeRef.current){
            activeRef.current.addEventListener("keydown", keyPressEvent);
        }
    })

    
    


    const inputKey = (e:any) => {
        if (e.key == 'Enter'){
            setPressed(true);
            setShowText(false);
            onSubmit(e);
        }
    }

    const handleChange = (e: any) => {
            setValue(e.target.value);
            setTyping(true)
            setPressed(false);
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
        setTyping(false);
        setSpinner(false);
    }

    return (
        <div className="form-component">
            <div className="input-form">
                <input type="text" name="input-field" className="text-input" placeholder={placeholder} value={value} onKeyDown={inputKey} onChange={handleChange}/>
                
            </div>
            <div className="results">
                {spinner ? 
                    <div className="spinner">
                        <ClimbingBoxLoader size={30} color="rgb(96, 11, 129)"/>
                    </div> 
                    : 
                    <>
                    {typing && 
                        <>
                            <div className="search-bar-results">
                                {arr.map(item => 
                                    <div className="search-bar-results-item" tabIndex={0} ref={activeRef} onClick={e => setValue(item)} onKeyDown={e => {
                                        inputKey(e)
                                    }}>
                                        {item}
                                    </div>
                                )}
                            </div>
                            {!pressed && <label className="impulse-text">press ENTER to continue</label>}
                        </>

                    }
                        {files ? 
                            <>
                                { found &&
                                    <>
                                        <label className="label">Found files: {files.length}</label>
                                        {/* <button className="show-text-button" type="button" onClick={e => setShowText(!showText)}> */}
                                            {showText ? 
                                                <label className="show-text-button" onClick={e => setShowText(!showText)}>Hide files content</label> 
                                                : 
                                                <label className="show-text-button" onClick={e => setShowText(!showText)}>Show files content</label>}
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
                                                Found words: {item.words}
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