let carro0 = []
let carro1 = []
let carro2 = []
let carro3 = []
let carro4 = []
let carro5 = []
let carro6 = []
let carro7 = []
let carro8 = []
let carro9 = []
let carro10 = []
let base = []
let carroVacio = ["", 0]
let sumaTotal = []
let validador = []
let usuarioActual = ["Usuario"]
var numero = Math.floor(Math.random() * 1000);
let date = new Date();
const modalR = document.getElementById('modalRegistro')
//GENERA NÚMERO DE TICKET RAMDOM CON FECHA
let ticketN = (numero + '-' + String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear())
totales = 0
sumaTotal = []
verifica()
console.log(sumaTotal)

//LOGIN
const login = document.getElementById('login')
login.addEventListener('submit', async (e) => {
  e.preventDefault()

  const registroFull = await fetch('https://sheet.best/api/sheets/751cdd4a-bdb4-4c67-a5b8-44fbc4facf36')
  const registroFullJson = await registroFull.json()
  let userActual = login.Usuario.value
  let passActual = login.password.value
  let userExiste = registroFullJson.find(usuario => usuario.User === userActual)
  let passExiste = registroFullJson.find(usuario => usuario.password === passActual)
  usuarioActual = []
  usuarioActual.push(userExiste.Nombres)

  if (userExiste === undefined) {
    userExiste = "nulo"
  }
  if (passExiste === undefined) {
    passExiste = "nulo"
  }

  if (userExiste.User === userActual && passExiste.password === passActual) {

    localStorage.length > 0 ? verifica() : limpia()

  } else {

    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'El nombre de usuario o el email no corresponde.',
      showConfirmButton: false,
      timer: 1500
    })

  }
})

//BOTON DE REGISTRO
const registro = document.getElementById('registro')
registro.addEventListener('submit', async (e) => {
  e.preventDefault()

  const registroFull = await fetch('https://sheet.best/api/sheets/751cdd4a-bdb4-4c67-a5b8-44fbc4facf36')
  const registroFullJson = await registroFull.json()
  let userActual = registro.Usuario.value
  let mailActual = registro.email.value
  let userExiste = registroFullJson.find(usuario => usuario.User === userActual)
  let mailExiste = registroFullJson.find(usuario => usuario.email === mailActual)

  if (userExiste === undefined && mailExiste === undefined) {

    await registra()

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El registro ha sido un éxito.',
      showConfirmButton: false,
      timer: 1500
    })
    registro.reset()
  } else {
    if (userExiste !== undefined || mailExiste.email !== undefined) {

      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'El nombre de usuario o el email ya existe.',
        showConfirmButton: false,
        timer: 1500
      })

    } else {

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El registro ha sido un éxito.',
        showConfirmButton: false,
        timer: 1500
      })
      registro.reset()
    }

  }
})

//BOTON PAGAR
const botonPagar = document.querySelector("#pagar")
botonPagar.onclick = function () {
//GENERA QR
  new QRious({
    element: document.querySelector("#codigo"),
    value: `Ticket N° ${ticketN}`, 
    size: 100,
    backgroundAlpha: 0, 
    foreground: "#000000", 
    level: "H", 
  });
//CAPTURA SRC DEL QR PARA INCLUIRLO EN EL PDF
  let base64 = document.querySelector('img').getAttribute('src');
  base.push(base64)

  total()
  pagarPedido()
}

