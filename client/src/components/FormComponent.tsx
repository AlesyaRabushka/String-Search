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

    const [searchBarSuggestion, setSearchBarSuggestion] = useState([]);
    const [getSuggestions, setGetSuggestions] = useState(false)

    useEffect(() => {
        const result = Service.getSearchBarSuggestion().then(data => setSearchBarSuggestion(data))
        console.log(result)
        if (searchBarSuggestion.length != 0){
            setGetSuggestions(true)
        }
    }, [])

    const arr = ['У мамы есть кошка, а у кошки мышка, а у мышки зернышко, а у зернышка наверняка что-то тоже было.', 
                'И по утрам его вкусный омлет', 
                'Она любила жить без проблем',
                'Люблю кофе'];

    const [typing, setTyping] = useState(false);

    const activeRef = useRef<HTMLInputElement | null>(null);


    const highlight = (text:string, word: string) => {
        const reg = new RegExp(word, 'gi');
        return text.replace(reg, (match) => `<mark>${match}</mark>`)
    }


    const inputKey = (e:any) => {
        if (e.key == 'Enter'){
            setPressed(true);
            setShowText(false);
            onSubmit(e);
        }
    }

    const handleChange = (e: any) => {
            setValue(e.target.value);
            let textToSearch = document.getElementById('text-to-search')?.nodeValue;
            console.log('text to search',textToSearch)


            if (e.target.value == ''){
                setTyping(false)
            } else {
                setTyping(true)
            }
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
                <input type="text" id="text-to-search" name="input-field" className="text-input" placeholder={placeholder} value={value} onKeyDown={inputKey} onChange={handleChange}/>
               
            </div>
            <div className="results">
                {spinner ? 
                    <div className="spinner">
                        <ClimbingBoxLoader size={30} color="rgb(96, 11, 129)"/>
                    </div> 
                    : 
                    <>
                    {(typing) && 
                        <>
                            <div className="search-bar-results">
                                {searchBarSuggestion
                                .filter((item1) => {
                                    const searchedItem = value.toLocaleLowerCase();
                                    const itemName = String(item1).toLocaleLowerCase();
                                    console.log(searchedItem)

                                    return itemName.includes(searchedItem)
                                })
                                .map((item:string) => 
                                    <div className="search-bar-results-item" tabIndex={0} ref={activeRef} onClick={e => setValue(item)} onKeyDown={e => {
                                        inputKey(e)
                                    }} dangerouslySetInnerHTML={{__html: highlight(item, value)}}>
                                        {/* {item} */}
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
                                        <div className="item" >
                                            <div className="item-name">
                                                {item.name}
                                            </div>
                                            <div className="item-words">
                                                Found words: {item.words}
                                            </div>
                                            {showText &&
                                                <div className="item-text" dangerouslySetInnerHTML={{__html:item.text}}/>
                                                //     {item.text}
                                                // </div>
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