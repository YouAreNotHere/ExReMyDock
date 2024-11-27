import "./GithubBar.css";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../types/RootState";

const GithubBar = () => {
    const [userPic, setUserPic] = useState<any>();
    const [name, setName] = useState<string>();
    const userName: string | undefined = useSelector((state: IRootState) => state.currentUsername);
    const [repList, setRepList] = useState([]);
    const [isRepListOpen, setIsRepListOpen] = useState(false);

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        if (!userName || userName.length <4) return;
        xhr.open("GET", `https://api.github.com/users/${userName}`);
        xhr.send();
        let img = document.createElement("img");
        xhr.onload = () => {
            return new Promise(resolve => {
                const data = JSON.parse(xhr.response);
                console.log(data);
                img.src = data.avatar_url;
                img.className = "github__img";
                setUserPic(img);
                if (data.name) setName(data.name);
                resolve(data);
            })
                .then((result: any) =>{
                    let xhr = new XMLHttpRequest();
                    if (!result) return
                    xhr.open("GET", result.repos_url);
                    xhr.send();
                    xhr.onload = () =>{
                        const data = JSON.parse(xhr.response);
                        setRepList(data.map((repo: any) => repo.name));
                    };
                    xhr.onerror = () =>{
                        console.log("При загрузке реп что-то пошло не так")
                    }
                })
        }
        xhr.onerror = () =>{
            console.log("При загрузке профиля github что-то пошло не так")
        }
    }, []);

    return(
        <div className={userPic ? "github-bar" : "display-none"}>
            {isRepListOpen && repList ?
                (<div>
                    <ul className="repos-list">
                        <p
                            className="repos-list-header"
                            onClick={()=> setIsRepListOpen(!isRepListOpen)}>
                            Ваши проекты
                        </p>
                        {repList.map((repo: any) => {
                            return <li key={repo}>{repo}</li>;
                        })}
                    </ul>
                </div>)
                :
                (<div className="github-pic-with-username" onClick={() => setIsRepListOpen(!isRepListOpen)}>
                    <p className="github-userName">{name ? name : userName}</p>
                    <img className="github__img" src = {userPic?.src}/>
                </div>)}
                </div>
            )
            }

            export default GithubBar;