//Agregar al Pedido 1
function agregar1() {
  let opcion = document.getElementById("size").value;

  carro0 = []
  carro0.push(arraySize[opcion].nombre, arraySize[opcion].precio, arraySize[opcion].valida)

  const storageDatos = JSON.stringify(carro0)
  localStorage.setItem("c0", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c0"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item1").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valor1").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}



//Agregar al Pedido 2
function agregar2() {
  let opcion = document.querySelector('#tipo').value;

  carro1 = []
  carro1.push(arrayTipo[opcion].nombre, arrayTipo[opcion].precio, arrayTipo[opcion].valida)
  const storageDatos = JSON.stringify(carro1)
  localStorage.setItem("c1", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c1"))

  let valor1 = Number(`${recuDato[1]}`)

  document.querySelector('#item2').innerHTML = `  ${recuDato[0]}`
  document.querySelector('#valor2').innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.querySelector('#suma').innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}


//Agregar al Pedido 3
function agregar3() {
  let opcion = document.getElementById("salsa").value;

  carro2 = []
  carro2.push(arraySalsa[opcion].nombre, arraySalsa[opcion].precio, arraySalsa[opcion].valida)
  const storageDatos = JSON.stringify(carro2)
  localStorage.setItem("c2", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c2"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item3").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valor3").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}


//Agregar al Pedido 4
function agregar4() {
  let opcion = document.getElementById("cantidadSalsa").value;

  carro3 = []
  carro3.push(arrayCantSalsa[opcion].nombre, arrayCantSalsa[opcion].precio, arrayCantSalsa[opcion].valida)
  const storageDatos = JSON.stringify(carro3)
  localStorage.setItem("c3", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c3"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item4").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valor4").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}


//Agregar al Pedido 5
function agregar5() {
  let opcion = document.getElementById("queso").value;

  carro4 = []
  carro4.push(arrayMozzarella[opcion].nombre, arrayMozzarella[opcion].precio, arrayMozzarella[opcion].valida)
  const storageDatos = JSON.stringify(carro4)
  localStorage.setItem("c4", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c4"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item5").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valor5").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}


//Agregar al Pedido 6
function agregar6() {
  let opcion = document.getElementById("carne").value;

  carro5 = []
  carro5.push(arrayCarne[opcion].nombre, arrayCarne[opcion].precio, arrayCarne[opcion].valida)
  const storageDatos = JSON.stringify(carro5)
  localStorage.setItem("c5", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c5"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item6").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valor6").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}

//Agregar al Pedido 7
function agregar7() {
  let opcion = document.getElementById("vegetal").value;

  carro6 = []
  carro6.push(arrayVegetales[opcion].nombre, arrayVegetales[opcion].precio, arrayVegetales[opcion].valida)
  const storageDatos = JSON.stringify(carro6)
  localStorage.setItem("c6", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c6"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item7").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valor7").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}


//Agregar al Pedido 8
function agregar8() {
  let opcion = document.getElementById("extra1").value;

  carro7 = []
  carro7.push(arrayExtra1[opcion].nombre, arrayExtra1[opcion].precio)
  const storageDatos = JSON.stringify(carro7)
  localStorage.setItem("c7", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c7"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item8").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valExt1").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}

//Agregar al Pedido 9
function agregar9() {
  let opcion = document.getElementById("extra2").value;

  carro8 = []
  carro8.push(arrayExtra2[opcion].nombre, arrayExtra2[opcion].precio)
  const storageDatos = JSON.stringify(carro8)
  localStorage.setItem("c8", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c8"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item9").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valExt2").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}

//Agregar al Pedido 10
function agregar10() {
  let opcion = document.getElementById("extra3").value;

  carro9 = []
  carro9.push(arrayExtra3[opcion].nombre, arrayExtra3[opcion].precio)
  const storageDatos = JSON.stringify(carro9)
  localStorage.setItem("c9", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c9"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item10").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valExt3").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}


//Agregar al Pedido 11
function agregar11() {
  let opcion = document.getElementById("extra4").value;

  carro10 = []
  carro10.push(arrayExtra4[opcion].nombre, arrayExtra4[opcion].precio)
  const storageDatos = JSON.stringify(carro10)
  localStorage.setItem("c10", storageDatos)

  let recuDato = JSON.parse(localStorage.getItem("c10"))

  let valor1 = Number(`${recuDato[1]}`)

  document.getElementById("item11").innerHTML = `  ${recuDato[0]}`
  document.getElementById("valExt4").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `


  total()
  document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0
  }).format(sumaTotal[0])
  ok()
}

//CALCULA EL TOTAL ACUMULADO Y ACTUALIZA AL EXISTIR CAMBIUOS
function total() {
  sumaTotal = []
  let suma0 = JSON.parse(localStorage.getItem("c0"))
  let suma1 = JSON.parse(localStorage.getItem("c1"))
  let suma2 = JSON.parse(localStorage.getItem("c2"))
  let suma3 = JSON.parse(localStorage.getItem("c3"))
  let suma4 = JSON.parse(localStorage.getItem("c4"))
  let suma5 = JSON.parse(localStorage.getItem("c5"))
  let suma6 = JSON.parse(localStorage.getItem("c6"))
  let suma7 = JSON.parse(localStorage.getItem("c7"))
  let suma8 = JSON.parse(localStorage.getItem("c8"))
  let suma9 = JSON.parse(localStorage.getItem("c9"))
  let suma10 = JSON.parse(localStorage.getItem("c10"))
  totales = suma0[1] + suma1[1] + suma2[1] + suma3[1] + suma4[1] + suma5[1] + suma6[1] + suma7[1] + suma8[1] + suma9[1] + suma10[1]
  sumaTotal.push(Number(totales))
  totalValida = suma0[2] + suma1[2] + suma2[2] + suma3[2] + suma4[2] + suma5[2] + suma6[2]
  validador = []
  validador.push(Number(totalValida))
  console.log(totales)

}


//PAGAR PEDIDO
function pagarPedido() {

  if (validador[0] == 7) {//VERIFICA SI CUMPLE CON EL MINIMO DE ELEMENTOS

    Swal.fire({
      backdrop: `rgba(81,56,69,0.6)`,
      imageUrl: './imagenes/logoticket.png',
      title: `${usuarioActual}, tu pedido es por`,
      title: `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(sumaTotal)} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¿Desea pagar?'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          backdrop: `rgba(81,56,69,0.6)`,
          imageUrl: './imagenes/tarjetas.png',
          title: '¿Cómo deseas pagar?',
          icon: `question`,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Crédito',
          denyButtonText: `Dédito`,
        }).then((result) => {

          if (result.isConfirmed) {
            descargarPdf()
            Swal.fire(`${usuarioActual}, tu pago con crédito a sido aceptado.\nTu Ticket de Pedido \n N° ${ticketN}\na sido descargado.`, '', 'success')
          } else if (result.isDenied) {
            descargarPdf()
            Swal.fire(`${usuarioActual}, tu pago con débito a sido aceptado.\nSu Ticket de Pedido \n N° ${ticketN}\na sido descargado.`, '', 'success')
          }
        })

      }
    })


  } else {

    error1()

  }
}

//GENERACIÓN Y DESCARGA DE TICKET EN PDF
function descargarPdf() {
  let linea1 = JSON.parse(localStorage.getItem("c0"))
  let linea2 = JSON.parse(localStorage.getItem("c1"))
  let linea3 = JSON.parse(localStorage.getItem("c2"))
  let linea4 = JSON.parse(localStorage.getItem("c3"))
  let linea5 = JSON.parse(localStorage.getItem("c4"))
  let linea6 = JSON.parse(localStorage.getItem("c5"))
  let linea7 = JSON.parse(localStorage.getItem("c6"))
  let linea8 = JSON.parse(localStorage.getItem("c7"))
  let linea9 = JSON.parse(localStorage.getItem("c8"))
  let linea10 = JSON.parse(localStorage.getItem("c9"))
  let linea11 = JSON.parse(localStorage.getItem("c10"))

  let doc = new jsPDF('p', 'mm', [170, 100]);

  doc.setFont("helvetica")
  doc.setFontType("bold")
  doc.setFontSize(15);
  doc.text(6, 6, `PIZZERÍA EL MONITO SABROSÓN`);
  doc.setLineWidth(0.5);
  doc.lines(4, 6, 96, 6)
  doc.setFont("courier")
  doc.setFontType("normal")
  doc.setFontSize(10);
  doc.text(5, 20, `Tamaño de Pizza : ${linea1[0]}`);
  doc.setFontSize(12);
  doc.text(95, 25, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea1[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 30, `Tipo de masa : ${linea2[0]}`);
  doc.setFontSize(12);
  doc.text(95, 35, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea2[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 40, `Tipo de salsa : ${linea3[0]}`);
  doc.setFontSize(12);
  doc.text(95, 45, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea3[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 50, `Cantidad de salsa : ${linea4[0]}`);
  doc.setFontSize(12);
  doc.text(95, 55, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea4[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 60, `Mozzarella : ${linea5[0]}`);
  doc.setFontSize(12);
  doc.text(95, 65, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea5[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 70, `Carne : ${linea6[0]}`);
  doc.setFontSize(12);
  doc.text(95, 75, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea6[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 80, `Vegetales : ${linea7[0]}`);
  doc.setFontSize(12);
  doc.text(95, 85, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea7[1])}.-`, 'right');
  doc.setFontSize(10);
  doc.text(5, 90, "Extras :");
  doc.setFontSize(12);
  ////OPERADORES TERNARIO
  linea8[1] == 0 ? doc.text(95, 95, ``, 'right') : doc.text(95, 95, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea8[1])}.-`, 'right');
  doc.text(5, 95, `${linea8[0]}`)
  linea9[1] == 0 ? doc.text(95, 100, ``, 'right') : doc.text(95, 100, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea9[1])}.-`, 'right');
  doc.text(5, 100, `${linea9[0]}`)
  linea10[1] == 0 ? doc.text(95, 105, ``, 'right') : doc.text(95, 105, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea10[1])}.-`, 'right');
  doc.text(5, 105, `${linea10[0]}`)
  linea11[1] == 0 ? doc.text(95, 110, ``, 'right') : doc.text(95, 110, `$ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(linea11[1])}.-`, 'right');
  doc.text(5, 110, `${linea11[0]}`)

  doc.setLineWidth(0.5);
  doc.line(4, 115, 96, 115)
  doc.setLineWidth(0.5);
  doc.line(4, 116, 96, 116)
  doc.setFontSize(15);
  doc.setFontType("bold")
  doc.text(95, 125, `Total a pagar $ ${innerHTML = Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(sumaTotal)}.-`, 'right')
  let imgData = base[0]
  doc.addImage(imgData, 'JPEG', 37, 130, 25, 25);
  doc.setFont("helvetica")
  doc.setFontType("bold")
  doc.setFontSize(12);
  doc.text(11, 160, ` Ticket de pedido N° ${ticketN}`);
  doc.save(`Ticket-${ticketN}.pdf`);
}


//MESAJE DE PRODUCTO AGREGADO AL PEDIDO
function ok() {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'success',
    title: 'Ok...su eleción fue agregada.'
  })

}

//MESAJE DE ERROR POR QUE FALTA TAMAÑO O TIPO DE MASA DE LA PIZZA

function error1() {

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: 'warning',
    title: 'Ups... te falta elegir algunos ingredientes.'
  })

}

//MONTAJE DE PEDIDO ANTERIOR EN DOM

function pedioOld() {
  Swal.fire({
    title: `Hola ${usuarioActual}, ¿Quieres ver tu pedido anterior?`,
    showDenyButton: true,
    confirmButtonText: 'Si... quiero verlo.',
    denyButtonText: `No... pediré otra cosa.`,
  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ok! Buena elección.',
        showConfirmButton: false,
        timer: 1500
      })

      login.reset()

      let recuDato0 = JSON.parse(localStorage.getItem("c0"))
      let valor0 = Number(`${recuDato0[1]}`)
      document.getElementById("item1").innerHTML = `  ${recuDato0[0]}`
      document.getElementById("valor1").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor0)}. `

      let recuDato1 = JSON.parse(localStorage.getItem("c1"))
      let valor1 = Number(`${recuDato1[1]}`)
      document.getElementById("item2").innerHTML = `  ${recuDato1[0]}`
      document.getElementById("valor2").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor1)}. `

      let recuDato2 = JSON.parse(localStorage.getItem("c2"))
      let valor2 = Number(`${recuDato2[1]}`)
      document.getElementById("item3").innerHTML = `  ${recuDato2[0]}`
      document.getElementById("valor3").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor2)}. `

      let recuDato3 = JSON.parse(localStorage.getItem("c3"))
      let valor3 = Number(`${recuDato3[1]}`)
      document.getElementById("item4").innerHTML = `  ${recuDato3[0]}`
      document.getElementById("valor4").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor3)}. `

      let recuDato4 = JSON.parse(localStorage.getItem("c4"))
      let valor4 = Number(`${recuDato4[1]}`)
      document.getElementById("item5").innerHTML = `  ${recuDato4[0]}`
      document.getElementById("valor5").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor4)}. `

      let recuDato5 = JSON.parse(localStorage.getItem("c5"))
      let valor5 = Number(`${recuDato5[1]}`)
      document.getElementById("item6").innerHTML = `  ${recuDato5[0]}`
      document.getElementById("valor6").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor5)}. `

      let recuDato6 = JSON.parse(localStorage.getItem("c6"))
      let valor6 = Number(`${recuDato6[1]}`)
      document.getElementById("item7").innerHTML = `  ${recuDato6[0]}`
      document.getElementById("valor7").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor6)}. `

      let recuDato7 = JSON.parse(localStorage.getItem("c7"))
      let valor7 = Number(`${recuDato7[1]}`)
      document.getElementById("item8").innerHTML = `  ${recuDato7[0]}`
      document.getElementById("valExt1").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor7)}. `

      let recuDato8 = JSON.parse(localStorage.getItem("c8"))
      let valor8 = Number(`${recuDato8[1]}`)
      document.getElementById("item9").innerHTML = `  ${recuDato8[0]}`
      document.getElementById("valExt2").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor8)}. `

      let recuDato9 = JSON.parse(localStorage.getItem("c9"))
      let valor9 = Number(`${recuDato9[1]}`)
      document.getElementById("item10").innerHTML = `  ${recuDato9[0]}`
      document.getElementById("valExt3").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor9)}. `

      let recuDato10 = JSON.parse(localStorage.getItem("c10"))
      let valor10 = Number(`${recuDato10[1]}`)
      document.getElementById("item11").innerHTML = `  ${recuDato10[0]}`
      document.getElementById("valExt4").innerHTML = `${Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(valor10)}. `

      total()
      document.getElementById("suma").innerHTML = Intl.NumberFormat('es-CL', {
        minimumFractionDigits: 0
      }).format(sumaTotal[0])


    } else if (result.isDenied) {

      localStorage.clear()//ELIMINACIÓN DE PEDIDO ANTIGUO
      for (i = 0; i <= 10; i++) {
        const storageDatos = JSON.stringify(carroVacio)
        localStorage.setItem(`c${i}`, storageDatos)
      }

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Ok! Empecemos de cero.',
        showConfirmButton: false,
        timer: 1500
      })
    } else {

      limpia()

    }
  })
}


//VERIFICA SI CARRO ESTA VACIO
function verifica() {

  pedioOld()
  total()
  document.getElementById("ticket").innerHTML = `  ${ticketN}`
}
//limpia carro
function limpia() {

  for (i = 0; i <= 10; i++) {
    const storageDatos = JSON.stringify(carroVacio)
    localStorage.setItem(`c${i}`, storageDatos)
  }
}

//REGISTRO
function registra() {

  const registroUser = fetch('https://sheet.best/api/sheets/751cdd4a-bdb4-4c67-a5b8-44fbc4facf36', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "User": registro.Usuario.value,
      "Nombres": registro.Nombres.value,
      "Apellidos": registro.Apellidos.value,
      "email": registro.email.value,
      "password": registro.password.value
    })
  })

}
