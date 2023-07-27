import { el, setChildren } from "redom";
// el mer html n a lielu, setChildrenn el merstexcace
import Navigo from "navigo";
// es 2 toxe nra hamara a vor haskananq vons redom gradarani mijocov texadrenq sax
// const h1 = el("h1", "Каталог товаров"); //es mer createElementn a stexcecinq h1 u drinq arjeqe
// setChildren(window.document.body, h1);

const router = new Navigo("/"); // es mer glxavor ejn a, ete uzum enq gnal urish ej  sleshic heto kgrenq eji anune

function catalogList() {
  const body = el("div", "Loading...");
  fetch("https://fakestoreapi.com/products").then(async (res) => {
    const data = await res.json();

    const ul = el("ul");

    setChildren(
      ul,
      data.map((product) =>
        el(
          "li",
          el(
            "a",
            {
              href: `/product/${product.id}`,
              onclick(event) {
                event.preventDefault();
                router.navigate(event.target.getAttribute("href")); // getAtributov hrefi arjeqe kvercnenq, yete grenq href lriv ssilkan
              },
            },
            product.title
          )
        )
      )
    );

    body.innerHTML = "";
    setChildren(body, ul);
  });

  return el("div", [el("h1", "Product list"), body]);
}

function catalogDetalis(id) {
  const body = el("div");

  fetch(`https://fakestoreapi.com/products/${id}`).then(async (res) => {
    const data = await res.json();

    body.innerHTML = "";
    setChildren(body, [
      el(
        "a",
        {
          href: "/",
          onclick(event) {
            event.preventDefault();
            router.navigate(event.target.getAttribute("href"));
          },
        },
        "Back to list"
      ),
      el("h2", data.title),
      el("p", data.description),
      el("img", {
        src: data.image,
        alt: data.title,
      }),
    ]);
  });

  return el("div", [el("h1", `Product detalis ${id}`), body]);
}

router.on("/", () => {
  setChildren(window.document.body, catalogList());
});

router.on("/product/:id", ({ data: { id } }) => {
  setChildren(window.document.body, catalogDetalis(id));
});

router.resolve();
