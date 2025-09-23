class CollectionFilters extends HTMLElement {
  constructor() {
    super();
  }

  get sectionId() {
    return this.getAttribute("data-section-id");
  }

  connectedCallback() {
    this.filterOptions = this.querySelectorAll("input[type='radio']");
    this.handleFilterChange = this.handleFilterChange.bind(this);
    // console.log("this > ", this);
    // console.log("sectionId > ", this.sectionId);
    // console.log("filterOptions > ", this.filterOptions);

    this.filterOptions.forEach((option) => {
      option.addEventListener("change", this.handleFilterChange);
    });
    console.log("CollectionFilters connected to the DOM");
  }

  disconnectedCallback() {
    this.filterOptions.forEach((option) => {
      option.removeEventListener("change", this.handleFilterChange);
    });
  }

  handleFilterChange(event) {
    // console.log("Filter option changed:", event.currentTarget);
    const url = event.currentTarget.checked
      ? new URL(event.currentTarget.dataset.addUrl, window.location.origin)
      : new URL(event.currentTarget.dataset.removeUrl, window.location.origin);
    url.searchParams.set("section_id", this.sectionId);
    console.log("Filter change detected, fetching URL:", url.toString());

    fetch(url.toString())
      .then((response) => response.text())
      .then((html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        // console.log("Fetched HTML for filters:", html);
        // document.querySelector(".collection").innerHTML = tempDiv.querySelector(".collection").innerHTML;
        const newContent = tempDiv.querySelector(
          `[data-section-id="${this.sectionId}"]`
        );
        const currentContent = document.querySelector(
          `[data-section-id="${this.sectionId}"]`
        );
        if (newContent && currentContent) {
          currentContent.innerHTML = newContent.innerHTML;
          console.log("Section replaced successfully!");
        } else {
          console.error("Couldn't find section in fetched HTML");
        }
        // console.log(
        //   "Document .collection:",
        //   document.querySelector(".collection")
        // );
        // console.log(
        //   "TempDiv .collection:",
        //   tempDiv.querySelector(".collection")
        // );

        url.searchParams.delete("section_id");
        window.history.pushState({}, "", url.toString());
        // console.log("Filter applied, URL updated:", url.toString());
        document.querySelectorAll("image-element img").forEach((img) => {
          img.style.opacity = 1;
        });
      });
  }
}

customElements.define("collection-filters", CollectionFilters);
