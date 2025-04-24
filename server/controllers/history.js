const History = require("../models/History");
// async function index(req, res) {
//   try {
//     const historyItems = await History.getAll();
//     res.status(200).json(historyItems)
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

async function index(req, res) {
  try {
    let historyItems = await History.getAll();

    historyItems = historyItems.map(item => ({
      ...item,
      fact_img: item.fact_img.replace(/^client\//, "") 
    }));

    res.status(200).json(historyItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function show(req, res) {
  try {
    const id = req.params.id;
    const historyItem = await History.getOneById(id);
    res.status(200).json(historyItem);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const newHistoryItem = await History.create(data);
    res.status(201).json(newHistoryItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const historyItem = await History.getOneById(id);
    const result = await historyItem.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = req.params.id;
    const historyItem = await History.getOneById(id);
    await historyItem.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { index, show, create, update, destroy };
