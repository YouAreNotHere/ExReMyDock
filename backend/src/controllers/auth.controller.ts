const createUser = (req: Request, res: Response) => {
  console.log(JSON.stringify(req));

  res.send('poshel nahuyu');
};

export { createUser };
