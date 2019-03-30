import http from "../services/httpService";

export default {
  // Gets all new memes
  scrapeMemes: function() {
    return http.get("/api/scrape");
  },
  // Gets all saved memes
  getAllSavedMemes: function() {
    return http.get("/api/memes");
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
