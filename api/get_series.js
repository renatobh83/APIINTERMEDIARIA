import fetch from "node-fetch";

export default async function handler(req, res) {
  console.log("🔍 Início da função");

  const { username, password } = req.query;
  console.log("📩 Query recebida:", { username, password });

  if (!username || !password) {
    console.warn("⚠️ Faltando username ou password");
    return res
      .status(400)
      .json({ error: "Username e password são obrigatórios" });
  }

  try {
    const url = `http://nexusplay.eu/player_api.php?username=${username}&password=${password}&action=get_series`;
    console.log("🌐 Requisitando URL:", url);

    const response = await fetch(url);
    const text = await response.text();

    console.log("📦 Conteúdo recebido (início):", text.slice(0, 300));

    return res.status(200).send(text);
  } catch (error) {
    console.error("❌ Erro ao requisitar servidor remoto:", error);
    return res.status(500).json({ error: "Erro ao acessar servidor remoto" });
  }
}
