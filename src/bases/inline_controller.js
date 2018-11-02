import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [
    "serverError"
  ]
  
  showError(msg) {
    this.serverErrorTarget.innerHTML = msg;
    this.serverErrorTarget.className += " filled";
  }

  genericError() {
    this.showError("There was an error calling our servers. Please try again later");
  }

  hideError() {
    this.serverErrorTarget.className = "server-error";
  }

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
}
