class FormComponent {

  constructor() {
    this.form;
  }

  setForm(form) {
    this.form = form;
  }

  getForm() {
    return this.form;
  }

  changeLevel() {
    const form = this.getForm();
    const formData = new FormData(form);
    return formData.get('level');
  }

  changeName() {
    const form = this.getForm();
    const formData = new FormData(form);
    return formData.get('cardName');
  }
}
export default FormComponent;