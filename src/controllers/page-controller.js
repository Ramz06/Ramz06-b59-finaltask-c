const { Collection, Tasks } = require("../../models");

const pageController = {
  async index(req, res) {
    try {
      const result = await Collection.findAll();
      const collections = await Promise.all(
        result.map(async (collection) => {
          const tasks = await Tasks.findAll({
            where: { collections_id: collection.id },
          });
      
          const isDoneTasks = await Tasks.findAll({
            where: { collections_id: collection.id, is_done: true },
          });
      
          return {
            id: collection.id,
            name: collection.name,
            tasks: tasks.length,
            isDone: isDoneTasks.length,
          };
        })
      );

        if (collections) {
            res.render("index", {collections})
        } else {
            res.render("index")
        }
    } catch (error) {
      console.error("Error saat mengambil data koleksi:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
  },
};

module.exports = pageController;
