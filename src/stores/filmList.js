/** filmList.js
 * creates pina store for myFilmSearch vue project
 *
 *
 * @license The Unlicense, http://unlicense.org/
 * @version 0.1
 * @author  AG, https://github.com/gursche/
 * @updated 2024-05-30
 * @link    https://github.com/gursche/
 */
import { defineStore } from "pinia";
import cfg from "@/stores/storedData/config.json";
import filmInintStore from "@/stores/storedData/filmInintStore.json";

import axios from "axios";

export const useFilmListStore = defineStore("FilmListStore", {
  state: () => ({
    /** @type {{ film:{Title:String,Year:Number,imdbID:String}[],
              id: String,
              myFavorite: Boolean,
              myRateing: Number,
              myComment: String,
              myState:String }[]} */
    filmList: [],
    /** @type {Boolean} */
    filterFav: false,
    filterFavTypes: { favorite: true, all: false },
    /** @type {-1..5} */
    filterRate: -1,
    filterRateTypes: { all: -1, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
    /** @type {Boolean} */
    filterComment: false,
    filterCommentTypes: { commented: true, all: false },
    /** @type {String} */
    searchFilmTitle: "",
    /** @type {String} */
    searchFilmType: "",
    /** @type {String}[] */
    searchFilmTypeList: Object.assign(cfg["OMDbApiSearchTypeList"]),
    searchResults: [],
    errorMsg: "",
    id: 0,
  }),
  persist: {
    storage: localStorage
  },
  getters: {
    searchFilm(state) {
      /** 1st Filter: could be integrated in searchNavbar */
      const tF = this.searchFilmTitle.toLowerCase();
      return state.filmList.filter(
        (obj) => obj.film.Title.toLowerCase().includes(tF) == true,
      );
    },
    searchNavBar(state) {
      //** over all filter, returns filterd List starts with searchFilm */
      this.searchResults = state.searchFilm;
      if (state.filterFav == true) {
        //favorite Filter set
        this.searchResults = state.searchResults.filter(
          (obj) => obj.myFavorite == true,
        );
      } else {
        // not set
        this.searchResults = state.searchFilm;
      }
      if (state.filterRate === -1) {
        // no rateing filter
      } else {
        // rateing filter set
        this.searchResults = state.searchResults.filter(
          (obj) => obj.myRateing === state.filterRate,
        );
      }
      if (state.filterComment == true) {
        // commented filter set
        this.searchResults = state.searchResults.filter(
          (obj) => obj.myComment != "",
        );
      }
      return this.searchResults;
    },
    convertSearchTitleToString(state) {
      // returns converted text from searchFilmTitle
      if (state.searchFilmTitle == "") {
        //nothing todo
        return "";
      }
      // split string at ' ' in array
      const txtA = state.searchFilmTitle.split(" ");
      if (txtA.length == 1) {
        //single word
        return state.searchFilmTitle;
      } else {
        // filter empty values and return as string
        const txt = txtA.filter((obj) => obj != "").join("+");
        return txt;
      }
    },
    searchByTitle() {
      /** assure all filter unset, appart searchFilmTitle */
      this.filterFav = false;
      this.filterRate = -1;
      this.filterComment = false;
      // check search type and add to string if not empty
      let sT = "";
      if (this.searchFilmType == "movie") {
        sT += "&type=" + this.searchFilmType;
        console.log("start->", sT);
      }
      //** sringify url request changes to be made in /storedData/config.json */
      const fetchString =
        "/omdb/?apikey=" +
        cfg["OMDbApiAccessKey"] +
        "&s=" +
        this.convertSearchTitleToString +
        sT;
      //get gata
      console.log(fetchString);
      const getThis = axios
        .get(fetchString)
        .then((obj) => {
          obj.data["Search"].forEach((filmObj) => {
            console.log("add to filmlist", filmObj.imdbID);
            this.insertFilm(filmObj);
          });
          this.errorMsg = "";
        })
        .catch((e) => {
          console.log(e, "searchByTitle");
          this.errorMsg = "nothing found @ " + fetchString;
        });
    },
  },
  actions: {
    getFilmByImdbID(imdbID) {
      //** @type{String}
      /* @returns filmObjekt */
      const tFilm = this.filmList.find((obj) => obj.id == imdbID);
      // replace not existing Poster with default image
      if (tFilm.film.Poster == "N/A") {
        tFilm.film.Poster = "/noTitle.png";
      }
      // check for missing info
      if (tFilm.film.Writer == "") {
        this.updateFilm(imdbID);
      }
      return tFilm;
    },
    rateFilm(imdbID, stars = Number) {
      // rates film
      const tFilm = this.filmList.find((obj) => obj.id == imdbID);
      tFilm.myRateing = stars;
    },
    favoriteFilm(imdbID, myFav = Boolean) {
      // sets favorite film
      const tFilm = this.filmList.find((obj) => obj.id == imdbID);
      tFilm.myFavorite = myFav;
    },
    commentFilm(imdbID, comment = String("")) {
      // sets comment
      const tFilm = this.filmList.find((obj) => obj.id == imdbID);
      tFilm.myComment = comment;
    },
    insertFilm(filmObj) {
      // check if film in List
      const searchInList = this.filmList.filter(
        (obj) => obj.imdbID == filmObj.imdbID,
      );
      // if film not in List
      if (searchInList.length == 0) {
        console.log("insertFilm", filmObj.imdbID);
        const film = Object.assign({}, filmInintStore);
        for (let ind in filmObj) {
          film[ind] = filmObj[ind];
        }
        this.filmList.push({
          film,
          id: film.imdbID,
          myFavorite: false,
          myRateing: 0,
          myComment: "",
          myState: "",
        });
      }
    },
    updateFilm(imdbID) {
      const tFilm = this.filmList.find((obj) => obj.id == imdbID);
      console.log("update film", imdbID);
      const fetchString =
        "/omdb/?apikey=" + cfg["OMDbApiAccessKey"] + "&i=" + imdbID;
      console.log(fetchString);
      const getThis = axios
        .get(fetchString)
        .then((obj) => {
          Object.keys(obj.data).forEach((key) => {
            if (key == "imdbID") {
            } else if (key == "Title") {
            } else if (key == "Poster") {
            } else {
              tFilm.film[key] = obj.data[key];
            }
          });
        })
        .catch((e) => {
          console.log(e, "filmlistStore->updateFilm");
        });
    },
  },
});
