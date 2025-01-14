const deleteTask = async (id) => {
    try {
      const response = await fetch(`/collection/${id}`, {
        method: "DELETE"
      });
  
      if (response.status === 401) {
        return "unauthorized";
      } else if (response.status === 403) {
        return "forbidden"
      } else if (response.status === 200) {
        return "success"
      } else {
        console.log("ok");
      }
    } catch (error) {
      console.error("error :", error);
    }
  };

export default deleteTask