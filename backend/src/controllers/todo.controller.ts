const createTodo = (req: Request, res: Response) => {
    console.log(JSON.stringify(req));

    res.send('Todo have added');
};

export { createTodo };