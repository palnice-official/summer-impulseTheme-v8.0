class PaginationComponent extends HTMLElement {
  constructor() {
    super();
  }

  get sectionId() {
    console.log("section-id",this.getAttribute("data-section-id"));
    return this.getAttribute("data-section-id");
  }

  get target() {
    console.log('target > ',this.getAttribute("data-target"));
    return this.getAttribute("data-target");
  }

  connectedCallback() {
    // console.log("connectedCallback >>", this);
    // this.links = this.querySelectorAll("a");
    this.handlePaginationButton = this.handlePaginationButton.bind(this);
    // this.links.forEach((link) => {
    //   link.addEventListener("click", this.handlePaginationButton);
    // });
    this.trainWorkers();
  }

  trainWorkers(){
    this.links = this.querySelectorAll("a");
    this.links.forEach((link) => {
      link.removeEventListener("click", this.handlePaginationButton);
      link.addEventListener("click", this.handlePaginationButton);
    });
  }



  disconnectedCallback() {
    // console.log("disconnectedCallback >>", this);
    this.links.forEach((link) => {
      link.removeEventListener("click", this.handlePaginationButton);
    });
  }

  handlePaginationButton(event) {
    event.preventDefault();
    const url = new URL(event.currentTarget.href);
    url.searchParams.set("section_id", this.sectionId);

    fetch(url.toString())
      .then((response) => response.text())
      .then((html) => {
        console.log("Fetched HTML:", html);
        // console.log("Target Selector:", this.target);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        document.querySelector(this.target).innerHTML = tempDiv.querySelector(
          this.target
        ).innerHTML;

        const newPagination = tempDiv.querySelector("#pagination-links");
        const currentPagination = document.querySelector("#pagination-links");
        if (newPagination && currentPagination) {
          currentPagination.innerHTML = newPagination.innerHTML;
        }

        this.trainWorkers();

        url.searchParams.delete("section_id");
        window.history.pushState({}, "", url.toString());

        document.querySelectorAll("image-element img").forEach(img => {
        img.style.opacity = 1;
      });

      window.scrollTo({
        top: 0,
        behavior: "instant"
      })
      });     
  }
  
}

customElements.define("pagination-component", PaginationComponent);