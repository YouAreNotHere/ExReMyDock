import Button from "../../../../shared/button/Button";
import {ITodo} from "@/features/todo/types/ITodosRequest";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@/features/todo/types/RootState";
import './Modal.css'
import {changeEditedTodoId, completeTodo, editTodo} from "../../../../actions";
import EditButtonIcon from "../../../../shared/button/EditButtonIcon";
import SuggestButtonIcon from "../../../../shared/button/SuggestButtonIcon";
import React, {useRef, useState, useEffect} from "react";
import {useRequest} from "../../../../shared/hooks/useRequest";
import {saveEditedTodoRequest} from "../../api/todos.request";
import {useArrowNavigation} from "../../../../shared/hooks/useArrowNavigation";

interface Props{
    isModalOpen: boolean,
    setIsModalOpen: (isModal: boolean) => void,
}

const Modal = ({isModalOpen, setIsModalOpen}: Props) =>{
    const todos: ITodo[] = useSelector((state: IRootState) => state.todos);
    const todoIdInModal: number | null = useSelector((state: IRootState) => state.todoIdInModal);
    const editedTodo = useSelector((state: IRootState) => state.editedTodoId);
    const dispatch = useDispatch();
    let currentTodo: ITodo | undefined;
    if (!!todoIdInModal) currentTodo = todos?.find((todo: ITodo) => todo.id === todoIdInModal);
    const [newTodoText, setNewTodoText] = useState(currentTodo?.text);
    const [newAdditionalText, setNewAdditionalText] = useState(currentTodo?.additionalText);
    const inputRef = useRef<HTMLInputElement>(null);
    const additionalInputRef = useRef(null);

    useArrowNavigation([
        inputRef,
        additionalInputRef,
    ]);

    const { makeRequest: completeTodoRequest } = useRequest({
        method: 'POST',
        body: { id: currentTodo?.id, completed: !currentTodo?.completed },
        url: '/todos/completeTodo',
    });

    const { makeRequest: saveEditedTodoRequest } = useRequest({
        method: 'POST',
        body: { id: currentTodo?.id, text: newTodoText, additionalText: newAdditionalText },
        url: '/todos/saveEditedTodo',
    });

    const onCloseClickHandler = () => {
        setIsModalOpen(!isModalOpen);
    }

    const onEditClickHandler = () => {
        dispatch(changeEditedTodoId(todoIdInModal))
    }

    const onCompleteHandler = async (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLElement>) => {
        await completeTodoRequest();
        dispatch(completeTodo(currentTodo?.id));
    };

    const onSavedEditedHandler = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        await saveEditedTodoRequest();
        dispatch(editTodo(newTodoText, currentTodo?.id, newAdditionalText));
        dispatch(changeEditedTodoId(null));
        setNewTodoText('');
    };

    const onCancelEditHandler = () =>{
        dispatch(changeEditedTodoId(null));
    }

    useEffect(() => {
        if (currentTodo) {
            setNewTodoText(currentTodo.text);
            setNewAdditionalText(currentTodo.additionalText);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [currentTodo, editedTodo]);

    return (
        <div className={isModalOpen ? "modal" : "hidden-modal"}>
            {editedTodo === todoIdInModal ? (
                <div key={currentTodo?.id} className="modal-input-and-textarea__wrapper">
                    <input
                        ref={inputRef}
                        value={newTodoText}
                        onChange={(e) => {
                            setNewTodoText(e.target.value);
                        }}
                        className = "modal-text__input"
                    />
                    <textarea
                        ref = {additionalInputRef}
                        value={newAdditionalText}
                        onChange={(e) => setNewAdditionalText(e.target.value)}
                        className = "modal-additional-text__input"
                        />
                    <div className="buttons-wrapper">
                        <button className='addPadding' onClick={onSavedEditedHandler}>
                            Сохранить
                        </button>
                        <Button
                            id={"modal-additional-text__input"}
                            value={"Отменить"}
                            onClick={() => {
                                onCancelEditHandler()
                                setIsModalOpen(!isModalOpen);
                            }}
                            disabled={false}/>
                    </div>
                </div>
            ) : (
                <div className="text-modal__wrapper">
                    <div className="text-with-buttons__wrapper">
                        <Button
                            id={"edit-todo-button"}
                            value={""}
                            onClick={onEditClickHandler}
                            disabled={false}
                            className="edit-button"
                        >
                            <EditButtonIcon className={"edit-todo"}/>
                        </Button>
                        <p
                            className={currentTodo?.completed ? "modal-text" : "сompleted "}
                            onClick={onCompleteHandler}
                            title="Нажми на текст задачи, чтобы пометить её как выполненную">
                            {currentTodo?.text}
                        </p>
                        <Button
                            id={"close-modal-button"}
                            value={""}
                            onClick={onCloseClickHandler}
                            disabled={false}
                            className="close-modal-button"/>
                    </div>
                    <p className={currentTodo?.additionalText ? "modal-text" : "transparent"}>
                        {currentTodo?.additionalText ? currentTodo?.additionalText : "Здесь можно написать дополнение к задаче..."}
                    </p>
                </div>
            )
            }
        </div>
)
}

export default Modal;