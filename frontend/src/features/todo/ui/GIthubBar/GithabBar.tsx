import "./GithubBar.css";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../types/RootState";
import Menu from './Menu';
import ReposList from './ReposList';

const GithubBar = () => {
    const [userPic, setUserPic] = useState<any>();
    const [name, setName] = useState<string>();
    const userName: string | undefined = useSelector((state: IRootState) => state.currentUser?.userName);
    const [repos, setRepos]: any = useState([]);
    const [isReposListOpen, setIsReposListOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        if (!userName) return;
        xhr.open("GET", `https://api.github.com/users/${userName}`);
        xhr.send();
        let img = document.createElement("img");
        xhr.onload = () => {
            if (xhr.status !== 200){
              console.log("Ошибка", xhr.status);
              setUserPic(null);
              return;
            }
            return new Promise(resolve => {
                const data = JSON.parse(xhr.response);
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
                        setRepos(data.map((repo: any) => repo.name));
                    };
                    xhr.onerror = () =>{
                        console.log("При загрузке реп что-то пошло не так")
                    }
                })
              .catch((error: any) =>{
                setRepos(null);
              })
        }
        xhr.onerror = () =>{
            console.log("При загрузке профиля github что-то пошло не так")
        }
    }, []);

    return(
        <div className={"github-bar"}>
                <Menu
                  isMenuOpen={isMenuOpen}
                  repos={repos}
                  closeMenu={() => setIsMenuOpen(!isMenuOpen)}
                  isReposListOpen={isReposListOpen}
                  setIsReposListOpen={setIsReposListOpen}
                />
                <ReposList
                  repos={repos}
                  isReposListOpen={isReposListOpen}
                  setIsReposListOpen={() => setIsReposListOpen(!isReposListOpen)}/>
                <div className="github-pic-with-username" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <p className="github-userName">{name ? name : userName}</p>
                    {userPic ? (<img className="github__img" src = {userPic?.src}/>) : null}
                </div>
                </div>
            )
            }

            export default GithubBar;