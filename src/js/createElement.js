class CreateElement {
  constructor (name, classes = [], innerHTML = '', atributes = {}) {
    this.name = name;
    this.classes = classes;
    this.atributes = atributes;
    this.innerHTML = innerHTML;

    this.element = this.create();
  }

  create() {
    const result = document.createElement(this.name);
    if (this.classes.length > 0) result.classList.add(...this.classes);
    for (let key in this.atributes){
      result.setAttribute(key, this.atributes[key]);
    }
    if (this.innerHTML) result.innerHTML = this.innerHTML;

    return result;
  }
}

export default CreateElement;