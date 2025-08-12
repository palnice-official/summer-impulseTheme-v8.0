const showEdd = document.querySelector(".show-edd");
if (showEdd) {
  const closeEdd = document.querySelector(".close-edd"),
    today = new Date().toDateString();
  localStorage.getItem("popupLastShown") !== today &&
    (showEdd.classList.add("pop-edd"),
    closeEdd.classList.remove("hidden"),
    localStorage.setItem("popupLastShown", today)),
    closeEdd.addEventListener("click", () => {
      console.log("sandeep"),
        showEdd.classList.remove("pop-edd"),
        closeEdd.classList.add("hidden");
    });
}
class EDDChecker extends HTMLElement {
  constructor() {
    super(),
      (this.API_URL =
        "https://script.google.com/macros/s/AKfycbzd3jvoxMjAUaHU7UHCLCYdsMVxjCf1pAEv5jwJ7foL9r89iBWoTRebRx5Ssj4IyYXL/exec"),
      (this.pincodeData =
        JSON.parse(localStorage.getItem("pincodeData")) || []);
  }
  connectedCallback() {
    const form = this.querySelector("#pincode-form"),
      input = this.querySelector("#pincode-input"),
      deliveryBox = this.querySelector("#delivery-box");
    form.addEventListener("submit", (e) => this.checkDelivery(e)),
      (!localStorage.getItem("dataTimestamp") ||
        Date.now() - localStorage.getItem("dataTimestamp") > 864e5) &&
        this.fetchPincodeData();
    const savedPincode = localStorage.getItem("lastPincode");
    savedPincode &&
      /^\d{6}$/.test(savedPincode) &&
      ((input.value = savedPincode), this.showEDD(savedPincode));
  }
  async fetchPincodeData() {
    try {
      let data = await (await fetch(this.API_URL)).json();
      data?.data?.length &&
        ((this.pincodeData = data.data),
        localStorage.setItem("pincodeData", JSON.stringify(this.pincodeData)),
        localStorage.setItem("dataTimestamp", Date.now()));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  binarySearch(target) {
    let left = 0,
      right = this.pincodeData.length - 1;
    for (; left <= right; ) {
      let mid = Math.floor((left + right) / 2);
      if (+this.pincodeData[mid].pincode === target)
        return +this.pincodeData[mid].date;
      this.pincodeData[mid].pincode < target
        ? (left = mid + 1)
        : (right = mid - 1);
    }
    return 5;
  }
  checkDelivery(event) {
    event.preventDefault();
    const pincode = this.querySelector("#pincode-input").value.trim();
    if (!/^\d{6}$/.test(pincode))
      return (this.querySelector("#delivery-message").innerText =
        "Invalid Pincode");
    localStorage.setItem("lastPincode", pincode), this.showEDD(pincode);
  }
  showEDD(pincode) {
    const deliveryBox = this.querySelector("#delivery-box"),
      deliveryMsg = this.querySelector("#delivery-message");
    let days = this.binarySearch(+pincode),
      now = new Date(),
      date1 = new Date(now),
      date2 = new Date(now);
    date1.setDate(now.getDate() + days - 1),
      date2.setDate(now.getDate() + days),
      deliveryBox.classList.remove("hidden"),
      (deliveryMsg.innerText = `Delivered by ${date1.getDate()} ${date1.toLocaleString(
        "default",
        { month: "short" }
      )} - ${date2.getDate()} ${date2.toLocaleString("default", {
        month: "short",
      })}`);
  }
}
customElements.define("edd-checker", EDDChecker);
const copyCode = async (text, event) => {
  event.preventDefault();
  try {
    await navigator.clipboard.writeText(text),
      (document.querySelector(
        ".notification__text"
      ).innerHTML = `Copied to Clipboard - ${text}`),
      document.getElementById("copyNotification").classList.add("is--active"),
      setTimeout(() => {
        document
          .getElementById("copyNotification")
          .classList.remove("is--active");
      }, 3e3);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
window.addEventListener("scroll", function () {
  const addBtn = document.querySelector(
    ".product-form-alternate .product-form__payment-container"
  );
  window.scrollY >= 300
    ? addBtn.classList.add("its-fixed")
    : addBtn.classList.remove("its-fixed");
});
//# sourceMappingURL=/cdn/shop/t/382/assets/main-product-alternate.js.map?v=21179298227697805481753817201
