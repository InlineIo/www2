// src/controllers/hello_controller.js
import { Controller } from "stimulus"
import { getHtml, postData, deleteData } from "../../../../src/services/ajax";
import { getDefaultEventNameForElement } from "@stimulus/core/dist/src/action";

export default class extends Controller {
  static targets = ["name", "list"]

  // Used to navigate if the hash changes
  // the hash should has the same name of the event
  connect() {
    this.hash = location.hash;
    window.onhashchange = () => {
      if (this.hash !== location.hash) {
        const fn = location.hash.replace("#/", "");
        if (typeof this[fn] === "function") {
          this[fn]();
        }
      }
    };
  }

  refresh() {
    getHtml("/content/{{name}}")
      .then((html) => {
        this.listTarget.innerHTML = html;
      })
      .catch(console.log);
  }

  save(event) {
    event.preventDefault();
    postData("/api/{{name}}", { name: this.name })
      .then((result) => {
        if (result.status === "OK") {
          this.name = "";
        }
        this.refresh()
      })
      .catch(console.log);
  }

  remove(event) {
    event.preventDefault();
    deleteData(`/api/{{name}}/${event.target.dataset.id}`)
      .then((result) => {
        this.refresh()
      })
      .catch(console.log);
  }

  get name() {
    return this.nameTarget.value;
  }

  set name(value) {
    return this.nameTarget.value = value;
  }
}