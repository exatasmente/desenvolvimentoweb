
var Dialog = function(){};
Dialog.prototype.characterDialog = function(){
    Swal.fire({
        title: 'Escolha um Personagem',
        type: 'info',
        html:
          '<label><input type="radio" name="test" value="small" checked>'+
          '<img src="http://placehold.it/40x60/0bf/fff&text=A"></label>'+
          '<label><input type="radio" name="test" value="big">'+
          '<img src="http://placehold.it/40x60/b0f/fff&text=B"></label>',
        focusConfirm: false,
        confirmButtonText:
          'Jogar',
        confirmButtonAriaLabel: 'Jogar'        
      })

}
