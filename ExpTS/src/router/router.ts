import { Router } from "express"

const router = Router()

router.get("/bem-vindo/:nome", (req, res) => {
    res.send(`Seja bem-vindo(a) ${req.params.nome}`)
});

router.get("/", (req, res) => {
  res.send("Hello world!");
});

router.get("/about", (req, res) => {
    res.send("Página about");
});

export default router;