import fetch from "node-fetch";

export default async function handler(req, res) {
  const { username, password } = req.query;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username e password são obrigatórios." });
  }

  try {
    const url = `http://nexusplay.eu/player_api.php?username=${username}&password=${password}&action=get_series`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Erro HTTP: ${response.status}`);
      return res.status(response.status).send("Erro ao acessar servidor IPTV");
    }
    const data = await response.text(); // pode ser .json() se o servidor retornar JSON válido
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).json({ error: "Erro ao acessar o servidor remoto." });
  }
}
