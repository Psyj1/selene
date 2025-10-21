import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

const JWTSecret = "apimushroom";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await userService.Create(name, email, password);
    res.status(201).json({ success: "User registered with success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// FUNÇÃO para realizar o LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscando o usuário pelo e-mail
    const user = await userService.getOne(email);
    // Se o usuário for encontrado
    if (user != undefined) {
      // Fazendo a validação
      if (user.password == password){
        // Gerando o token com JWT
        jwt.sign({ id: user.id, email: user.email }),
          JWTSecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res
                .status(400)
                .json({ error: "It not possible to generate the auth token" });
            } else {
              // Token gerado com sucesso
              res.status(200).json({ token });
            }
          }
       }else{
        res.status(401).json({error: 'Invalid Credentials'})
       };
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
export default { createUser, loginUser };
