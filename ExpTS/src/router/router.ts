import { Router } from "express"

const router = Router()

router.get("/hb1", (req, res) =>{
  res.render("hb1", {mensagem: "Alguma mensagem", layout: false});
})

router.get("/hb2", (req, res) => {
  res.render("hb2", {
    vencedorCaprichoso: false,
    layout: false,
  })
})

router.get("/hb3", (req, res) =>{
  const profs = [
    {name: "David Fernandes", room: 321},
    {name: "Altigran Soares", room: 224},
    {name: "Elaine Harada", room: 345},
    {name: "Horácio Fernandes", room: 148},
  ];
  res.render("hb3", {profs, layout: false});
});

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