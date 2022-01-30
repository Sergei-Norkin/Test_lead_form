document.addEventListener("DOMContentLoaded", () => {
  // Инициализация маски номера
  let element = document.querySelector('#tel');
  let maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };
  let mask = IMask(element, maskOptions);

  // Валидация

  // Переменные
  let name = document.querySelector('.name');
  let tel = document.querySelector('.tel');
  let email = document.querySelector('.email');
  let errorName = document.querySelector('.error-name');
  let errorTel = document.querySelector('.error-tel');
  let errorEmail = document.querySelector('.error-email');
  let form = document.querySelector('.form');
  let errorMain = document.querySelector('.error-main');

  // Запрещаем ввод цифр в имени
  name.addEventListener('keydown', function(e){
    if( e.key.match(/[0-9]/) ) return e.preventDefault();
  });
  name.addEventListener('input', function(e){
    name.value = name.value.replace(/[0-9]/g, "");
  });

  // Запрещаем ввод кириллицы в почте
  email.addEventListener('keydown', function(e){
    if( e.key.match(/[а-яА-Я ]/) ) return e.preventDefault();
  });
  email.addEventListener('input', function(e){
    email.value = email.value.replace(/[а-яА-Я ]/g, "");
  });

  // Обрабатываем ошибки и отправляем форму

  form.addEventListener("submit", async function(e) {
    event.preventDefault();
    errorMain.style.visibility = "hidden";
    errorName.style.visibility = "hidden";
    errorTel.style.visibility = "hidden";
    errorEmail.style.visibility = "hidden";
    let nameLength = name.value.length;
    let telLength = tel.value.length;
    let emailLength = email.value.length;

    let errorValue = false;
    if (nameLength <= 1){
      errorMain.style.visibility = "visible";
      errorName.style.visibility = "visible";
      errorValue = true;
    };

    if (telLength !== 18){
      tel.style.visibility = "visible";
      errorTel.style.visibility = "visible";
      errorValue = true;
    };
    if (emailLength !== 0){
      if( email.value.indexOf('@') < 3 || email.value.lastIndexOf('.') - email.value.indexOf('@') < 3 || emailLength - email.value.lastIndexOf('.') < 2 ){
        email.style.visibility = "visible";
        errorEmail.style.visibility = "visible";
        errorValue = true;
      }
    };

    if (errorValue === false){
      let response = await fetch('https://reqres.in/api/users/', {
      method: 'POST',
      body: new FormData(form)
      })
      let result = await response.json();
      console.log(result);
      if (result.error){
        alert('Ошибка отправки формы');
      } else{
        alert('Спасибо, ваша форма отправлена');
      }
    }
  });
  
});