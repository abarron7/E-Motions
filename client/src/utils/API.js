import http from "../services/httpService";

export default {
  // Gets all new memes
  scrapeMemes: function(userID) {
    return http.get("/api/scrape", {
      params: { userID: userID }
    });
  },
  // Gets all saved memes
  getAllSavedMemes: function(callback) {
    return http.get("/api/memes/" + callback.userID + "/" + callback.review);
  },
  // Deletes the saved meme with the given id
  deleteMeme: function(id) {
    return http.delete("/api/memes/" + id);
  },
  // Saves a meme to the database
  saveMeme: function(memeData) {
    return http.post("/api/memes", memeData);
  }
};
