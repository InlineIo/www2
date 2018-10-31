// src/controllers/hello_controller.js
import { Controller } from "stimulus"
import { getHtml, postData, deleteData} from "../services/ajax";
import { getDefaultEventNameForElement } from "@stimulus/core/dist/src/action";

export default class extends Controller {
  static targets = ["name", "list"]
  refresh() {
    getHtml("/content/projects")
      .then((html) => {
        this.listTarget.innerHTML = html;
      })
      .catch(console.log);
  }

  save(event) {
    event.preventDefault();
    postData("/api/projects", { name: this.name })
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
    deleteData(`/api/projects/${event.target.dataset.id}`)
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