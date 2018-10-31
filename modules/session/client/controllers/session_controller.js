import { Controller } from "stimulus"
import { getHtml, postData } from "../../../../src/services/ajax";
import { getDefaultEventNameForElement } from "@stimulus/core/dist/src/action";

export default class extends Controller {
  static targets = ["name", "container"]

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

  startSignIn() {
    getHtml("/content/session/signin")
      .then((html) => {
        this.hash = location.hash;
        this.containerTarget.innerHTML = html;
      })
      .catch(console.log)
  }

  startSignUp() {
    getHtml("/content/session/signup")
      .then((html) => {
        this.hash = location.hash;
        this.containerTarget.innerHTML = html;
      })
      .catch(console.log);
  }
}