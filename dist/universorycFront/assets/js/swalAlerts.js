function swalOk(mensaje) {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: mensaje,
		showConfirmButton: false,
		timer: 1000
	})
}

function swalError(mensaje) {
	Swal.fire({
		position: 'center',
		icon: 'error',
		title: mensaje,
		showConfirmButton: false,
		timer: 2000
	})
}

function swalLoading() {
	let timerInterval
	Swal.fire({
		title: 'Cargando',
		timerProgressBar: true,
		didOpen: () => {
			Swal.showLoading()
		},
		willClose: () => {
			clearInterval(timerInterval)
		}
	}).then((result) => {

	})
}

function closeAlert() {
	Swal.close();
}


function swalMixin(icon, message) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})
	Toast.fire({
		icon: icon,
		title: message
	})
}

function swalMixinLoad(icon, message) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: true,
		confirmButtonText: '🡣',
	})
	Toast.fire({
		icon: icon,
		title: message,
	})
}

function reload() {
	if (!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
	}
}