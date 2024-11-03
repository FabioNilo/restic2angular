import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";


const app = express();


app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/items", async (req, res) => {
  /* return res.status(500).json(); */
  const fileContent = await fs.readFile("./data/items.json");
  const itemsData = JSON.parse(fileContent);
  res.status(200).json({ items: itemsData });
});

app.post("/items", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./data/items.json");
    const itemsData = JSON.parse(fileContent);
    const maxId = itemsData.reduce((max, item) => (item.id > max ? item.id : max), 0);
    const newId = maxId + 1;
    const newItem = { id: newId, ...req.body };
    itemsData.push(newItem);

    await fs.writeFile("./data/items.json", JSON.stringify(itemsData, null, 2));

    res.status(201).json({ items: itemsData });
  } catch (error) {
    console.error("Erro ao salvar o novo item:", error);
    res.status(500).json({ message: "Erro ao salvar o novo item" });
  }
});

app.put("/items", async (req, res) => {
  try {
    const updatedItem = req.body; 
    const fileContent = await fs.readFile("./data/items.json");
    const itemsData = JSON.parse(fileContent);
    const index = itemsData.findIndex(item => item.id === updatedItem.id);
    if (index === -1) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    itemsData[index] = updatedItem;
    await fs.writeFile("./data/items.json", JSON.stringify(itemsData, null, 2));
    res.status(200).json({ items: itemsData });
  } catch (error) {
    console.error("Erro ao atualizar o item:", error);
    res.status(500).json({ message: "Erro ao atualizar o item" });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const fileContent = await fs.readFile("./data/items.json");
    const itemsData = JSON.parse(fileContent);
    const index = itemsData.findIndex(item => item.id === itemId);
    if (index === -1) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    itemsData.splice(index, 1);
    await fs.writeFile("./data/items.json", JSON.stringify(itemsData, null, 2));
    res.status(200).json({ items: itemsData });
  } catch (error) {
    console.error("Erro ao remover o item:", error);
    res.status(500).json({ message: "Erro ao remover o item" });
  }
});
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
