import "./GithubBar.css";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../types/RootState";

const GithubBar = () => {
    const [userPic, setUserPic] = useState<any>();
    const [name, setName] = useState<string>();
    const userName: string | undefined = useSelector((state: IRootState) => state.currentUsername);

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        if (!userName) return;
        xhr.open("GET", `https://api.github.com/users/${userName}`);
        xhr.send();
        let img = document.createElement("img");
        xhr.onload = () => {
            const data = JSON.parse(xhr.response);
            img.src = data.avatar_url;
            img.className = "github__img";
            setUserPic(img);
            if (data.name) setName(data.name);
        }
        xhr.onerror = () =>{
            console.log("При загрузке профиля github что-то пошло не так")
        }
    }, []);

    return(
        <div className="github-bar">
            <p className="github-userName">{name ? name : userName}</p>
            <img className="github__img" src = {userPic?.src}/>
        </div>
    )
}

export default GithubBar;