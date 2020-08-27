export async function createToast(message : string) {
  const toast = document.createElement('ion-toast');
  toast.message = message;
  toast.duration = 4000;

  document.body.appendChild(toast);
  return toast.present();
}