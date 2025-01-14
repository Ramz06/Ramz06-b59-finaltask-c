const authValidation = require("../validattion/auth-validation")
const { Collection, Tasks } = require("../../models")


const renderCollection = (req, res) => {
    res.render("collection")
};  

const addCollection = async (req, res) => {
    const user = await authValidation(req.session.user);
    if (!user) {    
        return res.status(401).json([{ error: "unauthorized" }]);
    }
    console.log(req.body)
    const { name } = req.body;
  
    try {
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Name collection cannot be empty." });
      }
  
      const existingCollection = await Collection.findOne({
        where: {
          name,
          user_id: user.id
        },
      });
  
      if (existingCollection) {
        return res.status(500).json({error : "cannot use the name of existing collection"});
      }
  
      const collection = await Collection.create({ name, user_id: user.id });
      console.log({collection})
  
      res.status(201).json({ msg: "collection successfully created."});
    } catch (error) {
      console.error("Error saat menambahkan koleksi:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
  };

  
  const deleteCollection = async (req, res) => {
    try {
      const user = await authValidation(req.session.user);
      if (!user) {
        return res.status(401).json({ error: "unauthorized" });
      }
  
      const { id } = req.params;
      const collection = await Collection.findOne({
        where: { id: id },
      });
  
      if (!collection) {
        return res.status(404).json({ error: "collection not found" });
      }
  
      if (user.id !== collection.user_id) {
        return res.status(403).json({ error: "forbidden" });
      }
  
      await Collection.destroy({
        where: { id: id },
      });
  
      return res.status(200).json({ msg: "Collection deleted successfully" });
    } catch (error) {
      console.error("Error deleting collection:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


const collectionController = {
    renderCollection,
    addCollection,
    deleteCollection
}

module.exports = collectionController