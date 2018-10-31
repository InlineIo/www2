import { Controller } from "stimulus"
import { getHtml, postData } from "../../../../src/services/ajax";
import { getDefaultEventNameForElement } from "@stimulus/core/dist/src/action";

export default class extends Controller {
  static targets = ["name", "container"]

  navigate() {
    if (this.hash !== location.hash) {
      const fn = location.hash.replace("#/", "");
      if (typeof this[fn] === "function") {
        this[fn]();
      }
    }
  }

  updateHash() {
    this.hash = location.hash;
  }

  connect() {
    this.hash = "";
    this.navigate();
    window.onhashchange = () => {
      this.navigate();
    };
  }

  startSignIn() {
    getHtml("/content/session/signin")
      .then((html) => {
        this.updateHash();
        this.containerTarget.innerHTML = html;
      })
      .catch(console.log)
  }

  startSignUp() {
    getHtml("/content/session/signup")
      .then((html) => {
        this.updateHash();
        this.containerTarget.innerHTML = html;
      })
      .catch(console.log);
  }
}