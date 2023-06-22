const validacionRegistrarse = () => {
    const validacionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const inputEmailRegistro = document.querySelector(
      "#inputEmailRegistro"
    );
    const result = validacionEmail.test(inputEmailRegistro.value);
    const inputPasswordRegistro = document.querySelector(
      "#inputPasswordRegistro"
    ).value;
    const inputPasswordConfirmRegistro = document.querySelector(
      "#inputPasswordConfirmRegistro"
    ).value;
    const inputNicknameRegistro = document.querySelector(
      "#inputNicknameRegistro"
    ).value;
    const terminosCondiciones = document.querySelector(
        "#terminosCondiciones"
    ).checked;
    if (
      result == true &&
      inputPasswordRegistro !== "" &&
      inputPasswordConfirmRegistro !== "" &&
      inputNicknameRegistro !== "" &&
      terminosCondiciones == true
    ) {
      return true
    }
}
 
export default validacionRegistrarse;